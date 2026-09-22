import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import testData from '../fixtures/test-data.json';

test.describe('Checkout Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await inventoryPage.addProductByName(testData.products.backpack);
    await inventoryPage.goToCart();
    await cartPage.goToCheckout();
  });

  test('TC-015: Checkout dengan valid data', async ({ page }) => {
    await checkoutPage.fillInformation(
      testData.checkoutInfo.firstName,
      testData.checkoutInfo.lastName,
      testData.checkoutInfo.postalCode
    );
    await checkoutPage.continueToOverview();
    await expect(page).toHaveURL(/checkout-step-two/);
  });

  test('TC-016: Checkout dengan empty first name', async () => {
    await checkoutPage.fillInformation(
      testData.invalidCheckoutInfo.emptyFirstName.firstName,
      testData.invalidCheckoutInfo.emptyFirstName.lastName,
      testData.invalidCheckoutInfo.emptyFirstName.postalCode
    );
    await checkoutPage.continueToOverview();
    const errorMsg = await checkoutPage.getErrorMessage();
    expect(errorMsg).toContain('First Name is required');
  });

  test('TC-017: Checkout dengan empty last name', async () => {
    await checkoutPage.fillInformation(
      testData.invalidCheckoutInfo.emptyLastName.firstName,
      testData.invalidCheckoutInfo.emptyLastName.lastName,
      testData.invalidCheckoutInfo.emptyLastName.postalCode
    );
    await checkoutPage.continueToOverview();
    const errorMsg = await checkoutPage.getErrorMessage();
    expect(errorMsg).toContain('Last Name is required');
  });

  test('TC-018: Checkout dengan empty postal code', async () => {
    await checkoutPage.fillInformation(
      testData.invalidCheckoutInfo.emptyPostalCode.firstName,
      testData.invalidCheckoutInfo.emptyPostalCode.lastName,
      testData.invalidCheckoutInfo.emptyPostalCode.postalCode
    );
    await checkoutPage.continueToOverview();
    const errorMsg = await checkoutPage.getErrorMessage();
    expect(errorMsg).toContain('Postal Code is required');
  });

  test('TC-019: Verifikasi total harga termasuk tax', async ({ page }) => {
    await checkoutPage.fillInformation(
      testData.checkoutInfo.firstName,
      testData.checkoutInfo.lastName,
      testData.checkoutInfo.postalCode
    );
    await checkoutPage.continueToOverview();
    const total = await checkoutPage.getTotal();
    expect(total).toContain('Total');
    expect(total).toContain('$');
  });

  test('TC-020: Complete order - finish', async ({ page }) => {
    await checkoutPage.fillInformation(
      testData.checkoutInfo.firstName,
      testData.checkoutInfo.lastName,
      testData.checkoutInfo.postalCode
    );
    await checkoutPage.continueToOverview();
    await checkoutPage.finishOrder();
    const header = await checkoutPage.getCompleteHeader();
    expect(header).toContain('Thank you for your order');
  });
});