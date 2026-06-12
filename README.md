# Final Project — Playwright Test Suite

## Test target
SauceDemo (https://www.saucedemo.com)

## Covered user journey
Login → Product selection → Cart → Checkout → Sorting

## Test cases
- Standard user can log in
- Locked user sees error message
- Wrong password shows error message
- Empty username shows validation error
- Cart badge updates after adding a product
- Cart badge updates after removing a product
- Cart badge updates after adding multiple products
- Cart page shows names of the added items
- Removing an item updates the cart
- User can navigate to inventory page
- User can complete checkout
- Sort items by price

## Project structure
- `pages/` — Page Object classes (LoginPage.ts, InventoryPage.ts, CartPage.ts, CheckoutPage.ts)
- `tests/` — test specs (*.spec.ts)
- `test-data/` — credentials and test inputs (users.ts)
- `playwright.config.ts` — configuration

## How to run
```bash
npm install
npx playwright install
npx playwright test
npx playwright show-report
```

## Notes
- No hard waits (`waitForTimeout`) are used
- Tests use semantic locators (`getByRole`, `getByPlaceholder`)
- SauceDemo uses `data-test` attribute instead of standard `data-testid`
- Page Object Model is used to separate locators and actions from test logic
- Test data is stored separately from test logic

## Known limitations
- This suite covers only the selected user journey
- It does not cover all possible edge cases