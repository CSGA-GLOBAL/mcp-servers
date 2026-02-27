/**
 * CSGA Global — Stripe Webhook Handler
 * ═════════════════════════════════════
 * Vercel Serverless Function
 * Handles all subscription lifecycle events, payment events,
 * and usage-based billing triggers.
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

// Vercel needs raw body for signature verification
module.exports = async (req, res) => {
  // ── CORS (webhook calls from Stripe don't need CORS, but safe to have) ──
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Stripe-Signature');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // ── Verify signature ──
    if (webhookSecret && sig) {
      // Vercel provides raw body as buffer when using the raw config below
      const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    } else {
      // Fallback for testing without signature
      event = req.body;
      console.warn('⚠️ Webhook signature verification skipped (no secret configured)');
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  // ── Route events ──
  try {
    switch (event.type) {
      // ════════════════════════════════
      //  CHECKOUT COMPLETED
      // ════════════════════════════════
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log(`✅ Checkout completed: ${session.id}`);
        console.log(`   Customer: ${session.customer}`);
        console.log(`   Email: ${session.customer_email || session.customer_details?.email}`);
        console.log(`   Mode: ${session.mode}`);
        console.log(`   Subscription: ${session.subscription || 'N/A (one-time)'}`);

        if (session.mode === 'subscription') {
          await handleNewSubscription(session);
        } else if (session.mode === 'payment') {
          await handleOneTimePurchase(session);
        }
        break;
      }

      // ════════════════════════════════
      //  INVOICE PAID (recurring success)
      // ════════════════════════════════
      case 'invoice.paid': {
        const invoice = event.data.object;
        console.log(`💰 Invoice paid: ${invoice.id} — $${(invoice.amount_paid / 100).toFixed(2)}`);
        console.log(`   Customer: ${invoice.customer}`);
        console.log(`   Subscription: ${invoice.subscription}`);
        // Reset monthly usage counters, extend access
        await handleSuccessfulPayment(invoice);
        break;
      }

      // ════════════════════════════════
      //  INVOICE PAYMENT FAILED
      // ════════════════════════════════
      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        console.log(`❌ Payment failed: ${invoice.id}`);
        console.log(`   Customer: ${invoice.customer}`);
        console.log(`   Attempt: ${invoice.attempt_count}`);
        // Notify customer, mark account at risk
        await handleFailedPayment(invoice);
        break;
      }

      // ════════════════════════════════
      //  SUBSCRIPTION LIFECYCLE
      // ════════════════════════════════
      case 'customer.subscription.created': {
        const subscription = event.data.object;
        console.log(`🆕 Subscription created: ${subscription.id}`);
        console.log(`   Status: ${subscription.status}`);
        console.log(`   Trial end: ${subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : 'none'}`);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const prev = event.data.previous_attributes;
        console.log(`🔄 Subscription updated: ${subscription.id}`);
        console.log(`   Status: ${prev?.status || '?'} → ${subscription.status}`);
        // Handle upgrades/downgrades
        if (prev?.items) {
          console.log('   Plan changed — update MCP access');
          await handlePlanChange(subscription);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        console.log(`🗑️ Subscription cancelled: ${subscription.id}`);
        console.log(`   Customer: ${subscription.customer}`);
        // Revoke MCP access, downgrade to Community tier
        await handleCancellation(subscription);
        break;
      }

      case 'customer.subscription.trial_will_end': {
        const subscription = event.data.object;
        const trialEnd = new Date(subscription.trial_end * 1000);
        console.log(`⏰ Trial ending in 3 days: ${subscription.id}`);
        console.log(`   Trial ends: ${trialEnd.toISOString()}`);
        // Send email reminder
        await handleTrialEnding(subscription);
        break;
      }

      // ════════════════════════════════
      //  ONE-TIME PAYMENT SUCCESS
      // ════════════════════════════════
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        console.log(`💳 Payment succeeded: ${paymentIntent.id} — $${(paymentIntent.amount / 100).toFixed(2)}`);
        const meta = paymentIntent.metadata || {};
        if (meta.productType === 'credit_pack') {
          await handleCreditPackPurchase(paymentIntent);
        } else if (meta.productType === 'casa_certification') {
          await handleCasaPurchase(paymentIntent);
        }
        break;
      }

      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error(`Webhook handler error for ${event.type}:`, err.message);
    return res.status(500).json({ error: err.message });
  }
};

// ═══════════════════════════════════════════════════════════
//  HANDLER FUNCTIONS
//  TODO: Replace console.log stubs with your database/API calls
// ═══════════════════════════════════════════════════════════

async function handleNewSubscription(session) {
  // Grant MCP access based on subscription tier
  // Store: customer_id, subscription_id, tier, selected_mcps, credits
  const meta = session.metadata || {};
  console.log('→ Grant access:', {
    customer: session.customer,
    subscription: session.subscription,
    tier: meta.tier || 'unknown',
    selectedMcps: meta.selected_mcps || '[]',
  });
  // Example: await db.users.upsert({ stripeCustomerId: session.customer, tier: meta.tier, ... })
}

async function handleOneTimePurchase(session) {
  // Credit packs: add credits to account
  // CASA certifications: create assessment record
  const meta = session.metadata || {};
  console.log('→ One-time purchase:', {
    customer: session.customer,
    productType: meta.productType,
    product: meta.product,
  });
}

async function handleSuccessfulPayment(invoice) {
  // Reset monthly usage counters
  // Extend access period
  console.log('→ Reset usage for:', invoice.customer);
}

async function handleFailedPayment(invoice) {
  // Send dunning email
  // After 3 attempts, downgrade to Community
  console.log('→ Payment failed for:', invoice.customer, '— attempt', invoice.attempt_count);
  if (invoice.attempt_count >= 3) {
    console.log('→ Max retries reached, consider downgrading');
  }
}

async function handlePlanChange(subscription) {
  // Update MCP access based on new plan
  const items = subscription.items?.data || [];
  console.log('→ Plan change:', items.map(i => i.price?.id).join(', '));
}

async function handleCancellation(subscription) {
  // Revoke paid MCP access, downgrade to Community tier (3 free MCPs)
  console.log('→ Revoke access for customer:', subscription.customer);
}

async function handleTrialEnding(subscription) {
  // Send email: "Your trial ends in 3 days, add a payment method to continue"
  console.log('→ Trial ending email for:', subscription.customer);
}

async function handleCreditPackPurchase(paymentIntent) {
  const meta = paymentIntent.metadata || {};
  console.log('→ Add credits:', {
    customer: paymentIntent.customer,
    credits: meta.credits,
    pack: meta.pack,
  });
}

async function handleCasaPurchase(paymentIntent) {
  const meta = paymentIntent.metadata || {};
  console.log('→ CASA certification purchased:', {
    customer: paymentIntent.customer,
    level: meta.casaLevel,
  });
}

// ── Vercel config: disable body parsing for signature verification ──
module.exports.config = {
  api: {
    bodyParser: false,
  },
};
