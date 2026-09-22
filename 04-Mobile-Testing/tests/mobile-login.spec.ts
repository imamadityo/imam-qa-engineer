import { test, expect, devices } from '@playwright/test';
import { LoginPage } from '../../03-Web-Automation/tests/pages/LoginPage';
import { InventoryPage } from '../../03-Web-Automation/tests/pages/InventoryPage';
import { CartPage } from '../../03-Web-Automation/tests/pages/CartPage';
import testData from '../../03-Web-Automation/tests/fixtures/test-data.json';

const mobileDevices = [
  { name: 'iPhone 13', device: devices['iPhone 13'] },
  { name: 'Pixel 5', device: devices['Pixel 5'] },
  { name: 'iPad Air', device: devices['iPad Air (gen 3)'] },
];

for (const { name, device } of mobileDevices) {
  test.describe(`Mobile Testing - ${name}`, () => {
    test.use({ ...device });

    test(`Mobile Login - ${name}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);

      await loginPage.goto();
      await loginPage.login(testData.validUser.username, testData.validUser.password);
      await expect(page).toHaveURL(/inventory/);
      await expect(inventoryPage.title).toHaveText('Products');
    });

    test(`Mobile Navigation - ${name}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);
      const cartPage = new CartPage(page);

      await loginPage.goto();
      await loginPage.login(testData.validUser.username, testData.validUser.password);

      // Add item to cart
      await inventoryPage.addProductByName(testData.products.backpack);
      await inventoryPage.goToCart();
      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBe(1);

      // Go back to shopping
      await cartPage.continueShopping();
      const productCount = await inventoryPage.getProductCount();
      expect(productCount).toBeGreaterThan(0);
    });

    test(`Mobile Touch - Add to Cart - ${name}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);

      await loginPage.goto();
      await loginPage.login(testData.validUser.username, testData.validUser.password);

      // Simulate touch interaction
      const addButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
      await addButton.tap();
      const badgeCount = await inventoryPage.getCartBadgeCount();
      expect(badgeCount).toBe('1');
    });

    test(`Mobile Viewport - ${name}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();

      // Verify mobile layout
      const viewport = page.viewportSize();
      expect(viewport).toBeTruthy();
      if (viewport) {
        expect(viewport.width).toBeLessThanOrEqual(1024);
      }
    });
  });
}

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

      // Verify products are visible
      const productCount = await inventoryPage.getProductCount();
      expect(productCount).toBeGreaterThan(0);

      // Verify cart link is accessible
      await expect(inventoryPage.cartLink).toBeVisible();
    });
  }
});