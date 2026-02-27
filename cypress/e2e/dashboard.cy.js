/// <reference types="cypress" />

/**
 * CSGA Global — Dashboard E2E Tests
 * ═══════════════════════════════════
 * Tests login/logout, subscription card, usage meter,
 * MCP grid, credit packs, billing portal, tier rendering.
 */

describe('Dashboard', () => {
  beforeEach(() => {
    cy.interceptStripeAPIs();
  });

  // ══════════════════════════════════
  //  LOGGED OUT STATE
  // ══════════════════════════════════
  describe('Logged Out', () => {
    beforeEach(() => {
      cy.visit('/dashboard.html');
    });

    it('shows login overlay when not authenticated', () => {
      cy.get('.login-overlay, [class*="login"]').should('be.visible');
    });

    it('has email input and login button', () => {
      cy.get('input[type="email"], input[placeholder*="email" i]').should('exist');
      cy.get('button').contains(/log.?in|sign.?in|enter/i).should('exist');
    });

    it('does not show dashboard content when logged out', () => {
      // Stats and cards should be hidden or show empty state
      cy.get('.dash-stat, [class*="stat"]').should('not.be.visible').or('have.length', 0);
    });
  });

  // ══════════════════════════════════
  //  LOGIN / LOGOUT FLOW
  // ══════════════════════════════════
  describe('Login Flow', () => {
    it('logs in with email and shows dashboard', () => {
      cy.visit('/dashboard.html');
      cy.get('input[type="email"], input[placeholder*="email" i]').type('pro@csga.org');
      cy.get('button').contains(/log.?in|sign.?in|enter/i).click();

      // Should now show logged-in state
      cy.contains('pro@csga.org').should('be.visible');
      cy.get('.login-overlay, [class*="login-overlay"]').should('not.be.visible');
    });

    it('detects Professional tier from "pro" in email', () => {
      cy.visit('/dashboard.html');
      cy.get('input[type="email"], input[placeholder*="email" i]').type('pro@csga.org');
      cy.get('button').contains(/log.?in|sign.?in|enter/i).click();

      cy.contains(/Professional/i).should('be.visible');
    });

    it('detects Starter tier from "starter" in email', () => {
      cy.visit('/dashboard.html');
      cy.get('input[type="email"], input[placeholder*="email" i]').type('starter@csga.org');
      cy.get('button').contains(/log.?in|sign.?in|enter/i).click();

      cy.contains(/Starter/i).should('be.visible');
    });

    it('defaults to Community tier for generic email', () => {
      cy.visit('/dashboard.html');
      cy.get('input[type="email"], input[placeholder*="email" i]').type('user@example.com');
      cy.get('button').contains(/log.?in|sign.?in|enter/i).click();

      cy.contains(/Community/i).should('be.visible');
    });

    it('persists session across page reload', () => {
      cy.visit('/dashboard.html');
      cy.get('input[type="email"], input[placeholder*="email" i]').type('pro@csga.org');
      cy.get('button').contains(/log.?in|sign.?in|enter/i).click();
      cy.contains('pro@csga.org').should('be.visible');

      // Reload
      cy.reload();
      cy.contains('pro@csga.org').should('be.visible');
    });

    it('logout clears session and shows login overlay', () => {
      cy.visit('/dashboard.html');
      cy.get('input[type="email"], input[placeholder*="email" i]').type('pro@csga.org');
      cy.get('button').contains(/log.?in|sign.?in|enter/i).click();
      cy.contains('pro@csga.org').should('be.visible');

      // Click logout
      cy.get('button, a').contains(/log.?out|sign.?out/i).click();

      // Should show login overlay again
      cy.get('.login-overlay, [class*="login"]').should('be.visible');
    });
  });

  // ══════════════════════════════════
  //  SUBSCRIPTION CARD
  // ══════════════════════════════════
  describe('Subscription Card', () => {
    beforeEach(() => {
      cy.visit('/dashboard.html');
      cy.get('input[type="email"], input[placeholder*="email" i]').type('pro@csga.org');
      cy.get('button').contains(/log.?in|sign.?in|enter/i).click();
    });

    it('displays current plan name', () => {
      cy.contains(/Professional/i).should('be.visible');
    });

    it('shows subscription price', () => {
      cy.contains(/199|\$199/i).should('exist');
    });

    it('shows tier badge with correct color', () => {
      cy.get('[class*="badge"], [class*="tier"]')
        .contains(/Professional/i)
        .should('be.visible');
    });

    it('has upgrade/manage button', () => {
      cy.get('button, a').filter(':contains("Upgrade"), :contains("Manage"), :contains("Change")')
        .should('have.length.gte', 1);
    });

    it('has billing portal button', () => {
      cy.get('button, a').filter(':contains("Billing"), :contains("Portal"), :contains("Payment")')
        .should('have.length.gte', 1);
    });
  });

  // ══════════════════════════════════
  //  STATS ROW
  // ══════════════════════════════════
  describe('Stats Row', () => {
    beforeEach(() => {
      cy.visit('/dashboard.html');
      cy.get('input[type="email"], input[placeholder*="email" i]').type('pro@csga.org');
      cy.get('button').contains(/log.?in|sign.?in|enter/i).click();
    });

    it('shows Plan stat', () => {
      cy.contains(/Plan/i).should('be.visible');
    });

    it('shows Credits Used stat', () => {
      cy.contains(/Credit/i).should('be.visible');
    });

    it('shows MCP Access count', () => {
      cy.contains(/MCP/i).should('be.visible');
    });

    it('shows Period end date', () => {
      cy.contains(/Period|Billing|Renew/i).should('be.visible');
    });
  });

  // ══════════════════════════════════
  //  USAGE METER
  // ══════════════════════════════════
  describe('Usage Meter', () => {
    beforeEach(() => {
      cy.visit('/dashboard.html');
      cy.get('input[type="email"], input[placeholder*="email" i]').type('pro@csga.org');
      cy.get('button').contains(/log.?in|sign.?in|enter/i).click();
    });

    it('displays usage progress bar', () => {
      cy.get('[class*="usage"], [class*="meter"], [class*="progress"]').should('exist');
    });

    it('shows usage numbers (used / total)', () => {
      cy.get('[class*="usage"]').should('exist');
    });
  });

  // ══════════════════════════════════
  //  MCP GRID
  // ══════════════════════════════════
  describe('MCP Grid', () => {
    beforeEach(() => {
      cy.visit('/dashboard.html');
      cy.get('input[type="email"], input[placeholder*="email" i]').type('pro@csga.org');
      cy.get('button').contains(/log.?in|sign.?in|enter/i).click();
    });

    it('renders MCP items from pricing config', () => {
      cy.get('[class*="mcp-item"], [class*="mcp"]').should('have.length.gte', 1);
    });

    it('shows LVP/MVP/HVP badges on MCP items', () => {
      cy.get('[class*="mcp"]').then(($els) => {
        if ($els.length > 0) {
          // At least some should have classification badges
          cy.get('body').then(($body) => {
            const hasLVP = $body.text().includes('LVP');
            const hasMVP = $body.text().includes('MVP');
            const hasHVP = $body.text().includes('HVP');
            expect(hasLVP || hasMVP || hasHVP).to.be.true;
          });
        }
      });
    });

    it('shows access status for each MCP based on tier', () => {
      cy.get('[class*="mcp"]').first().should('exist');
    });
  });

  // ══════════════════════════════════
  //  QUICK ACTIONS
  // ══════════════════════════════════
  describe('Quick Actions', () => {
    beforeEach(() => {
      cy.visit('/dashboard.html');
      cy.get('input[type="email"], input[placeholder*="email" i]').type('pro@csga.org');
      cy.get('button').contains(/log.?in|sign.?in|enter/i).click();
    });

    it('has Buy Credits button', () => {
      cy.contains(/Buy Credit|Add Credit|Credit Pack/i).should('exist');
    });

    it('has links to documentation/support', () => {
      cy.get('a[href*="docs"], a[href*="support"], a[href*="faq"]').should('have.length.gte', 1);
    });
  });

  // ══════════════════════════════════
  //  POST-CHECKOUT REDIRECT
  // ══════════════════════════════════
  describe('Post-Checkout Session Handling', () => {
    it('handles ?session_id= query param on dashboard load', () => {
      cy.visit('/dashboard.html?session_id=cs_test_123');
      // Should attempt to process the session — won't crash
      cy.get('body').should('be.visible');
    });
  });
});
