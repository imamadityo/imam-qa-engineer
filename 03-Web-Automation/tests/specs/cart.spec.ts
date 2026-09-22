import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import testData from '../fixtures/test-data.json';

test.describe('Cart Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await loginPage.goto();
    await loginPage.login(testData.validUser.username, testData.validUser.password);
  });

  test('TC-011: Add single item ke cart', async () => {
    await inventoryPage.addProductByName(testData.products.backpack);
    await inventoryPage.goToCart();
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(1);
    const names = await cartPage.getCartItemNames();
    expect(names).toContain(testData.products.backpack);
  });

  test('TC-012: Add multiple items ke cart', async () => {
    await inventoryPage.addProductByName(testData.products.backpack);
    await inventoryPage.addProductByName(testData.products.bikeLight);
    await inventoryPage.addProductByName(testData.products.boltTShirt);
    await inventoryPage.goToCart();
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(3);
  });

  test('TC-013: Remove item dari cart', async () => {
    await inventoryPage.addProductByName(testData.products.backpack);
    await inventoryPage.goToCart();
    await cartPage.removeItemByName(testData.products.backpack);
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(0);
  });

  test('TC-014: Verifikasi cart badge count', async () => {
    await inventoryPage.addProductByName(testData.products.backpack);
    await inventoryPage.addProductByName(testData.products.bikeLight);
    const badgeCount = await inventoryPage.getCartBadgeCount();
    expect(badgeCount).toBe('2');
  });
});