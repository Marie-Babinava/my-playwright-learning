# Broken Tests Report
## Test 1 - Login should redirect to inventory
Root cause: The placeholder text in the locator was "User Name" (with a space) but the actual placeholder on the page is "Username" (no space), so Playwright could not find the input field.
Fix: Changed getByPlaceholder("User Name") to getByPlaceholder("Username").
How I verified: Ran the test in VS Code and it passed after the fix.

# Test 2 - Error message on wrong password#
Root cause: Two issues, first, getByTestId() looks for data-testid attribute but saucedemo uses data-test, so the element was not found. Second, the expected error text "Username and password do not match" does not match the actual text on the page.
Fix: Changed getByTestId("error") to locator('[data-test="error"]') and updated toHaveText() to the full actual error message "Epic sadface: Username and password do not match any user in this service".
How I verified: Ran the test in VS Code and it passed after the fix.

# Test 3 - Cart badge appears after adding product
Root cause: There was no await before page.locator("[data-test=\"add-to-cart-sauce-labs-backpack\"]").click();
Fix: Added await before page.locator("[data-test=\"add-to-cart-sauce-labs-backpack\"]").click();
How I verified: Ran the test in VS Code and it passed after the fix.