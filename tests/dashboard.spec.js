// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * CSGA Global — Playwright Dashboard Tests
 * ══════════════════════════════════════════
 */

test.describe('Dashboard', () => {

  // ── Login / Logout ──
  test.describe('Authentication', () => {
    test('shows login overlay when not logged in', async ({ page }) => {
      await page.goto('/dashboard.html');
      const overlay = page.locator('.login-overlay, [class*="login"]').first();
      await expect(overlay).toBeVisible();
    });

    test('login with email shows dashboard content', async ({ page }) => {
      await page.goto('/dashboard.html');
      await page.fill('input[type="email"], input[placeholder*="email" i]', 'pro@csga.org');
      await page.click('button:has-text("Log"), button:has-text("Sign"), button:has-text("Enter")');

      // Overlay should hide
      await expect(page.locator('.login-overlay')).not.toBeVisible({ timeout: 5000 });
      // Email should appear somewhere
      await expect(page.getByText('pro@csga.org')).toBeVisible();
    });

    test('detects tier from email keyword', async ({ page }) => {
      const cases = [
        { email: 'starter@csga.org', tier: /Starter/i },
        { email: 'pro@csga.org', tier: /Professional/i },
        { email: 'enterprise@csga.org', tier: /Enterprise/i },
        { email: 'random@example.com', tier: /Community/i },
      ];

      for (const { email, tier } of cases) {
        await page.goto('/dashboard.html');
        await page.evaluate(() => localStorage.clear());
        await page.reload();
        await page.fill('input[type="email"], input[placeholder*="email" i]', email);
        await page.click('button:has-text("Log"), button:has-text("Sign"), button:has-text("Enter")');
        await expect(page.getByText(tier)).toBeVisible({ timeout: 5000 });
      }
    });

    test('session persists after reload', async ({ page }) => {
      await page.goto('/dashboard.html');
      await page.fill('input[type="email"], input[placeholder*="email" i]', 'pro@csga.org');
      await page.click('button:has-text("Log"), button:has-text("Sign"), button:has-text("Enter")');
      await expect(page.getByText('pro@csga.org')).toBeVisible();

      await page.reload();
      await expect(page.getByText('pro@csga.org')).toBeVisible({ timeout: 5000 });
    });

    test('logout clears session', async ({ page }) => {
      await page.goto('/dashboard.html');
      await page.fill('input[type="email"], input[placeholder*="email" i]', 'pro@csga.org');
      await page.click('button:has-text("Log"), button:has-text("Sign"), button:has-text("Enter")');
      await expect(page.getByText('pro@csga.org')).toBeVisible();

      await page.click('button:has-text("Logout"), button:has-text("Sign Out"), a:has-text("Logout")');
      await expect(page.locator('.login-overlay, [class*="login"]').first()).toBeVisible({ timeout: 5000 });
    });
  });

  // ── Dashboard Content ──
  test.describe('Dashboard Content (logged in)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/dashboard.html');
      await page.fill('input[type="email"], input[placeholder*="email" i]', 'pro@csga.org');
      await page.click('button:has-text("Log"), button:has-text("Sign"), button:has-text("Enter")');
      await page.waitForTimeout(1000);
    });

    test('displays stats row', async ({ page }) => {
      await expect(page.getByText(/Plan/i)).toBeVisible();
      await expect(page.getByText(/Credit/i)).toBeVisible();
      await expect(page.getByText(/MCP/i)).toBeVisible();
    });

    test('subscription card shows tier info', async ({ page }) => {
      await expect(page.getByText(/Professional/i)).toBeVisible();
      await expect(page.getByText(/199/)).toBeVisible();
    });

    test('MCP grid renders items', async ({ page }) => {
      const mcpItems = page.locator('[class*="mcp-item"], [class*="mcp"]');
      const count = await mcpItems.count();
      expect(count).toBeGreaterThan(0);
    });

    test('MCP items show LVP/MVP/HVP badges', async ({ page }) => {
      const pageText = await page.textContent('body');
      const hasClassification = pageText.includes('LVP') || pageText.includes('MVP') || pageText.includes('HVP');
      expect(hasClassification).toBe(true);
    });

    test('quick action buttons exist', async ({ page }) => {
      const creditBtn = page.locator('button, a').filter({ hasText: /Credit|Buy/i });
      await expect(creditBtn.first()).toBeVisible();
    });
  });

  // ── Post-Checkout Handling ──
  test.describe('Post-Checkout', () => {
    test('handles session_id query param gracefully', async ({ page }) => {
      await page.goto('/dashboard.html?session_id=cs_test_playwright');
      // Page should load without crashing
      await expect(page.locator('body')).toBeVisible();
    });
  });
});
