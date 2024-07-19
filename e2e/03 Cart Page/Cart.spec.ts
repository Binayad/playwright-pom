import { test, expect } from "@playwright/test";
import ProductsPage from "../../page_object/Inventory.page";
import LoginPage from "../../page_object/Login.page";
import CartPage from "../../page_object/Cart.page"
import * as users from "../../fixtures/test-data/user.json";

test.describe("verfiy cart feature in different conditions. @cart", async () => {

    let loginPage: LoginPage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page, baseURL }) => {
        loginPage = new LoginPage(page);
        await page.goto(`${baseURL}`);
        await loginPage.login(users.standard.username, users.standard.password);
        productsPage = new ProductsPage(page);
        expect(await productsPage.getTitle).toBe("Products");
    })

    test("verify when user tries to add 1 product to the cart.", async ({ page }) => {
        productsPage.addToCart("btn_primary btn_inventory");
        expect(await productsPage.isAddedToCart()).toBe(true);
        cartPage = new CartPage(page);
        await productsPage.navigateToCart();
        expect(await cartPage.getTitle).toBe("Your Cart");
        expect(await cartPage.getCartQuantity).toBe("1");
        expect(await cartPage.getItemName).toBe("Sauce Labs Backpack");
    });

    test("verify when user tries to add 1 product to the cart and remove.", async ({ page }) => {
        await productsPage.addToCart("btn_primary btn_inventory");
        expect(await productsPage.isAddedToCart()).toBe(true);
        expect(await productsPage.getTextFromBackpackButton).toEqual('REMOVE');
        await productsPage.addToCart("btn_primary btn_inventory");

    });

    test("verify when user tries to add 1 product to the cart and then delete from the cart.", async ({ page }) => {
        await productsPage.addToCart("btn_primary btn_inventory");
        expect(await productsPage.isAddedToCart()).toBe(true);
        cartPage = new CartPage(page);
        await productsPage.navigateToCart();
        expect(await cartPage.getTitle).toBe("Your Cart");
        expect(await cartPage.getCartQuantity).toBe("1");
        expect(await cartPage.getItemName).toBe("Sauce Labs Backpack");
        await cartPage.removeItem();
        expect(cartPage.getShoppingCartBadge).toBeNull;
    });

    test("verfiy when user tries to add 2 products to the cart.", async ({ page }) => {
        await productsPage.addToCart("btn_primary btn_inventory");
        expect(await productsPage.isAddedToCart()).toBe(true);
        expect(await productsPage.getCartItemsAmount).toBe("1");
        await productsPage.addToCart("btn_primary btn_inventory");
        expect(await productsPage.getCartItemsAmount).toBe("2");

    });
})