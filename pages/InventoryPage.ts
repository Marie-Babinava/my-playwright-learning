import { type Locator, type Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly addToCartBackpack: Locator;
  readonly addToCartBike: Locator;
  readonly addToCartTshirt: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly removeBackpack: Locator;
  readonly removeBike: Locator;
  readonly removeTshirt: Locator;
  readonly itemPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartBackpack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.addToCartBike = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.addToCartTshirt = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.removeBackpack = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.removeBike = page.locator('[data-test="remove-sauce-labs-bike-light"]');
    this.removeTshirt = page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
  }

  async open() {
    await this.page.goto("/inventory.html");
  }
  async addBackpackToCart() {
    await this.addToCartBackpack.click();
  } 
  async addBikeToCart() {
    await this.addToCartBike.click();
  }
  async addTshirtToCart() {
    await this.addToCartTshirt.click();
  }
  async removeBackpackFromCart() {
  await this.removeBackpack.click();
  }
  async goToCart() {
    await this.cartLink.click();
  }

  async sortBy(option: string) {
    await this.page.locator('[data-test="product-sort-container"]').selectOption(option);
  }
}