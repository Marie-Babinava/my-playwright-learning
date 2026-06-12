import { type Locator, type Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly itemName: Locator;
  readonly removeButton: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemName = page.locator('[data-test="inventory-item-name"]');
    this.removeButton = page.locator('[data-test^="remove-"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async open() {
    await this.page.goto("/cart.html");
  }
  async checkout() {
    await this.checkoutButton.click();
  } 
  async continueShopping() {
    await this.continueShoppingButton.click();
  }
  async removeItem() {
    await this.removeButton.first().click();
  }
}