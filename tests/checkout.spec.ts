import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { standardUser} from "../test-data/users";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

test.describe("Checkout", () => {

test("User can complete checkout", async ({ page }) => {    
  const loginPage = new LoginPage(page);
  const inventoryPage =  new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

await test.step("Login", async () => {
    await loginPage.open();
    await loginPage.login(standardUser.username, standardUser.password);
  });

await test.step("Add an item to cart", async () => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.goToCart();
});

await test.step("Start checkout", async () => {
    await cartPage.checkout();
})

await test.step("Fill shipping info", async () => {
    await checkoutPage.fillInfo("John", "Smith", "12345");
});

await test.step("Verify overview and finish", async () => {
    await expect(checkoutPage.itemName).toContainText("Sauce Labs Backpack");
    await checkoutPage.finish();
    await expect(checkoutPage.successMessage).toHaveText("Thank you for your order!");
});

});
});  