import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { standardUser, lockedUser, invalidUser } from "../test-data/users";

test.describe("Login", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test("Standard user can log in", async ({ page }) => {
    await loginPage.login(standardUser.username, standardUser.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test("Locked user sees error message", async () => {
    await loginPage.login(lockedUser.username, lockedUser.password);
    await expect(loginPage.errorMessage).toContainText("Sorry, this user has been locked out.");
  });

  test("Wrong password shows error message", async () => {
    await loginPage.login(invalidUser.username, invalidUser.password);
    await expect(loginPage.errorMessage).toContainText("Username and password do not match");
  });

  test("Empty username shows validation error", async () => {
    await loginPage.login("", standardUser.password);
    await expect(loginPage.errorMessage).toContainText("Username is required");
  });

});