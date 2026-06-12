import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { standardUser} from "../test-data/users";
import { InventoryPage } from "../pages/InventoryPage";

test.describe("Sorting", () => {

test("Sort items by price", async ({ page }) => {    
  const loginPage = new LoginPage(page);
  const inventoryPage =  new InventoryPage(page);

await test.step("Login", async () => {
    await loginPage.open();
    await loginPage.login(standardUser.username, standardUser.password);
  });

await test.step("Sort by price low to high", async () => {
    await inventoryPage.sortBy("lohi");
});
await test.step("Verify prices are sorted ascending", async () => {
  const priceElements = await inventoryPage.itemPrices.allTextContents();
  const prices = priceElements.map(p => parseFloat(p.replace("$", "")));
  const sorted = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sorted);
});

});
});