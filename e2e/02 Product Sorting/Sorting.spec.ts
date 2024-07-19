import { test, expect } from "@playwright/test";
import ProductsPage from "../../page_object/Inventory.page";
import LoginPage from "../../page_object/Login.page";
import { Select } from "../../utilities/select.enum";
import * as users from "../../fixtures/test-data/user.json";
import * as utility from "../../utilities/utility-methods";

test.describe("verify sorting feature in product page. @sorting", () => {
    let loginPage: LoginPage;
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page, baseURL }) => {
        loginPage = new LoginPage(page);
        await page.goto(`${baseURL}`);
        await loginPage.login(users.standard.username, users.standard.password);
        productsPage = new ProductsPage(page);
        expect(await productsPage.getTitle).toBe("Products");
    });

    test("verify user can sort the products by price (low to high).", async () => {
        await productsPage.selectByValue("lohi", Select.SORT);

        const productsPrices = utility.convertStringArrayIntoNumberArray(await productsPage.getProductsPrice());
        const sortedPrices = utility.sortPriceASC(productsPrices);
        const haveSameOrder = utility.compareNumArrays(productsPrices, sortedPrices);
        expect(haveSameOrder).toBe(true);
    });

    test("verify user can sort the products by price (high to low).", async () => {
        await productsPage.selectByValue("hilo", Select.SORT);

        const productsPrices = utility.convertStringArrayIntoNumberArray(await productsPage.getProductsPrice());
        const sortedPrices = utility.sortPriceDESC(productsPrices);
        const haveSameOrder = utility.compareNumArrays(productsPrices, sortedPrices);
        expect(haveSameOrder).toBe(true);
    });

    test("verify user can sort the products by name (a to z).", async () => {
        await productsPage.selectByValue("az", Select.SORT);

        const productsTitles = await productsPage.getProductsNames();
        const sortedTitles = utility.sortAlphabeticallyASC(productsTitles);
        const haveSameOrder = utility.compareStringArraysWithOrder(productsTitles, sortedTitles);
        expect(haveSameOrder).toBe(true);
    });

    test("verify user can sort the products by name (z to a).", async () => {
        await productsPage.selectByValue("za", Select.SORT);

        const productsTitles = await productsPage.getProductsNames();
        const sortedTitles = utility.sortAlphabeticallyDESC(productsTitles);
        const haveSameOrder = utility.compareStringArraysWithOrder(productsTitles, sortedTitles);
        expect(haveSameOrder).toBe(true);
    });
});
