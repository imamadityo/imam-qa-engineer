import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import testData from '../fixtures/test-data.json';

test.describe('Inventory/Products Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login(testData.validUser.username, testData.validUser.password);
  });

  test('TC-006: Verifikasi product list tampil', async () => {
    const productCount = await inventoryPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
    expect(productCount).toBe(6);
  });

  test('TC-007: Sort produk A to Z', async () => {
    await inventoryPage.sortBy(testData.sortOptions.az);
    const names = await inventoryPage.getProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('TC-008: Sort produk Z to A', async () => {
    await inventoryPage.sortBy(testData.sortOptions.za);
    const names = await inventoryPage.getProductNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test('TC-009: Sort produk Price Low to High', async () => {
    await inventoryPage.sortBy(testData.sortOptions.lohi);
    const prices = await inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('TC-010: Sort produk Price High to Low', async () => {
    await inventoryPage.sortBy(testData.sortOptions.hilo);
    const prices = await inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });
});