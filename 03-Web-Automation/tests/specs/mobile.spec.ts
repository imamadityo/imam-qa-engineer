import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import testData from '../fixtures/test-data.json';

const iPhone13 = { viewport: { width: 390, height: 844 }, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1', isMobile: true, hasTouch: true };
const pixel5 = { viewport: { width: 915, height: 823 }, userAgent: 'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36', isMobile: true, hasTouch: true };
const iPadAir = { viewport: { width: 820, height: 1180 }, userAgent: 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1', isMobile: true, hasTouch: true };

test('Mobile Login - iPhone 13', async ({ browser }) => {
  const context = await browser.newContext({ ...iPhone13 });
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await loginPage.goto();
  await loginPage.login(testData.validUser.username, testData.validUser.password);
  await expect(page).toHaveURL(/inventory/);
  await expect(inventoryPage.title).toHaveText('Products');
  await context.close();
});

test('Mobile Touch - Add to Cart - iPhone 13', async ({ browser }) => {
  const context = await browser.newContext({ ...iPhone13 });
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await loginPage.goto();
  await loginPage.login(testData.validUser.username, testData.validUser.password);
  await page.waitForLoadState('networkidle');
  const addButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  await addButton.tap();
  const badgeCount = await inventoryPage.getCartBadgeCount();
  expect(badgeCount).toBe('1');
  await context.close();
});

test('Mobile Navigation - iPhone 13', async ({ browser }) => {
  const context = await browser.newContext({ ...iPhone13 });
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  await loginPage.goto();
  await loginPage.login(testData.validUser.username, testData.validUser.password);
  await page.waitForLoadState('networkidle');
  await inventoryPage.addProductByName(testData.products.backpack);
  await page.waitForSelector('.shopping_cart_badge', { timeout: 5000 });
  await inventoryPage.goToCart();
  await page.waitForSelector('.cart_item', { timeout: 5000 });
  const itemCount = await cartPage.getCartItemCount();
  expect(itemCount).toBe(1);
  await cartPage.continueShopping();
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('.inventory_item', { timeout: 5000 });
  const productCount = await inventoryPage.getProductCount();
  expect(productCount).toBeGreaterThan(0);
  await context.close();
});

test('Mobile Login - Pixel 5', async ({ browser }) => {
  const context = await browser.newContext({ ...pixel5 });
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await loginPage.goto();
  await loginPage.login(testData.validUser.username, testData.validUser.password);
  await expect(page).toHaveURL(/inventory/);
  await expect(inventoryPage.title).toHaveText('Products');
  await context.close();
});

test('Mobile Touch - Add to Cart - Pixel 5', async ({ browser }) => {
  const context = await browser.newContext({ ...pixel5 });
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await loginPage.goto();
  await loginPage.login(testData.validUser.username, testData.validUser.password);
  await page.waitForLoadState('networkidle');
  const addButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  await addButton.tap();
  const badgeCount = await inventoryPage.getCartBadgeCount();
  expect(badgeCount).toBe('1');
  await context.close();
});

test('Mobile Login - iPad Air', async ({ browser }) => {
  const context = await browser.newContext({ ...iPadAir });
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await loginPage.goto();
  await loginPage.login(testData.validUser.username, testData.validUser.password);
  await expect(page).toHaveURL(/inventory/);
  await expect(inventoryPage.title).toHaveText('Products');
  await context.close();
});

test.describe('Responsive Breakpoint Tests', () => {
  const viewports = [
    { name: 'Mobile Small', width: 320, height: 568 },
    { name: 'Mobile Medium', width: 375, height: 667 },
    { name: 'Mobile Large', width: 414, height: 896 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop Small', width: 1024, height: 768 },
    { name: 'Desktop Large', width: 1920, height: 1080 },
  ];

  for (const { name, width, height } of viewports) {
    test(`Responsive - ${name} (${width}x${height})`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);
      await loginPage.goto();
      await loginPage.login(testData.validUser.username, testData.validUser.password);
      await page.waitForLoadState('networkidle');
      const productCount = await inventoryPage.getProductCount();
      expect(productCount).toBeGreaterThan(0);
      await expect(inventoryPage.cartLink).toBeVisible();
    });
  }
});