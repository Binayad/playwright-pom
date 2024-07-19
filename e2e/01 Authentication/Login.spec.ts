import { test, expect } from "@playwright/test";
import LoginPage from "../../page_object/Login.page";
import * as users from "../../fixtures/test-data/user.json";
import ProductsPage from "../../page_object/Inventory.page";

test.describe("verify login feature in the login form page. @login", () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page, baseURL }) => {
    loginPage = new LoginPage(page);
    await page.goto(`${baseURL}`);
  });

  test("verify user is unable to login without credentials.", async ({ page }) => {
    await loginPage.login("", "");

    expect(await loginPage.getErrorMessage).toBe("Epic sadface: Username is required");
  });

  test("verify user is unable to login without password.", async ({ page }) => {
    await loginPage.login(users.standard.username, "");

    expect(await loginPage.getErrorMessage).toBe("Epic sadface: Password is required");
  });

  test("verify user is unable to login without username.", async ({ page }) => {
    await loginPage.login("", users.standard.password);

    expect(await loginPage.getErrorMessage).toBe("Epic sadface: Username is required");
  });

  test("verify user is able to login with valid credentials of standard user.", async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page).toHaveTitle("Swag Labs");
    const productsPage = new ProductsPage(page);
    expect(await productsPage.getTitle).toBe("Products");
  });

  test("verify user is unable to login with valid credentials of locked user.", async ({ page }) => {
    await loginPage.login(users.locked.username, users.locked.password);

    expect(await loginPage.getErrorMessage).toBe("Epic sadface: Sorry, this user has been locked out.");
  });

  test("verify user is able to login with valid credentials of problem user.", async ({ page }) => {
    await loginPage.login(users.problem.username, users.problem.password);

    await expect(page).toHaveTitle("Swag Labs");
    const productsPage = new ProductsPage(page);
    expect(await productsPage.getTitle).toBe("Products");
  });

  test("verify user is able to login with valid credentials of performance username.", async ({ page }) => {
    await loginPage.login(users.performance.username, users.performance.password);
    await expect(page).toHaveTitle("Swag Labs");
    const productsPage = new ProductsPage(page);
    expect(await productsPage.getTitle).toBe("Products");
  });
});
