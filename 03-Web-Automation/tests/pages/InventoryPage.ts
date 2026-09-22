import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly productItems: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.productItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async getProductCount() {
    return await this.productItems.count();
  }

  async addProductToCart(index: number) {
    const addButtons = this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    await addButtons.nth(index).click();
  }

  async addProductByName(productName: string) {
    const normalizedName = productName.toLowerCase().replace(/ /g, '-');
    await this.page.locator(`[data-test="add-to-cart-${normalizedName}"]`).click();
  }

  async removeProductByName(productName: string) {
    const normalizedName = productName.toLowerCase().replace(/ /g, '-');
    await this.page.locator(`[data-test="remove-${normalizedName}"]`).click();
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async getCartBadgeCount() {
    try {
      return await this.cartBadge.textContent();
    } catch {
      return '0';
    }
  }

  async getProductNames() {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  async getProductPrices() {
    const priceTexts = await this.page.locator('.inventory_item_price').allTextContents();
    return priceTexts.map(p => parseFloat(p.replace('$', '')));
  }

  async logout() {
    await this.menuButton.click();
    await this.page.waitForTimeout(500);
    await this.logoutLink.click();
  }
}