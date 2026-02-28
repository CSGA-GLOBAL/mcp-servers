/**
 * CSGA Global — Stripe Webhook Handler
 * ═════════════════════════════════════
 * Vercel Serverless Function
 * Handles all subscription lifecycle events, payment events,
 * and usage-based billing triggers.
 *
 * Persistence strategy: Stripe customer metadata as source of truth.
 * No external DB required — all state lives in Stripe objects.
 *
 * Customer metadata fields:
 *   tier            — community|starter|professional|enterprise_sector|enterprise_full|enterprise_custom
 *   mcpAccess       — JSON array of MCP slugs customer can access
 *   bonusCredits    — purchased credit balance (from credit packs)
 *   casaLevel       — CASA certification level if purchased
 *   status          — active|trial|past_due|cancelled
 *   lastPayment     — ISO date of last successful payment
 *   failedAttempts  — consecutive failed payment attempts
 *
 * ENV: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
 *
 * Configure in Stripe Dashboard → Developers → Webhooks:
 *   Endpoint URL: https://csga-global.org/api/stripe-webhook
 *   Events:
 *     checkout.session.completed
 *     invoice.paid
 *     invoice.payment_failed
 *     customer.subscription.created
 *     customer.subscription.updated
 *     customer.subscription.deleted
 *     customer.subscription.trial_will_end
 *     payment_intent.succeeded  (one-time purchases)
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// ── Tier → default MCP access mapping ──
const TIER_DEFAULTS = {
  community:         { mcpCount: 3,  credits: 100 },
  starter:           { mcpCount: 5,  credits: 2500 },
  professional:      { mcpCount: 15, credits: 10000 },
  enterprise_sector: { mcpCount: 34, credits: 50000 },
  enterprise_full:   { mcpCount: 59, credits: 250000 },
  enterprise_custom: { mcpCount: 59, credits: -1 },
};

// ── Price ID → tier mapping (resolve tier from subscription price) ──
const PRICE_TO_TIER = {
  'price_1RTcDKRtiWejEDwD1tZtqJqY': 'starter',
  'price_1RTcD3RtiWejEDwDOiR3BIbE': 'starter',
  'price_1RTcCkRtiWejEDwD5u1Wj3Q2': 'professional',
  'price_1RTcCORtiWejEDwDKYQKrN3N': 'professional',
  'price_1RTcBcRtiWejEDwDyKx4r4NM': 'enterprise_sector',
  'price_1RTcBIRtiWejEDwDMZiV1dkA': 'enterprise_sector',
  'price_1RTcAuRtiWejEDwDH8WmFyYE': 'enterprise_full',
  'price_1RTcAbRtiWejEDwD9j9jCqZa': 'enterprise_full',
  'price_1RTcAFRtiWejEDwDNjjU0CpT': 'enterprise_custom',
  'price_1RTc9uRtiWejEDwDwuPo03Ir': 'enterprise_custom',
};

// ── Credit pack price → credit amount ──
const CREDIT_PACKS = {
  'price_1RTc7nRtiWejEDwD38Jph3YW': { credits: 5000,   name: 'Starter Pack' },
  'price_1RTc7LRtiWejEDwDGzL92SBf': { credits: 25000,  name: 'Professional Pack' },
  'price_1RTc6oRtiWejEDwDYzD6rCsC': { credits: 100000, name: 'Enterprise Pack' },
};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Stripe-Signature');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (webhookSecret && sig) {
      const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    } else {
      event = req.body;
      console.warn('[WEBHOOK] Signature verification skipped (no secret configured)');
    }
  } catch (err) {
    console.error('[WEBHOOK] Signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const email = session.customer_email || session.customer_details?.email;
        console.log(`[WEBHOOK] checkout.session.completed | customer=${session.customer} email=${email} mode=${session.mode}`);

        if (session.mode === 'subscription') {
          await handleNewSubscription(session);
        } else if (session.mode === 'payment') {
          await handleOneTimePurchase(session);
        }
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object;
        console.log(`[WEBHOOK] invoice.paid | id=${invoice.id} amount=£${(invoice.amount_paid / 100).toFixed(2)} customer=${invoice.customer}`);
        await handleSuccessfulPayment(invoice);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        console.log(`[WEBHOOK] invoice.payment_failed | id=${invoice.id} customer=${invoice.customer} attempt=${invoice.attempt_count}`);
        await handleFailedPayment(invoice);
        break;
      }

      case 'customer.subscription.created': {
        const sub = event.data.object;
        console.log(`[WEBHOOK] subscription.created | id=${sub.id} status=${sub.status} trial_end=${sub.trial_end || 'none'}`);
        break;
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object;
        const prev = event.data.previous_attributes;
        console.log(`[WEBHOOK] subscription.updated | id=${sub.id} status=${prev?.status || '?'}->${sub.status}`);
        if (prev?.items) {
          await handlePlanChange(sub);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object;
        console.log(`[WEBHOOK] subscription.deleted | id=${sub.id} customer=${sub.customer}`);
        await handleCancellation(sub);
        break;
      }

      case 'customer.subscription.trial_will_end': {
        const sub = event.data.object;
        console.log(`[WEBHOOK] trial_will_end | id=${sub.id} trial_ends=${new Date(sub.trial_end * 1000).toISOString()}`);
        await handleTrialEnding(sub);
        break;
      }

      case 'payment_intent.succeeded': {
        const pi = event.data.object;
        console.log(`[WEBHOOK] payment_intent.succeeded | id=${pi.id} amount=£${(pi.amount / 100).toFixed(2)}`);
        const meta = pi.metadata || {};
        if (meta.productType === 'credit_pack') {
          await handleCreditPackPurchase(pi);
        } else if (meta.productType === 'casa_certification') {
          await handleCasaPurchase(pi);
        }
        break;
      }

      default:
        console.log(`[WEBHOOK] Unhandled event: ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error(`[WEBHOOK] Handler error for ${event.type}:`, err.message);
    return res.status(500).json({ error: err.message });
  }
};

// ═══════════════════════════════════════════════════════════
//  HELPER: Update Stripe customer metadata
// ═══════════════════════════════════════════════════════════

async function updateCustomerMeta(customerId, fields) {
  const existing = await stripe.customers.retrieve(customerId);
  const currentMeta = existing.metadata || {};
  const merged = { ...currentMeta, ...fields };
  await stripe.customers.update(customerId, { metadata: merged });
  console.log(`[META] Updated customer ${customerId}:`, fields);
}

async function getCustomerMeta(customerId) {
  const customer = await stripe.customers.retrieve(customerId);
  return customer.metadata || {};
}

// ═══════════════════════════════════════════════════════════
//  HANDLER FUNCTIONS — Stripe metadata persistence
// ═══════════════════════════════════════════════════════════

async function handleNewSubscription(session) {
  const meta = session.metadata || {};
  const subMeta = session.subscription
    ? (await stripe.subscriptions.retrieve(session.subscription)).metadata || {}
    : {};

  // Resolve tier from metadata or price ID
  let tier = meta.tier || subMeta.tier || 'community';

  // If tier not in metadata, resolve from price ID
  if (tier === 'community' && session.subscription) {
    const sub = await stripe.subscriptions.retrieve(session.subscription, {
      expand: ['items.data.price'],
    });
    const priceId = sub.items.data[0]?.price?.id;
    if (priceId && PRICE_TO_TIER[priceId]) {
      tier = PRICE_TO_TIER[priceId];
    }
  }

  const defaults = TIER_DEFAULTS[tier] || TIER_DEFAULTS.community;
  const selectedMcps = meta.selected_mcps || subMeta.selected_mcps || '[]';

  await updateCustomerMeta(session.customer, {
    tier,
    status: 'active',
    mcpAccess: selectedMcps,
    mcpLimit: String(defaults.mcpCount),
    includedCredits: String(defaults.credits),
    subscriptionId: session.subscription || '',
    lastPayment: new Date().toISOString(),
    failedAttempts: '0',
    source: 'csga-global',
  });

  // Also store tier in subscription metadata for future lookups
  if (session.subscription) {
    await stripe.subscriptions.update(session.subscription, {
      metadata: { tier, source: 'csga-global' },
    });
  }

  console.log(`[HANDLER] New subscription: customer=${session.customer} tier=${tier} mcps=${defaults.mcpCount}`);
}

async function handleOneTimePurchase(session) {
  const meta = session.metadata || {};
  console.log(`[HANDLER] One-time purchase: customer=${session.customer} type=${meta.productType || 'unknown'}`);
  // Credit packs and CASA handled via payment_intent.succeeded
}

async function handleSuccessfulPayment(invoice) {
  if (!invoice.customer) return;

  await updateCustomerMeta(invoice.customer, {
    status: 'active',
    lastPayment: new Date().toISOString(),
    failedAttempts: '0',
  });

  console.log(`[HANDLER] Payment success: customer=${invoice.customer} — access renewed`);
}

async function handleFailedPayment(invoice) {
  if (!invoice.customer) return;

  const currentMeta = await getCustomerMeta(invoice.customer);
  const attempts = parseInt(currentMeta.failedAttempts || '0', 10) + 1;

  const updates = {
    status: 'past_due',
    failedAttempts: String(attempts),
  };

  // After 3 failed attempts, mark for downgrade
  if (attempts >= 3) {
    updates.status = 'payment_exhausted';
    console.log(`[HANDLER] Payment exhausted: customer=${invoice.customer} — 3+ failures, flagged for downgrade`);
  }

  await updateCustomerMeta(invoice.customer, updates);
  console.log(`[HANDLER] Payment failed: customer=${invoice.customer} attempt=${attempts}`);
}

async function handlePlanChange(subscription) {
  const items = subscription.items?.data || [];
  const priceId = items[0]?.price?.id;
  const newTier = priceId ? (PRICE_TO_TIER[priceId] || 'community') : 'community';
  const defaults = TIER_DEFAULTS[newTier] || TIER_DEFAULTS.community;

  await updateCustomerMeta(subscription.customer, {
    tier: newTier,
    mcpLimit: String(defaults.mcpCount),
    includedCredits: String(defaults.credits),
  });

  await stripe.subscriptions.update(subscription.id, {
    metadata: { tier: newTier, source: 'csga-global' },
  });

  console.log(`[HANDLER] Plan change: customer=${subscription.customer} new_tier=${newTier} mcps=${defaults.mcpCount}`);
}

async function handleCancellation(subscription) {
  const communityDefaults = TIER_DEFAULTS.community;

  await updateCustomerMeta(subscription.customer, {
    tier: 'community',
    status: 'cancelled',
    mcpAccess: '[]',
    mcpLimit: String(communityDefaults.mcpCount),
    includedCredits: String(communityDefaults.credits),
    subscriptionId: '',
    cancelledAt: new Date().toISOString(),
  });

  console.log(`[HANDLER] Cancellation: customer=${subscription.customer} — downgraded to community`);
}

async function handleTrialEnding(subscription) {
  await updateCustomerMeta(subscription.customer, {
    status: 'trial_ending',
    trialEndsAt: new Date(subscription.trial_end * 1000).toISOString(),
  });

  // NOTE: To send actual emails, integrate SendGrid/Resend/SES here
  // For now, Stripe handles trial-ending emails natively via Billing settings
  console.log(`[HANDLER] Trial ending: customer=${subscription.customer} ends=${new Date(subscription.trial_end * 1000).toISOString()}`);
}

async function handleCreditPackPurchase(paymentIntent) {
  if (!paymentIntent.customer) return;

  const meta = paymentIntent.metadata || {};
  const priceId = meta.product || meta.priceId || '';
  const packInfo = CREDIT_PACKS[priceId];

  let creditsToAdd = 0;
  if (packInfo) {
    creditsToAdd = packInfo.credits;
  } else if (meta.credits) {
    creditsToAdd = parseInt(meta.credits, 10);
  }

  if (creditsToAdd > 0) {
    const currentMeta = await getCustomerMeta(paymentIntent.customer);
    const currentCredits = parseInt(currentMeta.bonusCredits || '0', 10);
    const newTotal = currentCredits + creditsToAdd;

    await updateCustomerMeta(paymentIntent.customer, {
      bonusCredits: String(newTotal),
    });

    console.log(`[HANDLER] Credits added: customer=${paymentIntent.customer} +${creditsToAdd} total=${newTotal}`);
  }
}

async function handleCasaPurchase(paymentIntent) {
  if (!paymentIntent.customer) return;

  const meta = paymentIntent.metadata || {};

  await updateCustomerMeta(paymentIntent.customer, {
    casaLevel: meta.casaLevel || 'foundation',
    casaPurchasedAt: new Date().toISOString(),
    casaStatus: 'pending_assessment',
  });

  console.log(`[HANDLER] CASA purchased: customer=${paymentIntent.customer} level=${meta.casaLevel || 'foundation'}`);
}

// ── Vercel config: disable body parsing for signature verification ──
module.exports.config = {
  api: {
    bodyParser: false,
  },
};
