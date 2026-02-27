/**
 * CSGA Global — Stripe Checkout Session Creator
 * ═══════════════════════════════════════════════
 * Vercel Serverless Function
 * Supports: subscriptions, one-time purchases, trials, coupons, metadata
 *
 * ENV: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
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
    const {
      priceId,
      mode,              // 'subscription' | 'payment' (one-time)
      successUrl,
      cancelUrl,
      customerEmail,
      couponCode,
      trialDays,
      metadata,          // { tier, mcpSlug, productType, ... }
      quantity,
    } = req.body;

    if (!priceId) {
      return res.status(400).json({ error: 'Missing priceId' });
    }

    // Determine checkout mode — default to subscription
    const checkoutMode = mode === 'payment' ? 'payment' : 'subscription';

    // ── Build session config ──
    const sessionConfig = {
      mode: checkoutMode,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: parseInt(quantity, 10) || 1 }],
      success_url: successUrl || `${req.headers.origin || 'https://csga-global.org'}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${req.headers.origin || 'https://csga-global.org'}/pricing`,
      allow_promotion_codes: !couponCode, // Disable if applying coupon directly
      billing_address_collection: 'auto',
      tax_id_collection: { enabled: true },
    };

    // ── Customer email (pre-fill) ──
    if (customerEmail) {
      sessionConfig.customer_email = customerEmail;
    } else {
      sessionConfig.customer_creation = 'always';
    }

    // ── Subscription-specific: trial + metadata ──
    if (checkoutMode === 'subscription') {
      sessionConfig.subscription_data = {
        metadata: {
          source: 'csga-global',
          plan: priceId,
          ...(metadata || {}),
        },
      };

      // Trial period
      const trial = parseInt(trialDays, 10);
      if (trial > 0) {
        sessionConfig.subscription_data.trial_period_days = trial;
      }
    }

    // ── One-time purchase metadata ──
    if (checkoutMode === 'payment') {
      sessionConfig.payment_intent_data = {
        metadata: {
          source: 'csga-global',
          product: priceId,
          ...(metadata || {}),
        },
      };
      // For credit packs / CASA: allow invoice generation
      sessionConfig.invoice_creation = { enabled: true };
    }

    // ── Apply specific coupon ──
    if (couponCode) {
      sessionConfig.discounts = [{ coupon: couponCode }];
    }

    // ── Create session ──
    const session = await stripe.checkout.sessions.create(sessionConfig);

    return res.status(200).json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (err) {
    console.error('Stripe checkout error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
