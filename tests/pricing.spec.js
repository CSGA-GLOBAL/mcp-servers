// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * CSGA Global — Playwright Pricing & Config Tests
 * ═════════════════════════════════════════════════
 */

const BASE = '';

test.describe('Pricing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pricing.html');
    await page.waitForFunction(() => typeof window.CSGA_PRICING !== 'undefined', null, { timeout: 10000 });
  });

  test('renders all 6 membership tiers', async ({ page }) => {
    await expect(page.getByText('Community')).toBeVisible();
    await expect(page.getByText('Starter')).toBeVisible();
    await expect(page.getByText('Professional')).toBeVisible();
    await expect(page.getByText(/Enterprise Sector/)).toBeVisible();
    await expect(page.getByText(/Enterprise Full/)).toBeVisible();
    await expect(page.getByText(/Enterprise Custom/)).toBeVisible();
  });

  test('shows correct monthly prices', async ({ page }) => {
    const prices = ['Free', '$79', '$199', '$499', '$1,499', '$2,499'];
    for (const price of prices) {
      await expect(page.getByText(price, { exact: false })).toBeVisible();
    }
  });

  test('pricing config has complete structure', async ({ page }) => {
    const config = await page.evaluate(() => {
      return {
        hasMemberships: !!window.CSGA_PRICING.memberships,
        hasMcpCatalog: !!window.CSGA_PRICING.mcpCatalog,
        hasMcpClassification: !!window.CSGA_PRICING.mcpClassification,
        hasEcosystems: !!window.CSGA_PRICING.ecosystems,
        hasCobolBridge: !!window.CSGA_PRICING.cobolBridge,
        hasCasaCertification: !!window.CSGA_PRICING.casaCertification,
        hasCreditPacks: !!window.CSGA_PRICING.creditPacks,
        hasStripe: !!window.CSGA_PRICING.stripe,
        tierCount: Object.keys(window.CSGA_PRICING.memberships).length,
        mcpCount: Object.keys(window.CSGA_PRICING.mcpCatalog).length,
      };
    });

    expect(config.hasMemberships).toBe(true);
    expect(config.hasMcpCatalog).toBe(true);
    expect(config.hasMcpClassification).toBe(true);
    expect(config.hasEcosystems).toBe(true);
    expect(config.hasCobolBridge).toBe(true);
    expect(config.hasCasaCertification).toBe(true);
    expect(config.hasCreditPacks).toBe(true);
    expect(config.hasStripe).toBe(true);
    expect(config.tierCount).toBeGreaterThanOrEqual(6);
    expect(config.mcpCount).toBeGreaterThanOrEqual(40);
  });

  test('LVP/MVP/HVP classification present', async ({ page }) => {
    const classes = await page.evaluate(() => {
      const c = window.CSGA_PRICING.mcpClassification;
      return { lvp: c.lvp?.monthlyPrice, mvp: c.mvp?.monthlyPrice, hvp: c.hvp?.monthlyPrice };
    });
    expect(classes.lvp).toBe(9);
    expect(classes.mvp).toBe(29);
    expect(classes.hvp).toBe(79);
  });

  test('credit packs have correct prices', async ({ page }) => {
    const packs = await page.evaluate(() => {
      const p = window.CSGA_PRICING.creditPacks;
      return {
        starter: p.starter?.price,
        professional: p.professional?.price,
        enterprise: p.enterprise?.price,
      };
    });
    expect(packs.starter).toBe(9);
    expect(packs.professional).toBe(29);
    expect(packs.enterprise).toBe(99);
  });

  test('all membership tiers have correct credit allocations', async ({ page }) => {
    const credits = await page.evaluate(() => {
      const m = window.CSGA_PRICING.memberships;
      return Object.fromEntries(
        Object.entries(m).map(([k, v]) => [k, v.credits])
      );
    });
    expect(credits.community).toBe(100);
    expect(credits.starter).toBe(2500);
    expect(credits.professional).toBe(10000);
  });

  test('Stripe endpoints configured correctly', async ({ page }) => {
    const endpoints = await page.evaluate(() => window.CSGA_PRICING.stripe.endpoints);
    expect(endpoints.checkout).toContain('create-checkout-session');
    expect(endpoints.portal).toContain('customer-portal');
    expect(endpoints.webhook).toContain('stripe-webhook');
    expect(endpoints.usage).toContain('usage');
  });

  test('csga_checkout and csga_openPortal functions exist', async ({ page }) => {
    const fns = await page.evaluate(() => ({
      checkout: typeof window.csga_checkout,
      portal: typeof window.csga_openPortal,
    }));
    expect(fns.checkout).toBe('function');
    expect(fns.portal).toBe('function');
  });
});
