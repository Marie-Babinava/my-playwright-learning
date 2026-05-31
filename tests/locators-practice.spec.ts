// Import test functions from Playwright
import { test, expect } from '@playwright/test';

// Create "count items" test
test('count number of items', async ({ page }) => {

    // Открываем страницу логина
await page.goto('https://www.saucedemo.com');

 // Логинимся
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

 // Считаем элементы
const items = page.locator('.inventory_item');
const count = await items.count();
console.log('Количество товаров:', count);

  // Кликаем на второй товар
  await items.nth(1).click();
  console.log('Кликнули на второй товар');

// Переходим на инвентарь заново вместо goBack
  await page.goto('https://www.saucedemo.com/inventory.html');

// Находим товар по тексту и кликаем
  await page.getByText('Sauce Labs Bike Light').click();
  console.log('Кликнули на Bike Light');
});

  
