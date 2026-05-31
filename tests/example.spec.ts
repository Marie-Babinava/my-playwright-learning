// Import test functions from Playwright
import { test, expect } from '@playwright/test'; //IMPORT STATEMENT

// Create "has title" test
test('has title', async ({ page }) => { // DESTRUCTURING
  // Open Playwright website
await page.goto('https://playwright.dev/'); // AWAIT

  // Check that page title contains "Playwright"
  await expect(page).toHaveTitle(/Playwright/); // AWAIT + EXPECT ASSERTION
});
// Create "get started link" test
test('get started link', async ({ page }) => { // DESTRUCTURING
  // Open Playwright website
  await page.goto('https://playwright.dev/'); // AWAIT

  // Click on "Get started link"
  await page.getByRole('link', { name: 'Get started' }).click(); // AWAIT

  //  Check that "Installation" heading is visible
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible(); // AWAIT + EXPECT ASSERTION
});
