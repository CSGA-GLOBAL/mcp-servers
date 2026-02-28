/**
 * CSGA Global — Customer Authentication
 * ═══════════════════════════════════════
 * Vercel Serverless Function
 * Looks up Stripe customer by email and returns subscription info.
 *
 * NOTE: This is a simplified auth flow using Stripe as the customer store.
 * For production, integrate a proper auth provider (Auth0, Clerk, etc.)
 * and use Stripe customer IDs as the linking key.
 *
 * POST body: { email: 'user@example.com', password: '...' }
 * Returns: { customerId, email, tier, mcpAccess, bonusCredits, ... }
 *
 * ENV: STRIPE_SECRET_KEY
 */

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('FATAL: STRIPE_SECRET_KEY environment variable is not set');
}
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    // ── Look up customer by email in Stripe ──
    const customers = await stripe.customers.list({
      email: email.toLowerCase().trim(),
      limit: 1,
    });

    if (!customers.data.length) {
      return res.status(404).json({ error: 'No account found for this email. Please subscribe first.' });
    }

    const customer = customers.data[0];
    const meta = customer.metadata || {};

    // ── Get active subscription if any ──
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
      limit: 1,
    });

    let tier = meta.tier || 'community';
    let subscriptionInfo = null;

    if (subscriptions.data.length) {
      const sub = subscriptions.data[0];
      subscriptionInfo = {
        id: sub.id,
        status: sub.status,
        currentPeriodEnd: sub.current_period_end,
        trialEnd: sub.trial_end,
      };
      // Subscription metadata may be more current
      if (sub.metadata?.tier) {
        tier = sub.metadata.tier;
      }
    }

    // Also check for trialing subscriptions
    if (!subscriptions.data.length) {
      const trialSubs = await stripe.subscriptions.list({
        customer: customer.id,
        status: 'trialing',
        limit: 1,
      });
      if (trialSubs.data.length) {
        const sub = trialSubs.data[0];
        subscriptionInfo = {
          id: sub.id,
          status: sub.status,
          currentPeriodEnd: sub.current_period_end,
          trialEnd: sub.trial_end,
        };
        if (sub.metadata?.tier) {
          tier = sub.metadata.tier;
        }
      }
    }

    return res.status(200).json({
      customerId: customer.id,
      email: customer.email,
      tier,
      mcpAccess: meta.mcpAccess || '[]',
      bonusCredits: parseInt(meta.bonusCredits || '0', 10),
      casaLevel: meta.casaLevel || null,
      status: meta.status || (subscriptionInfo ? 'active' : 'community'),
      subscription: subscriptionInfo,
    });
  } catch (err) {
    console.error('Auth error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
