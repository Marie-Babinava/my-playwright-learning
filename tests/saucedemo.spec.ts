// Import test functions from Playwright - feature branch version
import { test, expect } from '@playwright/test';

test.describe("SauceDemo", () => {

// Все тесты для Login
test.describe('Login', () => {

test.beforeEach(async ({ page }) => {
// Это выполнится перед каждым тестом в этой группе
await page.goto('https://www.saucedemo.com');
  });

// Create "Happy path login with valid credentials" test
test('happy path with valid credentials', async ({ page }) => {
// Put data into the input fields and click on login button
await page.getByPlaceholder("Username").fill("standard_user");
await page.getByPlaceholder("Password").fill("secret_sauce");
await page.getByRole("button", { name: "Login" }).click();

// Проверяем что перешли на страницу инвентаря
await expect(page, "The Inventory page opens").toHaveURL('https://www.saucedemo.com/inventory.html');
});

// Negative login with invalid password" test
test('negative login test with invalid password', async ({ page }) => {
// Put data into the input fields and click on login button
await page.getByPlaceholder("Username").fill("standard_user");
await page.getByPlaceholder("Password").fill("test");
await page.getByRole("button", { name: "Login" }).click();
// Проверяем ошибку на странице
await expect(page.locator('[data-test="error"]'),"Error should appear for wrong credentials").toBeVisible();
});

//Empty login form validation test
test('empty login form validation - no credentials', async ({ page }) => {
// Leave username and password input fields empty and click on Login
await page.getByRole("button", { name: "Login" }).click();
// Check error on the page
await expect(page.locator('[data-test="error-button"]'),"Error should appear for no credentials").toBeVisible();
});

//Only username login form validation test
test('login with only username', async ({ page }) => {
// Add username and click on Login
await page.getByPlaceholder("Username").fill("standard_user");
await page.getByRole("button", { name: "Login" }).click();
// Check error on the page
await expect(page.locator('[data-test="error-button"]'),"Error should appear for no credentials").toBeVisible();
});

//Only password login form validation test
test('login with only password', async ({ page }) => {
// Add password and click on Login
await page.getByPlaceholder("Password").fill("secret_sauce");
await page.getByRole("button", { name: "Login" }).click();
// Check error on the page
await expect(page.locator('[data-test="error-button"]'),"Error should appear for no credentials").toBeVisible();
});

// Login with locked out user test - 1st test
test('locked out user test', async ({ page }) => {
// Put data into the input fields and click on login button
await page.getByPlaceholder("Username").fill("locked_out_user");
await page.getByPlaceholder("Password").fill("secret_sauce");
await page.getByRole("button", { name: "Login" }).click();
// Check error on the page
await expect(page.locator('[data-test="error-button"]'),"Error should appear for locked out user").toBeVisible();
});

// Login with locked out user - exact error text verification
test('locked out user sees exact error message', async ({ page }) => {
// Put data into the input fields and click on login button
await page.getByPlaceholder("Username").fill("locked_out_user");
await page.getByPlaceholder("Password").fill("secret_sauce");
await page.getByRole("button", { name: "Login" }).click();
// Check exact error text on the page
await expect(page.locator('[data-test="error"]'),"Error should appear for locked out user").toHaveText("Epic sadface: Sorry, this user has been locked out.");
});

});

// Все тесты для Cart
test.describe('Cart', () => {
test.beforeEach(async ({ page }) => {
// Это выполнится перед каждым тестом в этой группе
await page.goto('https://www.saucedemo.com');
await page.getByPlaceholder("Username").fill("standard_user");
await page.getByPlaceholder("Password").fill("secret_sauce");
await page.getByRole("button", { name: "Login" }).click();

// Проверяем что перешли на страницу инвентаря
await expect(page, "The Inventory page opens").toHaveURL('https://www.saucedemo.com/inventory.html');
});

// Add a product to a cart
test('add item to a cart', async ({ page }) => {
// Click on add to bag button for the 1st item in the list
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
//Cart badge updates
await expect(page.locator(".shopping_cart_badge"),"Cart badge should show 1 after adding a product").toHaveText("1");
});

// Add and remove a product from a cart
test('add and remove item from a cart', async ({ page }) => {
// Click on add to bag button for the 1st item in the list
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
//Cart badge updates
await expect(page.locator(".shopping_cart_badge"),"Cart badge should show 1 after adding a product").toHaveText("1");

//Remove the product from cart
await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
//Cart badge updates
await expect(page.locator(".shopping_cart_badge"),"Cart badge should not be visible after removing product").not.toBeVisible();
});

// Add multiple products to cart, remove one and check badge
test('add 3 items to a cart, remove 1, check badge', async ({ page }) => {
// Click on add to bag button for the first item in the list
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
//Cart badge updates
await expect(page.locator(".shopping_cart_badge"),"Cart badge should show 1 after adding a product").toHaveText("1");
// Click on add to bag button for the second item in the list
await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
//Cart badge updates
await expect(page.locator(".shopping_cart_badge"),"Cart badge should show 2 after adding a product product").toHaveText("2");
// Click on add to bag button for the third item in the list
await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
//Cart badge updates
await expect(page.locator(".shopping_cart_badge"),"Cart badge should show 3 after adding a product product").toHaveText("3");
//Remove the product from cart
await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
//Cart badge updates
await expect(page.locator(".shopping_cart_badge"),"Cart badge should show 2 after removing a product product").toHaveText("2");
});

// Sorting products list
test('change products sort order - Price (low to high)', async ({ page }) => {
// Check sorting option "Name (A to Z)" is set by default
await expect(page.locator('[data-test="product-sort-container"]'),"Sorting order Name (A to Z) is set by default").toHaveValue("az");
//Remember first product name in a list 
const firstProductBefore = await page.locator('.inventory_item_name').first().textContent();
console.log('First product before sorting applied:',firstProductBefore);
//Change sorting option to "Price (low to high)
await page.locator('[data-test="product-sort-container"]').selectOption("lohi");
//Remeber first product name in a list after "Price (low to high" sorting applied
const firstProductAfter=await page.locator('.inventory_item_name').first().textContent();
console.log('First product after sorting applied:', firstProductAfter);
//Check the first product has been changed
expect(firstProductAfter,"First product should change after sorting").not.toBe(firstProductBefore);
});

//Add a product to a cart and reload the page
test('add product to cart and reload page', async ({ page }) => {
//Add a product to a cart
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
//Cart badge updates
await expect(page.locator(".shopping_cart_badge"),"Cart badge should show 1 after adding a product").toHaveText("1");
//Reload the page
await page.reload()
//Check inventory page opens, the product is in the cart and badge shows "1"
await expect(page,"The Inventory page opens").toHaveURL('https://www.saucedemo.com/inventory.html');
await expect(page.locator(".shopping_cart_badge"),"Cart badge should show 1 after adding a product").toHaveText("1");
})

});
});