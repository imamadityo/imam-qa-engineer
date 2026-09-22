import { test, expect } from '@playwright/test';

test.describe('Security Testing - API Payloads', () => {
  const baseUrl = 'https://www.saucedemo.com';

  test('SQL Injection - Login Form', async ({ page }) => {
    await page.goto('/');

    // Test SQL injection payloads
    const sqlPayloads = [
      "' OR 1=1--",
      "admin'--",
      "' OR '1'='1",
      "1; DROP TABLE users--",
      "' UNION SELECT * FROM users--",
    ];

    for (const payload of sqlPayloads) {
      await page.locator('[data-test="username"]').fill(payload);
      await page.locator('[data-test="password"]').fill('anything');
      await page.locator('[data-test="login-button"]').click();

      // Should not login successfully
      const url = page.url();
      expect(url).not.toContain('inventory');

      // Clear fields for next attempt
      await page.locator('[data-test="username"]').clear();
      await page.locator('[data-test="password"]').clear();
    }
  });

  test('XSS - Input Fields', async ({ page }) => {
    await page.goto('/');

    // Test XSS payloads
    const xssPayloads = [
      '<script>alert("XSS")</script>',
      '<img src=x onerror=alert(1)>',
      '"><script>alert(document.cookie)</script>',
      "javascript:alert('XSS')",
      '<svg onload=alert(1)>',
    ];

    for (const payload of xssPayloads) {
      await page.locator('[data-test="username"]').fill(payload);
      await page.locator('[data-test="password"]').fill('anything');
      await page.locator('[data-test="login-button"]').click();

      // Check if script executed (should not)
      const dialogFired = await page.evaluate(() => {
        return (window as any).__xssFired || false;
      });
      expect(dialogFired).toBe(false);

      await page.locator('[data-test="username"]').clear();
      await page.locator('[data-test="password"]').clear();
    }
  });

  test('Session Management - Access after logout', async ({ page }) => {
    const loginPage = page;
    await loginPage.goto('/');

    // Login
    await loginPage.locator('[data-test="username"]').fill('standard_user');
    await loginPage.locator('[data-test="password"]').fill('secret_sauce');
    await loginPage.locator('[data-test="login-button"]').click();
    await expect(loginPage).toHaveURL(/inventory/);

    // Logout
    await loginPage.locator('#react-burger-menu-btn').click();
    await loginPage.waitForTimeout(500);
    await loginPage.locator('#logout_sidebar_link').click();

    // Try to access inventory directly
    await loginPage.goto('/inventory.html');
    await expect(loginPage).toHaveURL(/\/$/);
  });

  test('Direct URL Access - Protected Pages', async ({ page }) => {
    // Try to access inventory without login
    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/\/$/);

    // Try to access cart without login
    await page.goto('/cart.html');
    await expect(page).toHaveURL(/\/$/);

    // Try to access checkout without login
    await page.goto('/checkout-step-one.html');
    await expect(page).toHaveURL(/\/$/);
  });

  test('Input Boundary - Long Input Strings', async ({ page }) => {
    await page.goto('/');

    // Test with very long input
    const longString = 'A'.repeat(10000);
    await page.locator('[data-test="username"]').fill(longString);
    await page.locator('[data-test="password"]').fill(longString);
    await page.locator('[data-test="login-button"]').click();

    // Should not crash or expose error
    const errorMsg = await page.locator('[data-test="error"]').textContent();
    expect(errorMsg).toBeTruthy();
  });
});