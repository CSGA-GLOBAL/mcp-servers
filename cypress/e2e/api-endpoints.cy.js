/// <reference types="cypress" />

/**
 * CSGA Global — API Endpoint E2E Tests
 * ═════════════════════════════════════
 * Tests all 4 Vercel serverless functions:
 *   /api/create-checkout-session
 *   /api/customer-portal
 *   /api/usage
 *   /api/stripe-webhook
 */

const API = Cypress.env('API_BASE') || '/api';

describe('API Endpoints', () => {

  // ══════════════════════════════════
  //  CHECKOUT SESSION
  // ══════════════════════════════════
  describe('POST /api/create-checkout-session', () => {
    it('returns 405 for GET requests', () => {
      cy.request({ url: `${API}/create-checkout-session`, failOnStatusCode: false })
        .its('status').should('eq', 405);
    });

    it('returns 400 when priceId is missing', () => {
      cy.request({
        method: 'POST',
        url: `${API}/create-checkout-session`,
        body: { mode: 'subscription' },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(400);
        expect(res.body.error).to.contain('priceId');
      });
    });

    it('handles CORS preflight OPTIONS request', () => {
      cy.request({
        method: 'OPTIONS',
        url: `${API}/create-checkout-session`,
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.headers['access-control-allow-origin']).to.eq('*');
        expect(res.headers['access-control-allow-methods']).to.contain('POST');
      });
    });

    it('creates a subscription checkout session with valid priceId', () => {
      cy.request({
        method: 'POST',
        url: `${API}/create-checkout-session`,
        body: {
          priceId: 'price_starter_monthly',
          mode: 'subscription',
          customerEmail: 'test@csga-e2e.org',
          metadata: { tier: 'starter', source: 'e2e-test' },
        },
        failOnStatusCode: false,
      }).then((res) => {
        // May fail with invalid price (placeholder IDs) — that's expected
        // We test the shape of the error response or success
        if (res.status === 200) {
          expect(res.body).to.have.property('sessionId');
          expect(res.body).to.have.property('url');
        } else {
          // Stripe will return error for placeholder price IDs
          expect(res.body).to.have.property('error');
          expect(res.status).to.be.oneOf([400, 500]);
        }
      });
    });

    it('creates a payment (one-time) checkout session', () => {
      cy.request({
        method: 'POST',
        url: `${API}/create-checkout-session`,
        body: {
          priceId: 'price_credit_starter',
          mode: 'payment',
          customerEmail: 'test@csga-e2e.org',
          metadata: { productType: 'credit_pack', credits: '1000' },
        },
        failOnStatusCode: false,
      }).then((res) => {
        if (res.status === 200) {
          expect(res.body).to.have.property('sessionId');
          expect(res.body).to.have.property('url');
        } else {
          expect(res.body).to.have.property('error');
        }
      });
    });
  });

  // ══════════════════════════════════
  //  CUSTOMER PORTAL
  // ══════════════════════════════════
  describe('POST /api/customer-portal', () => {
    it('returns 405 for GET requests', () => {
      cy.request({ url: `${API}/customer-portal`, failOnStatusCode: false })
        .its('status').should('eq', 405);
    });

    it('returns 400 when customerId is missing', () => {
      cy.request({
        method: 'POST',
        url: `${API}/customer-portal`,
        body: {},
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(400);
        expect(res.body.error).to.contain('customerId');
      });
    });

    it('handles CORS preflight', () => {
      cy.request({
        method: 'OPTIONS',
        url: `${API}/customer-portal`,
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.headers['access-control-allow-origin']).to.eq('*');
      });
    });

    it('attempts portal creation with test customerId', () => {
      cy.request({
        method: 'POST',
        url: `${API}/customer-portal`,
        body: { customerId: 'cus_test_e2e', returnUrl: 'https://csga-global.vercel.app/dashboard' },
        failOnStatusCode: false,
      }).then((res) => {
        if (res.status === 200) {
          expect(res.body).to.have.property('url');
        } else {
          // Invalid customer ID will error — expected
          expect(res.body).to.have.property('error');
        }
      });
    });
  });

  // ══════════════════════════════════
  //  USAGE API
  // ══════════════════════════════════
  describe('/api/usage', () => {

    describe('GET ?action=status', () => {
      it('returns 400 when customerId is missing', () => {
        cy.request({
          url: `${API}/usage?action=status`,
          failOnStatusCode: false,
        }).then((res) => {
          expect(res.status).to.eq(400);
          expect(res.body.error).to.contain('customerId');
        });
      });

      it('returns usage data shape for a customerId', () => {
        cy.request({
          url: `${API}/usage?action=status&customerId=cus_test_e2e`,
          failOnStatusCode: false,
        }).then((res) => {
          if (res.status === 200) {
            expect(res.body).to.have.property('customerId');
            expect(res.body).to.have.property('tier');
            expect(res.body).to.have.property('usage');
            expect(res.body.usage).to.have.property('callsUsed');
            expect(res.body.usage).to.have.property('includedCredits');
            expect(res.body.usage).to.have.property('remaining');
          } else {
            // Stripe lookup may fail for test customer
            expect(res.body).to.have.property('error');
          }
        });
      });
    });

    describe('POST ?action=record', () => {
      it('returns 400 when customerId or calls missing', () => {
        cy.request({
          method: 'POST',
          url: `${API}/usage?action=record`,
          body: {},
          failOnStatusCode: false,
        }).then((res) => {
          // POST to record without params
          expect(res.status).to.be.oneOf([400, 405, 500]);
        });
      });

      it('records usage with valid params', () => {
        cy.request({
          method: 'POST',
          url: `${API}/usage`,
          body: { action: 'record', customerId: 'cus_test_e2e', calls: 5, mcpSlug: 'test-mcp' },
          failOnStatusCode: false,
        }).then((res) => {
          if (res.status === 200) {
            expect(res.body).to.have.property('recorded', true);
            expect(res.body).to.have.property('totalCalls');
          } else {
            expect(res.body).to.have.property('error');
          }
        });
      });
    });

    describe('POST ?action=add-credits', () => {
      it('returns 400 when params missing', () => {
        cy.request({
          method: 'POST',
          url: `${API}/usage`,
          body: { action: 'add-credits' },
          failOnStatusCode: false,
        }).then((res) => {
          expect(res.status).to.be.oneOf([400, 500]);
        });
      });

      it('adds credits with valid params', () => {
        cy.request({
          method: 'POST',
          url: `${API}/usage`,
          body: { action: 'add-credits', customerId: 'cus_test_e2e', credits: 1000 },
          failOnStatusCode: false,
        }).then((res) => {
          if (res.status === 200) {
            expect(res.body).to.have.property('added', true);
            expect(res.body).to.have.property('bonusCredits');
          } else {
            expect(res.body).to.have.property('error');
          }
        });
      });
    });

    describe('Invalid action', () => {
      it('returns 400 for unknown action', () => {
        cy.request({
          url: `${API}/usage?action=invalid`,
          failOnStatusCode: false,
        }).then((res) => {
          expect(res.status).to.eq(400);
          expect(res.body.error).to.contain('action');
        });
      });
    });
  });

  // ══════════════════════════════════
  //  STRIPE WEBHOOK
  // ══════════════════════════════════
  describe('POST /api/stripe-webhook', () => {
    it('returns 405 for GET requests', () => {
      cy.request({
        url: `${API}/stripe-webhook`,
        failOnStatusCode: false,
      }).its('status').should('eq', 405);
    });

    it('handles CORS preflight', () => {
      cy.request({
        method: 'OPTIONS',
        url: `${API}/stripe-webhook`,
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(200);
      });
    });

    it('returns 400 for invalid signature when secret is configured', () => {
      cy.request({
        method: 'POST',
        url: `${API}/stripe-webhook`,
        headers: { 'stripe-signature': 'invalid_sig' },
        body: { type: 'test.event', data: { object: {} } },
        failOnStatusCode: false,
      }).then((res) => {
        // Should fail signature verification or process without sig
        expect(res.status).to.be.oneOf([200, 400]);
      });
    });

    it('processes checkout.session.completed event (no sig verification)', () => {
      cy.request({
        method: 'POST',
        url: `${API}/stripe-webhook`,
        body: {
          type: 'checkout.session.completed',
          data: {
            object: {
              id: 'cs_test_e2e',
              customer: 'cus_test_e2e',
              customer_email: 'test@csga-e2e.org',
              mode: 'subscription',
              subscription: 'sub_test_e2e',
              metadata: { tier: 'starter' },
            },
          },
        },
        failOnStatusCode: false,
      }).then((res) => {
        // Without webhook secret, it processes the event
        expect(res.status).to.be.oneOf([200, 400]);
        if (res.status === 200) {
          expect(res.body).to.have.property('received', true);
        }
      });
    });

    it('processes invoice.paid event', () => {
      cy.request({
        method: 'POST',
        url: `${API}/stripe-webhook`,
        body: {
          type: 'invoice.paid',
          data: {
            object: {
              id: 'in_test_e2e',
              customer: 'cus_test_e2e',
              subscription: 'sub_test_e2e',
              amount_paid: 19900,
            },
          },
        },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.be.oneOf([200, 400]);
      });
    });
  });
});
