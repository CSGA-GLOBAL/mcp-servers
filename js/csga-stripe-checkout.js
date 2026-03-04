/**
 * CSGA Global — Live Stripe Checkout Configuration
 * Generated: 2026-03-04
 *
 * This file replaces the placeholder handleCheckout() function
 * with real Stripe Payment Links for every product on pricing.html.
 *
 * INSTRUCTIONS:
 * 1. Add this file to your GitHub repo as /js/csga-stripe-checkout.js
 * 2. In pricing.html, add before </body>:
 *    <script src="/js/csga-stripe-checkout.js"></script>
 * 3. Remove or comment out any existing handleCheckout / initiateStripeCheckout functions
 * 4. Push to main → Vercel auto-deploys → buttons go live
 */

// ============================================================
// STRIPE PAYMENT LINK DIRECTORY
// All prices in GBP. Links go directly to Stripe hosted checkout.
// ============================================================

const CSGA_CHECKOUT_LINKS = {

  // ── MEMBERSHIP TIERS ──────────────────────────────────────────────────────
  community: null, // Free tier — no payment needed
  starter: 'https://buy.stripe.com/6oU28t5YB8rS3lkflbdMI0g',           // £79/mo, 14-day trial
  professional: 'https://buy.stripe.com/eVq28tcmZdMc7BAflbdMI0h',      // £199/mo, 14-day trial
  enterprise_sector: 'https://buy.stripe.com/9B600l9aN23u4po4GxdMI0i',  // £499/mo, 30-day trial
  enterprise_full: 'https://buy.stripe.com/eVq00lev7cI87BAeh7dMI0j',    // £1,499/mo, 30-day trial
  enterprise_custom: null, // Contact Sales — redirect to /contact.html

  // ── ECOSYSTEM BUNDLES ─────────────────────────────────────────────────────
  ecosystem_security: 'https://buy.stripe.com/7sYbJ3biV6jK1dcdd3dMI0n',     // £149/mo
  ecosystem_governance: 'https://buy.stripe.com/9B628t72FbE42hg3CtdMI0o',    // £99/mo
  ecosystem_devops: 'https://buy.stripe.com/8x27sN86J7nO0981uldMI0p',       // £79/mo
  ecosystem_defence: 'https://buy.stripe.com/6oU6oJ86J6jK8FE5KBdMI0q',      // £199/mo
  ecosystem_industry: 'https://buy.stripe.com/8x23cx5YB7nO0983CtdMI0r',     // £129/mo
  ecosystem_data: 'https://buy.stripe.com/00wcN7biVfUk9JIdd3dMI0s',         // £39/mo

  // ── COBOL BRIDGE ────────────────────────────────────────────────────────
  cobol_basic: 'https://buy.stripe.com/00w5kF4UxbE4098a0RdMI0d',        // £999/mo
  cobol_pro: 'https://buy.stripe.com/bJe6oJ2MpbE4bRQ5KBdMI0e',         // £2,499/mo
  cobol_enterprise: 'https://buy.stripe.com/eVq7sN5YBdMc8FE5KBdMI0f',   // £4,999/mo

  // ── CASA CERTIFICATIONS ───────────────────────────────────────────────────
  casa_ca10: 'https://buy.stripe.com/6oU8wRbiVcI8dZY5KBdMI0t',   // £2,500 one-time
  casa_ca20: 'https://buy.stripe.com/3cI7sNev723u2hga0RdMI0u',   // £7,500 one-time
  casa_ca30: 'https://buy.stripe.com/00w4gBaeRgYo7BA1uldMI0v',   // £15,000 one-time
  casa_ca40: 'https://buy.stripe.com/aFacN772F5fG8FEdd3dMI0w',   // £25,000 one-time

  // ── API CREDIT PACKS ──────────────────────────────────────────────────────
  credits_starter: 'https://buy.stripe.com/8x2bJ33Qt37y4poc8ZdMI0x',    // £9, 1,000 credits
  credits_pro: 'https://buy.stripe.com/28EaEZ1Il23udZY0qhdMI0y',        // £29, 5,000 credits
  credits_enterprise: 'https://buy.stripe.com/14A5kF0Eh37y0980qhdMI0z',  // £99, 25,000 credits

  // ── SAMPLE MCP INDIVIDUAL LINKS ─────────────────────────────────────────
  // (For the "Browse MCPs" buttons, link to /mcp/ catalog page)
  mcp_smart_cities: 'https://buy.stripe.com/00w14p4Ux7nO8FE6OFdMI0k',   // £299/mo HVP
  mcp_maritime: 'https://buy.stripe.com/28EbJ3biV8rS6xw1uldMI0l',       // £149/mo MVP
  mcp_travel: 'https://buy.stripe.com/dRm3cxaeRgYocVU6OFdMI0m',         // £49/mo LVP
};

// ============================================================
// CHECKOUT HANDLER — replaces the placeholder handleCheckout()
// ============================================================

function handleCheckout(productKey) {
  const link = CSGA_CHECKOUT_LINKS[productKey];

  // Free tier → scroll to sign-up or redirect to registration
  if (productKey === 'community') {
    window.location.href = '/contact.html?plan=community';
    return;
  }

  // Contact Sales tiers → redirect to contact page
  if (productKey === 'enterprise_custom' || !link) {
    window.location.href = '/contact.html?plan=' + encodeURIComponent(productKey);
    return;
  }

  // All other products → go to Stripe checkout
  window.location.href = link;
}

// Also override initiateStripeCheckout if it exists on the page
function initiateStripeCheckout(productKey) {
  handleCheckout(productKey);
}

// Also override csga_checkout if it exists
function csga_checkout(productKey) {
  handleCheckout(productKey);
}

// ============================================================
// CURRENCY DISPLAY FIX
// The pricing page shows USD ($) but Stripe charges GBP (£).
// This script updates all visible prices to show £ instead of $.
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  // Price mapping: USD display → GBP actual (what Stripe charges)
  const priceUpdates = {
    // Memberships
    '$79': '£79',
    '$759': '£759',
    '$199': '£199',
    '$1,910': '£1,910',
    '$499': '£499',
    '$4,790': '£4,790',
    '$1,499': '£1,499',
    '$14,390': '£14,390',
    '$2,499': '£2,499',
    // Ecosystem Bundles
    '$149': '£149',
    '$99': '£99',
    '$39': '£39',
    '$129': '£129',
    // Individual MCPs
    '$9': '£9',
    '$29': '£29',
    // COBOL Bridge
    '$999': '£999',
    '$4,999': '£4,999',
    // CASA
    '$2,500': '£2,500',
    '$7,500': '£7,500',
    '$15,000': '£15,000',
    '$25,000': '£25,000',
  };

  // Walk all text nodes and replace $ with £
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let node;
  while (node = walker.nextNode()) {
    let text = node.textContent;
    let changed = false;
    for (const [usd, gbp] of Object.entries(priceUpdates)) {
      if (text.includes(usd)) {
        text = text.replace(new RegExp('\\' + usd.replace(/,/g, ','), 'g'), gbp);
        changed = true;
      }
    }
    if (changed) {
      node.textContent = text;
    }
  }

  console.log('CSGA Stripe Checkout: All payment links loaded, currency updated to GBP.');
});
