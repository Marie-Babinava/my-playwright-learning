import { type Locator, type Page } from "@playwright/test";

export class CheckoutPage {

  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;

  readonly finishButton: Locator;
  readonly itemName: Locator;

  readonly successMessage: Locator;



  constructor(page: Page) {

    this.page = page;
    this.firstNameInput = page.getByPlaceholder("First Name");
    this.lastNameInput = page.getByPlaceholder("Last Name");
    this.postalCodeInput = page.getByPlaceholder("Zip/Postal Code");
    this.continueButton = page.locator('[data-test="continue"]');

    this.finishButton = page.locator('[data-test="finish"]');
    this.itemName = page.locator('[data-test="inventory-item-name"]');

    this.successMessage = page.locator('[data-test="complete-header"]');
}

  async openYourInformation() {
    await this.page.goto("/checkout-step-one.html");
  }
  async fillInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }
}