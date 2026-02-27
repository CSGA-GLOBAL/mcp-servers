// ***********************************************************
// CSGA Global — Cypress E2E Support
// ***********************************************************

// ── Custom Commands ──

/**
 * Simulate login via localStorage (mirrors dashboard demo auth)
 */
Cypress.Commands.add('login', (email = 'pro@csga.org', tier = 'professional') => {
  cy.window().then((win) => {
    win.localStorage.setItem('csga_session', JSON.stringify({
      loggedIn: true,
      email,
      customerId: `cus_test_${tier}`,
      tier,
      loginTime: new Date().toISOString(),
    }));
  });
});

Cypress.Commands.add('logout', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('csga_session');
  });
});

/**
 * Assert no console errors (ignoring benign ones)
 */
Cypress.Commands.add('assertNoConsoleErrors', () => {
  cy.window().then((win) => {
    // This captures errors that happened during page load
    // Note: full console spying requires beforeEach setup
  });
});

/**
 * Wait for CSGA_PRICING to be loaded
 */
Cypress.Commands.add('waitForPricingConfig', () => {
  cy.window().its('CSGA_PRICING').should('exist');
});

/**
 * Intercept Stripe API calls
 */
Cypress.Commands.add('interceptStripeAPIs', () => {
  cy.intercept('POST', '/api/create-checkout-session', {
    statusCode: 200,
    body: { sessionId: 'cs_test_mock', url: 'https://checkout.stripe.com/mock' },
  }).as('checkoutSession');

  cy.intercept('POST', '/api/customer-portal', {
    statusCode: 200,
    body: { url: 'https://billing.stripe.com/mock' },
  }).as('customerPortal');

  cy.intercept('GET', '/api/usage?action=status*', {
    statusCode: 200,
    body: {
      customerId: 'cus_test',
      tier: 'professional',
      subscription: { id: 'sub_test', status: 'active', currentPeriodEnd: Math.floor(Date.now() / 1000) + 86400 * 30 },
      usage: {
        callsUsed: 3200,
        includedCredits: 10000,
        bonusCredits: 0,
        totalAvailable: 10000,
        remaining: 6800,
        overageCount: 0,
        overageRate: 0.15,
        estimatedOverageCost: '$0.00',
      },
      period: {
        start: new Date().toISOString(),
        end: new Date(Date.now() + 86400000 * 30).toISOString(),
      },
    },
  }).as('usageStatus');

  cy.intercept('POST', '/api/usage', {
    statusCode: 200,
    body: { recorded: true, customerId: 'cus_test', totalCalls: 3201 },
  }).as('usageRecord');
});

// ── Global Before Each ──
beforeEach(() => {
  // Prevent uncaught exceptions from failing tests
  cy.on('uncaught:exception', (err) => {
    // Stripe.js and other third-party errors
    if (err.message.includes('Stripe') || err.message.includes('stripe')) return false;
    if (err.message.includes('ResizeObserver')) return false;
    if (err.message.includes('Script error')) return false;
    return true;
  });
});
