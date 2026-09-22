import { test, expect } from '@playwright/test';
import { LoginPage } from '../../03-Web-Automation/tests/pages/LoginPage';
import { InventoryPage } from '../../03-Web-Automation/tests/pages/InventoryPage';
import testData from '../../03-Web-Automation/tests/fixtures/test-data.json';

test.describe('Database Validation Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login(testData.validUser.username, testData.validUser.password);
  });

  test('Validate product count matches expected', async ({ page }) => {
    const productCount = await inventoryPage.getProductCount();
    expect(productCount).toBe(6);
  });

  test('Validate product prices are positive numbers', async () => {
    const prices = await inventoryPage.getProductPrices();
    for (const price of prices) {
      expect(price).toBeGreaterThan(0);
      expect(price).toBeLessThan(10000);
    }
  });

  test('Validate product names are not empty', async () => {
    const names = await inventoryPage.getProductNames();
    for (const name of names) {
      expect(name.length).toBeGreaterThan(0);
      expect(name.trim()).toBe(name);
    }
  });

  test('Validate sort order consistency', async () => {
    await inventoryPage.sortBy('lohi');
    const pricesLowHigh = await inventoryPage.getProductPrices();
    const sortedLowHigh = [...pricesLowHigh].sort((a, b) => a - b);
    expect(pricesLowHigh).toEqual(sortedLowHigh);

    await inventoryPage.sortBy('hilo');
    const pricesHighLow = await inventoryPage.getProductPrices();
    const sortedHighLow = [...pricesHighLow].sort((a, b) => b - a);
    expect(pricesHighLow).toEqual(sortedHighLow);
  });

  test('Validate cart data integrity', async () => {
    await inventoryPage.addProductByName(testData.products.backpack);
    const badge = await inventoryPage.getCartBadgeCount();
    expect(badge).toBe('1');

    await inventoryPage.addProductByName(testData.products.bikeLight);
    const badge2 = await inventoryPage.getCartBadgeCount();
    expect(badge2).toBe('2');
  });
});