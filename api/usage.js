/**
 * CSGA Global — Usage Tracking & Overage Billing
 * ════════════════════════════════════════════════
 * Vercel Serverless Function
 *
 * Endpoints (via query param ?action=):
 *   GET  ?action=status&customerId=cus_xxx     → Current usage & limits
 *   POST ?action=record                        → Record API call usage
 *   POST ?action=add-credits                   → Add purchased credits
 *
 * ENV: STRIPE_SECRET_KEY
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// ── In-memory usage store (replace with your DB in production) ──
// Structure: { [customerId]: { calls: number, credits: number, lastReset: ISO } }
const usageStore = {};

// ── Tier credit limits ──
const TIER_LIMITS = {
  community:        { credits: 100,    overageRate: 0 },
  starter:          { credits: 2500,   overageRate: 0.20 },
  professional:     { credits: 10000,  overageRate: 0.15 },
  enterprise_sector:{ credits: 50000,  overageRate: 0.12 },
  enterprise_full:  { credits: 250000, overageRate: 0.10 },
  enterprise_custom:{ credits: -1,     overageRate: 0.08 }, // -1 = unlimited
};

module.exports = async (req, res) => {
  // ── CORS ──
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const action = req.query?.action || req.body?.action;

  try {
    switch (action) {
      case 'status':
        return await getUsageStatus(req, res);
      case 'record':
        return await recordUsage(req, res);
      case 'add-credits':
        return await addCredits(req, res);
      default:
        return res.status(400).json({ error: 'Missing or invalid action. Use: status, record, add-credits' });
    }
  } catch (err) {
    console.error('Usage API error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};

// ════════════════════════════════════════
//  GET USAGE STATUS
// ════════════════════════════════════════
async function getUsageStatus(req, res) {
  const customerId = req.query?.customerId || req.body?.customerId;
  if (!customerId) return res.status(400).json({ error: 'Missing customerId' });

  // Fetch subscription from Stripe to determine tier
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'active',
    limit: 1,
  });

  const subscription = subscriptions.data[0];
  const tier = subscription?.metadata?.tier || 'community';
  const limits = TIER_LIMITS[tier] || TIER_LIMITS.community;

  // Get current usage
  const usage = usageStore[customerId] || { calls: 0, credits: 0, lastReset: new Date().toISOString() };

  // Calculate remaining
  const included = limits.credits;
  const bonusCredits = usage.credits || 0;
  const totalAvailable = included === -1 ? Infinity : included + bonusCredits;
  const used = usage.calls || 0;
  const remaining = included === -1 ? Infinity : Math.max(0, totalAvailable - used);
  const overageCount = included === -1 ? 0 : Math.max(0, used - totalAvailable);

  return res.status(200).json({
    customerId,
    tier,
    subscription: subscription ? {
      id: subscription.id,
      status: subscription.status,
      currentPeriodEnd: subscription.current_period_end,
      trialEnd: subscription.trial_end,
    } : null,
    usage: {
      callsUsed: used,
      includedCredits: included === -1 ? 'unlimited' : included,
      bonusCredits,
      totalAvailable: included === -1 ? 'unlimited' : totalAvailable,
      remaining: included === -1 ? 'unlimited' : remaining,
      overageCount,
      overageRate: limits.overageRate,
      estimatedOverageCost: overageCount > 0 ? `$${((overageCount / 1000) * (limits.overageRate * 1000)).toFixed(2)}` : '$0.00',
    },
    period: {
      start: usage.lastReset,
      end: subscription ? new Date(subscription.current_period_end * 1000).toISOString() : null,
    },
  });
}

// ════════════════════════════════════════
//  RECORD USAGE
// ════════════════════════════════════════
async function recordUsage(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST required' });

  const { customerId, calls, mcpSlug, timestamp } = req.body;
  if (!customerId || !calls) return res.status(400).json({ error: 'Missing customerId or calls' });

  // Initialize if needed
  if (!usageStore[customerId]) {
    usageStore[customerId] = { calls: 0, credits: 0, lastReset: new Date().toISOString() };
  }

  // Increment
  usageStore[customerId].calls += parseInt(calls, 10);

  console.log(`📊 Usage recorded: ${customerId} +${calls} calls (MCP: ${mcpSlug || 'unknown'})`);

  // Check if over limit — report Stripe metered usage for overage billing
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'active',
    limit: 1,
  });

  const subscription = subscriptions.data[0];
  if (subscription) {
    const tier = subscription.metadata?.tier || 'community';
    const limits = TIER_LIMITS[tier] || TIER_LIMITS.community;
    const totalAvailable = limits.credits === -1 ? Infinity : limits.credits + (usageStore[customerId].credits || 0);

    if (usageStore[customerId].calls > totalAvailable && limits.overageRate > 0) {
      // Find metered subscription item for overage
      const meteredItem = subscription.items.data.find(
        item => item.price?.recurring?.usage_type === 'metered'
      );
      if (meteredItem) {
        await stripe.subscriptionItems.createUsageRecord(meteredItem.id, {
          quantity: parseInt(calls, 10),
          timestamp: timestamp || Math.floor(Date.now() / 1000),
          action: 'increment',
        });
        console.log(`⚠️ Overage usage reported to Stripe: +${calls} calls`);
      }
    }
  }

  return res.status(200).json({
    recorded: true,
    customerId,
    totalCalls: usageStore[customerId].calls,
  });
}

// ════════════════════════════════════════
//  ADD CREDITS (from credit pack purchase)
// ════════════════════════════════════════
async function addCredits(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST required' });

  const { customerId, credits } = req.body;
  if (!customerId || !credits) return res.status(400).json({ error: 'Missing customerId or credits' });

  if (!usageStore[customerId]) {
    usageStore[customerId] = { calls: 0, credits: 0, lastReset: new Date().toISOString() };
  }

  usageStore[customerId].credits += parseInt(credits, 10);

  console.log(`💎 Credits added: ${customerId} +${credits} (total bonus: ${usageStore[customerId].credits})`);

  return res.status(200).json({
    added: true,
    customerId,
    bonusCredits: usageStore[customerId].credits,
  });
}
