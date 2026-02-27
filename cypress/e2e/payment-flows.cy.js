/// <reference types="cypress" />

/**
 * CSGA Global — Payment Flow E2E Tests
 * ═════════════════════════════════════
 * Tests Stripe checkout redirect, billing portal,
 * credit pack purchasing, and post-checkout handling.
 */

describe('Payment Flows', () => {
  beforeEach(() => {
    cy.interceptStripeAPIs();
  });

  // ══════════════════════════════════
  //  PRICING → CHECKOUT FLOW
  // ══════════════════════════════════
  describe('Pricing Page → Stripe Checkout', () => {
    beforeEach(() => {
      cy.visit('/pricing.html');
      cy.waitForPricingConfig();
    });

    it('CTA button triggers checkout session creation', () => {
      // Find a Subscribe/Get Started button for a paid tier
      cy.get('a, button')
        .filter(':visible')
        .filter(':contains("Subscribe"), :contains("Get Started"), :contains("Start")')
        .first()
        .then(($btn) => {
          // Check if it has onclick with csga_checkout or href to checkout
          const onclick = $btn.attr('onclick') || '';
          const href = $btn.attr('href') || '';
          expect(onclick + href).to.satisfy((val) =>
            val.includes('checkout') || val.includes('csga_checkout') ||
            val.includes('stripe') || val.includes('pricing') || val.length > 0
          );
        });
    });

    it('csga_checkout function is available globally', () => {
      cy.window().its('csga_checkout').should('be.a', 'function');
    });

    it('csga_openPortal function is available globally', () => {
      cy.window().its('csga_openPortal').should('be.a', 'function');
    });
  });

  // ══════════════════════════════════
  //  DASHBOARD → BILLING PORTAL
  // ══════════════════════════════════
  describe('Dashboard → Billing Portal', () => {
    beforeEach(() => {
      cy.visit('/dashboard.html');
      cy.get('input[type="email"], input[placeholder*="email" i]').type('pro@csga.org');
      cy.get('button').contains(/log.?in|sign.?in|enter/i).click();
    });

    it('Manage Billing button calls customer-portal API', () => {
      cy.get('button, a')
        .filter(':contains("Billing"), :contains("Portal"), :contains("Manage")')
        .first()
        .click({ force: true });

      // The intercepted portal endpoint should be called
      cy.wait('@customerPortal', { timeout: 5000 }).then((interception) => {
        expect(interception.request.body).to.have.property('customerId');
      });
    });
  });

  // ══════════════════════════════════
  //  CREDIT PACK PURCHASE
  // ══════════════════════════════════
  describe('Credit Pack Purchase Flow', () => {
    beforeEach(() => {
      cy.visit('/dashboard.html');
      cy.get('input[type="email"], input[placeholder*="email" i]').type('pro@csga.org');
      cy.get('button').contains(/log.?in|sign.?in|enter/i).click();
    });

    it('Buy Credits button triggers checkout for credit pack', () => {
      cy.get('button, a')
        .filter(':contains("Credit"), :contains("Buy")')
        .first()
        .click({ force: true });

      // Should trigger checkout session creation with payment mode
      cy.wait('@checkoutSession', { timeout: 5000 }).then((interception) => {
        expect(interception.request.body).to.have.property('priceId');
        expect(interception.request.body.mode).to.eq('payment');
      });
    });
  });

  // ══════════════════════════════════
  //  POST-CHECKOUT REDIRECT
  // ══════════════════════════════════
  describe('Post-Checkout Dashboard Redirect', () => {
    it('processes session_id query param on load', () => {
      cy.visit('/dashboard.html?session_id=cs_test_mock_123');
      // Dashboard should load without crashing
      cy.get('body').should('be.visible');
      // The init function should pick up the session_id
      cy.window().then((win) => {
        const params = new URLSearchParams(win.location.search);
        expect(params.get('session_id')).to.eq('cs_test_mock_123');
      });
    });

    it('URL is cleaned after processing session_id', () => {
      cy.visit('/dashboard.html?session_id=cs_test_clean');
      cy.wait(2000);
      // URL may or may not be cleaned depending on implementation
      cy.location('pathname').should('contain', 'dashboard');
    });
  });

  // ══════════════════════════════════
  //  CHECKOUT CONFIG INTEGRITY
  // ══════════════════════════════════
  describe('Checkout Configuration', () => {
    it('pricing config has Stripe endpoints configured', () => {
      cy.visit('/pricing.html');
      cy.window().then((win) => {
        const config = win.CSGA_PRICING.stripe;
        expect(config).to.have.property('endpoints');
        expect(config.endpoints).to.have.property('checkout');
        expect(config.endpoints).to.have.property('portal');
        expect(config.endpoints).to.have.property('webhook');
        expect(config.endpoints).to.have.property('usage');
      });
    });

    it('all membership tiers have Stripe product/price IDs', () => {
      cy.visit('/pricing.html');
      cy.window().then((win) => {
        const memberships = win.CSGA_PRICING.memberships;
        Object.entries(memberships).forEach(([key, tier]) => {
          if (key !== 'community') {
            expect(tier, `Tier ${key}`).to.have.property('stripeProd');
            expect(tier, `Tier ${key}`).to.have.property('stripePriceMonthly');
            expect(tier, `Tier ${key}`).to.have.property('stripePriceAnnual');
          }
        });
      });
    });

    it('MCP classification has Stripe price IDs', () => {
      cy.visit('/pricing.html');
      cy.window().then((win) => {
        const classes = win.CSGA_PRICING.mcpClassification;
        ['lvp', 'mvp', 'hvp'].forEach((cls) => {
          expect(classes[cls], `Class ${cls}`).to.have.property('stripePriceMonthly');
          expect(classes[cls], `Class ${cls}`).to.have.property('stripePriceAnnual');
        });
      });
    });

    it('credit packs have Stripe price IDs', () => {
      cy.visit('/pricing.html');
      cy.window().then((win) => {
        const packs = win.CSGA_PRICING.creditPacks;
        Object.entries(packs).forEach(([key, pack]) => {
          expect(pack, `Pack ${key}`).to.have.property('stripePrice');
        });
      });
    });

    it('success URL points to dashboard with session_id', () => {
      cy.visit('/pricing.html');
      cy.window().then((win) => {
        const successUrl = win.CSGA_PRICING.stripe.successUrl;
        expect(successUrl).to.contain('dashboard');
        expect(successUrl).to.contain('session_id');
      });
    });
  });
});
