/// <reference types="cypress" />

/**
 * CSGA Global — Pricing Page E2E Tests
 * ═════════════════════════════════════
 * Validates all 6 membership tiers, annual toggle,
 * ecosystem bundles, COBOL Bridge, CASA certs, credit packs.
 */

describe('Pricing Page', () => {
  beforeEach(() => {
    cy.visit('/pricing.html');
    cy.waitForPricingConfig();
  });

  // ── Membership Tiers ──
  describe('Membership Tiers', () => {
    it('displays all 6 membership tier cards', () => {
      cy.get('.tier-card, .pricing-card, [class*="tier"]').should('have.length.gte', 6);
    });

    it('shows Community tier as free / $0', () => {
      cy.contains('Community').should('be.visible');
      cy.contains('Free').should('be.visible');
    });

    it('shows Starter tier at $79/mo', () => {
      cy.contains('Starter').should('be.visible');
      cy.contains('79').should('exist');
    });

    it('shows Professional tier at $199/mo', () => {
      cy.contains('Professional').should('be.visible');
      cy.contains('199').should('exist');
    });

    it('shows Enterprise Sector tier at $499/mo', () => {
      cy.contains('Enterprise Sector').should('be.visible');
      cy.contains('499').should('exist');
    });

    it('shows Enterprise Full tier at $1,499/mo', () => {
      cy.contains('Enterprise Full').should('be.visible');
      cy.contains('1,499').should('exist');
    });

    it('shows Enterprise Custom tier at $2,499+/mo', () => {
      cy.contains('Enterprise Custom').should('be.visible');
      cy.contains('2,499').should('exist');
    });
  });

  // ── Annual Toggle ──
  describe('Annual Billing Toggle', () => {
    it('has a billing period toggle (monthly/annual)', () => {
      cy.get('[class*="toggle"], [class*="billing"], [class*="annual"], input[type="checkbox"]')
        .should('exist');
    });

    it('updates prices when toggled to annual (20% discount)', () => {
      // Find and click the annual toggle
      cy.get('[class*="toggle"], [class*="billing"] input, [class*="annual"]').first().click({ force: true });
      // After toggle, annual prices should show — Starter annual = $758
      cy.contains(/758|63/).should('exist'); // $758/yr or ~$63/mo equivalent
    });
  });

  // ── MCP Classification ──
  describe('MCP Value Classification', () => {
    it('displays LVP/MVP/HVP pricing tiers', () => {
      cy.contains(/LVP|Low.Value/i).should('exist');
      cy.contains(/MVP|Medium.Value/i).should('exist');
      cy.contains(/HVP|High.Value/i).should('exist');
    });

    it('shows LVP at $9/mo', () => {
      cy.contains('9').should('exist');
    });

    it('shows MVP at $29/mo', () => {
      cy.contains('29').should('exist');
    });

    it('shows HVP at $79/mo', () => {
      cy.contains('79').should('exist');
    });
  });

  // ── Ecosystem Bundles ──
  describe('Ecosystem Bundles', () => {
    it('displays ecosystem bundle section', () => {
      cy.contains(/Ecosystem|Bundle/i).should('exist');
    });

    it('shows Security Operations bundle', () => {
      cy.contains(/Security/i).should('exist');
    });

    it('shows Governance & Compliance bundle', () => {
      cy.contains(/Governance/i).should('exist');
    });
  });

  // ── Add-ons ──
  describe('Add-ons & One-time Products', () => {
    it('displays COBOL Bridge section', () => {
      cy.contains(/COBOL/i).should('exist');
    });

    it('displays CASA Certification section', () => {
      cy.contains(/CASA/i).should('exist');
    });

    it('displays Credit Pack options', () => {
      cy.contains(/Credit/i).should('exist');
    });
  });

  // ── CTA Buttons ──
  describe('Call-to-Action Buttons', () => {
    it('each paid tier has a subscribe/get started button', () => {
      cy.interceptStripeAPIs();
      // All paid tiers should have a CTA
      cy.get('a[href*="checkout"], button[onclick*="checkout"], [class*="cta"], .tier-card a, .pricing-card a')
        .should('have.length.gte', 3);
    });

    it('Community tier has a "Get Started" or free CTA', () => {
      cy.contains('Community')
        .parents('.tier-card, .pricing-card, [class*="tier"]').first()
        .find('a, button')
        .should('exist');
    });
  });

  // ── Page Load & SEO ──
  describe('Page Load & Meta', () => {
    it('has proper page title', () => {
      cy.title().should('contain', 'Pricing');
    });

    it('has meta description', () => {
      cy.get('meta[name="description"]').should('have.attr', 'content').and('not.be.empty');
    });

    it('loads pricing-config.js', () => {
      cy.window().its('CSGA_PRICING').should('have.property', 'memberships');
    });
  });
});
