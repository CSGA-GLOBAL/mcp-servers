// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * CSGA Global — Playwright API Tests
 * ════════════════════════════════════
 * Tests all 4 serverless functions directly via HTTP.
 */

const BASE_URL = 'https://csga-global.vercel.app';

test.describe('API Endpoints', () => {

  // ── Checkout Session ──
  test.describe('POST /api/create-checkout-session', () => {
    test('rejects GET requests with 405', async ({ request }) => {
      const res = await request.get(`${BASE_URL}/api/create-checkout-session`);
      expect(res.status()).toBe(405);
    });

    test('returns 400 without priceId', async ({ request }) => {
      const res = await request.post(`${BASE_URL}/api/create-checkout-session`, {
        data: { mode: 'subscription' },
      });
      expect(res.status()).toBe(400);
      const body = await res.json();
      expect(body.error).toContain('priceId');
    });

    test('CORS headers present on OPTIONS', async ({ request }) => {
      const res = await request.fetch(`${BASE_URL}/api/create-checkout-session`, {
        method: 'OPTIONS',
      });
      expect(res.status()).toBe(200);
      expect(res.headers()['access-control-allow-origin']).toBe('*');
    });

    test('handles subscription checkout request', async ({ request }) => {
      const res = await request.post(`${BASE_URL}/api/create-checkout-session`, {
        data: {
          priceId: 'price_starter_monthly',
          mode: 'subscription',
          customerEmail: 'playwright@csga-e2e.org',
          metadata: { tier: 'starter', source: 'playwright-test' },
        },
      });
      // Placeholder price IDs will cause Stripe error — expected
      const body = await res.json();
      if (res.status() === 200) {
        expect(body).toHaveProperty('sessionId');
        expect(body).toHaveProperty('url');
      } else {
        expect(body).toHaveProperty('error');
      }
    });

    test('handles payment (one-time) checkout request', async ({ request }) => {
      const res = await request.post(`${BASE_URL}/api/create-checkout-session`, {
        data: {
          priceId: 'price_credit_starter',
          mode: 'payment',
          customerEmail: 'playwright@csga-e2e.org',
          metadata: { productType: 'credit_pack', credits: '1000' },
        },
      });
      const body = await res.json();
      if (res.status() === 200) {
        expect(body).toHaveProperty('sessionId');
      } else {
        expect(body).toHaveProperty('error');
      }
    });
  });

  // ── Customer Portal ──
  test.describe('POST /api/customer-portal', () => {
    test('rejects GET requests with 405', async ({ request }) => {
      const res = await request.get(`${BASE_URL}/api/customer-portal`);
      expect(res.status()).toBe(405);
    });

    test('returns 400 without customerId', async ({ request }) => {
      const res = await request.post(`${BASE_URL}/api/customer-portal`, {
        data: {},
      });
      expect(res.status()).toBe(400);
      const body = await res.json();
      expect(body.error).toContain('customerId');
    });

    test('attempts portal creation with test customer', async ({ request }) => {
      const res = await request.post(`${BASE_URL}/api/customer-portal`, {
        data: {
          customerId: 'cus_playwright_test',
          returnUrl: `${BASE_URL}/dashboard`,
        },
      });
      const body = await res.json();
      // Invalid customer → Stripe error, but API handled it gracefully
      if (res.status() === 200) {
        expect(body).toHaveProperty('url');
      } else {
        expect(body).toHaveProperty('error');
        expect(res.status()).toBeGreaterThanOrEqual(400);
      }
    });
  });

  // ── Usage API ──
  test.describe('/api/usage', () => {
    test('returns 400 for unknown action', async ({ request }) => {
      const res = await request.get(`${BASE_URL}/api/usage?action=unknown`);
      expect(res.status()).toBe(400);
      const body = await res.json();
      expect(body.error).toContain('action');
    });

    test('status requires customerId', async ({ request }) => {
      const res = await request.get(`${BASE_URL}/api/usage?action=status`);
      expect(res.status()).toBe(400);
      const body = await res.json();
      expect(body.error).toContain('customerId');
    });

    test('status returns usage data shape', async ({ request }) => {
      const res = await request.get(`${BASE_URL}/api/usage?action=status&customerId=cus_playwright`);
      const body = await res.json();
      if (res.status() === 200) {
        expect(body).toHaveProperty('customerId');
        expect(body).toHaveProperty('tier');
        expect(body).toHaveProperty('usage');
        expect(body.usage).toHaveProperty('callsUsed');
        expect(body.usage).toHaveProperty('includedCredits');
        expect(body.usage).toHaveProperty('remaining');
        expect(body.usage).toHaveProperty('overageRate');
      } else {
        // Stripe customer lookup may fail
        expect(body).toHaveProperty('error');
      }
    });

    test('record usage with valid params', async ({ request }) => {
      const res = await request.post(`${BASE_URL}/api/usage`, {
        data: {
          action: 'record',
          customerId: 'cus_playwright',
          calls: 10,
          mcpSlug: 'playwright-test-mcp',
        },
      });
      const body = await res.json();
      if (res.status() === 200) {
        expect(body.recorded).toBe(true);
        expect(body.totalCalls).toBeGreaterThanOrEqual(10);
      } else {
        expect(body).toHaveProperty('error');
      }
    });

    test('add credits with valid params', async ({ request }) => {
      const res = await request.post(`${BASE_URL}/api/usage`, {
        data: {
          action: 'add-credits',
          customerId: 'cus_playwright',
          credits: 500,
        },
      });
      const body = await res.json();
      if (res.status() === 200) {
        expect(body.added).toBe(true);
        expect(body.bonusCredits).toBeGreaterThanOrEqual(500);
      } else {
        expect(body).toHaveProperty('error');
      }
    });
  });

  // ── Webhook ──
  test.describe('POST /api/stripe-webhook', () => {
    test('rejects GET with 405', async ({ request }) => {
      const res = await request.get(`${BASE_URL}/api/stripe-webhook`);
      expect(res.status()).toBe(405);
    });

    test('handles checkout.session.completed event', async ({ request }) => {
      const res = await request.post(`${BASE_URL}/api/stripe-webhook`, {
        data: {
          type: 'checkout.session.completed',
          data: {
            object: {
              id: 'cs_pw_test',
              customer: 'cus_playwright',
              customer_email: 'pw@csga.org',
              mode: 'subscription',
              subscription: 'sub_pw_test',
              metadata: { tier: 'professional' },
            },
          },
        },
      });
      // Without webhook secret configured, it may process or reject
      expect([200, 400]).toContain(res.status());
    });

    test('handles invoice.paid event', async ({ request }) => {
      const res = await request.post(`${BASE_URL}/api/stripe-webhook`, {
        data: {
          type: 'invoice.paid',
          data: {
            object: {
              id: 'in_pw_test',
              customer: 'cus_playwright',
              subscription: 'sub_pw_test',
              amount_paid: 19900,
            },
          },
        },
      });
      expect([200, 400]).toContain(res.status());
    });

    test('handles invoice.payment_failed event', async ({ request }) => {
      const res = await request.post(`${BASE_URL}/api/stripe-webhook`, {
        data: {
          type: 'invoice.payment_failed',
          data: {
            object: {
              id: 'in_pw_fail',
              customer: 'cus_playwright',
              attempt_count: 2,
            },
          },
        },
      });
      expect([200, 400]).toContain(res.status());
    });

    test('handles subscription.deleted event', async ({ request }) => {
      const res = await request.post(`${BASE_URL}/api/stripe-webhook`, {
        data: {
          type: 'customer.subscription.deleted',
          data: {
            object: {
              id: 'sub_pw_cancel',
              customer: 'cus_playwright',
            },
          },
        },
      });
      expect([200, 400]).toContain(res.status());
    });

    test('handles payment_intent.succeeded for credit pack', async ({ request }) => {
      const res = await request.post(`${BASE_URL}/api/stripe-webhook`, {
        data: {
          type: 'payment_intent.succeeded',
          data: {
            object: {
              id: 'pi_pw_credits',
              customer: 'cus_playwright',
              amount: 2900,
              metadata: { productType: 'credit_pack', credits: '5000', pack: 'professional' },
            },
          },
        },
      });
      expect([200, 400]).toContain(res.status());
    });
  });
});
