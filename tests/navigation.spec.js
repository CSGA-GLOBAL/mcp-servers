// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * CSGA Global — Playwright Navigation & Page Load Tests
 * ══════════════════════════════════════════════════════
 */

test.describe('Navigation & Site Structure', () => {

  test('homepage loads with header and nav', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.header-bar, header')).toBeVisible();
    await expect(page.locator('.nav-bar, nav')).toBeVisible();
    await expect(page.locator('.logo, [class*="logo"]')).toBeVisible();
  });

  test('all major pages load without errors', async ({ page }) => {
    const pages = [
      '/',
      '/pricing.html',
      '/dashboard.html',
      '/programs.html',
      '/courses.html',
      '/faq.html',
      '/contact.html',
      '/blog/',
    ];

    for (const path of pages) {
      const res = await page.goto(path);
      expect(res.status(), `Page ${path} returned ${res.status()}`).toBeLessThan(500);
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('MCP pages load (spot check)', async ({ page }) => {
    const mcpPages = [
      '/mcp/ai-governance-scanner.html',
      '/mcp/threat-intelligence-aggregator.html',
      '/mcp/compliance-mapper.html',
    ];

    for (const path of mcpPages) {
      const res = await page.goto(path);
      expect(res.status(), `MCP page ${path}`).toBeLessThan(500);
    }
  });

  test('footer renders with links', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    const linkCount = await footer.locator('a').count();
    expect(linkCount).toBeGreaterThanOrEqual(3);
  });

  test('pricing-config.js loads on pricing page', async ({ page }) => {
    await page.goto('/pricing.html');
    const hasConfig = await page.evaluate(() => typeof window.CSGA_PRICING !== 'undefined');
    expect(hasConfig).toBe(true);
  });

  test('pricing-config.js loads on dashboard', async ({ page }) => {
    await page.goto('/dashboard.html');
    const hasConfig = await page.evaluate(() => typeof window.CSGA_PRICING !== 'undefined');
    expect(hasConfig).toBe(true);
  });
});

test.describe('Mobile Responsive', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('shows hamburger menu on mobile', async ({ page }) => {
    await page.goto('/');
    const hamburger = page.locator('[class*="hamburger"], [class*="mobile-menu"], [class*="menu-btn"], button[aria-label*="menu" i]');
    await expect(hamburger.first()).toBeVisible();
  });

  test('hamburger toggles navigation', async ({ page }) => {
    await page.goto('/');
    const hamburger = page.locator('[class*="hamburger"], [class*="mobile-menu"], [class*="menu-btn"], button[aria-label*="menu" i]').first();
    await hamburger.click();
    await page.waitForTimeout(500);

    // After click, at least some nav links should be visible
    const visibleLinks = page.locator('nav a:visible, .nav-bar a:visible, [class*="mobile"] a:visible');
    const count = await visibleLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});
