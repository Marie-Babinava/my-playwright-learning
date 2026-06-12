import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { standardUser} from "../test-data/users";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";

test.describe("Cart", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await loginPage.open();
    await loginPage.login(standardUser.username, standardUser.password);
  });

test("Cart badge updates after adding a product", async () => {
    await inventoryPage.addBackpackToCart();
    await expect(inventoryPage.cartBadge).toHaveText("1");
  }); 

test("Cart badge updates after removing a product", async () => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.removeBackpackFromCart();
    await expect(inventoryPage.cartBadge).not.toBeVisible();
  }); 

test("Cart badge updates after adding multiple products", async () => {
    await inventoryPage.addBackpackToCart();
    await expect(inventoryPage.cartBadge).toHaveText("1");
    await inventoryPage.addBikeToCart();
    await expect(inventoryPage.cartBadge).toHaveText("2");
    await inventoryPage.addTshirtToCart();
    await expect(inventoryPage.cartBadge).toHaveText("3");
  }); 

test("Cart page shows names of the added items", async () => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.addBikeToCart();
    await inventoryPage.addTshirtToCart();
    await inventoryPage.goToCart();
    await expect(cartPage.itemName).toContainText([
  "Sauce Labs Backpack",
  "Sauce Labs Bike Light", 
  "Sauce Labs Bolt T-Shirt"
]);
  });

test("Removing an item updates the cart", async () => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.addBikeToCart();
    await inventoryPage.addTshirtToCart();
    await inventoryPage.goToCart();
    await expect(cartPage.cartBadge).toHaveText("3");
    await cartPage.removeItem();
    await expect(cartPage.cartBadge).toHaveText("2");
    await cartPage.removeItem();
    await expect(cartPage.cartBadge).toHaveText("1");
    await cartPage.removeItem();
    await expect(cartPage.cartBadge).not.toBeVisible();
    await expect(cartPage.itemName).not.toBeVisible();
});

test("User can navigate to inventory page", async ({page}) => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.goToCart();
    await expect(cartPage.cartBadge).toHaveText("1");
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory/);

});

});