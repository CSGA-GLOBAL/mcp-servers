/**
 * CSGA Global — Verify Stripe Checkout Session
 * ══════════════════════════════════════════════
 * Vercel Serverless Function
 * Called by dashboard after Stripe checkout redirect.
 * Retrieves the session details and returns customer info.
 *
 * POST body: { sessionId: 'cs_xxx' }
 * Returns: { customerId, email, tier, subscription, mcpAccess, credits }
 *
 * ENV: STRIPE_SECRET_KEY
 */

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('FATAL: STRIPE_SECRET_KEY environment variable is not set');
}
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// ── Price ID → tier mapping (must match stripe-webhook.js) ──
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

const TIER_DEFAULTS = {
  community:         { mcpCount: 3,  credits: 100 },
  starter:           { mcpCount: 5,  credits: 2500 },
  professional:      { mcpCount: 15, credits: 10000 },
  enterprise_sector: { mcpCount: 34, credits: 50000 },
  enterprise_full:   { mcpCount: 59, credits: 250000 },
  enterprise_custom: { mcpCount: 59, credits: -1 },
};

module.exports = async (req, res) => {
  // ── CORS ──
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(503).json({ error: 'Payment service not configured' });
  }

  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'Missing sessionId' });
    }

    // ── Retrieve checkout session with expanded data ──
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'subscription', 'subscription.items.data.price'],
    });

    if (!session || session.status !== 'complete') {
      return res.status(400).json({ error: 'Session not complete or not found' });
    }

    const customer = session.customer;
    const customerId = typeof customer === 'string' ? customer : customer?.id;
    const email = session.customer_email
      || session.customer_details?.email
      || (typeof customer === 'object' ? customer.email : null);

    // ── Resolve tier ──
    let tier = 'community';
    let subscriptionInfo = null;

    // First check customer metadata (set by webhook)
    if (typeof customer === 'object' && customer.metadata?.tier) {
      tier = customer.metadata.tier;
    }

    // If subscription mode, resolve from subscription
    if (session.mode === 'subscription' && session.subscription) {
      const sub = typeof session.subscription === 'object'
        ? session.subscription
        : await stripe.subscriptions.retrieve(session.subscription, {
            expand: ['items.data.price'],
          });

      // Try subscription metadata first
      if (sub.metadata?.tier) {
        tier = sub.metadata.tier;
      }

      // Fallback: resolve from price ID
      if (tier === 'community') {
        const priceId = sub.items?.data?.[0]?.price?.id;
        if (priceId && PRICE_TO_TIER[priceId]) {
          tier = PRICE_TO_TIER[priceId];
        }
      }

      subscriptionInfo = {
        id: sub.id,
        status: sub.status,
        currentPeriodEnd: sub.current_period_end,
        trialEnd: sub.trial_end,
      };
    }

    // One-time purchase (credit pack, CASA)
    if (session.mode === 'payment') {
      const meta = session.metadata || {};
      // For one-time purchases, customer metadata holds the real tier
      if (typeof customer === 'object' && customer.metadata?.tier) {
        tier = customer.metadata.tier;
      }
    }

    const defaults = TIER_DEFAULTS[tier] || TIER_DEFAULTS.community;

    // ── Build customer metadata snapshot ──
    const customerMeta = typeof customer === 'object' ? (customer.metadata || {}) : {};

    return res.status(200).json({
      customerId,
      email,
      tier,
      mcpCount: defaults.mcpCount,
      includedCredits: defaults.credits,
      mcpAccess: customerMeta.mcpAccess || '[]',
      bonusCredits: parseInt(customerMeta.bonusCredits || '0', 10),
      casaLevel: customerMeta.casaLevel || null,
      subscription: subscriptionInfo,
      paymentMode: session.mode,
      status: customerMeta.status || 'active',
    });
  } catch (err) {
    console.error('Verify session error:', err.message);

    // Handle specific Stripe errors
    if (err.type === 'StripeInvalidRequestError') {
      return res.status(400).json({ error: 'Invalid session ID' });
    }

    return res.status(500).json({ error: err.message });
  }
};
