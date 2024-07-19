import { test, expect } from "@playwright/test";
import ProductsPage from "../../page_object/Inventory.page";
import LoginPage from "../../page_object/Login.page";
import CartPage from "../../page_object/Cart.page"
import * as users from "../../fixtures/test-data/user.json";
import CheckoutPage from "../../page_object/Checkout.page";

test.describe("verify checkout feature. @checkout", async () => {

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

    test("verify when user add a product to the cart and process for checkout.", async ({ page }) => {
        await productsPage.addToCart("btn_primary btn_inventory");
        expect(await productsPage.isAddedToCart()).toBe(true);
        cartPage = new CartPage(page);
        await productsPage.navigateToCart();
        expect(await cartPage.getTitle).toBe("Your Cart");
        expect(await cartPage.getCartQuantity).toBe("1");
        expect(await cartPage.getItemName).toBe("Sauce Labs Backpack");
        expect(page).toHaveURL('cart.html');
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.clickCheckoutButton();
        expect(await checkoutPage.getTitle).toBe("Checkout: Your Information");
        expect(page).toHaveURL('checkout-step-one.html');
        await checkoutPage.getFirstName(users.standard.username);
        await checkoutPage.getLastName(users.standard.username);
        await checkoutPage.getZipCode(users.standard.postalcode);
        await checkoutPage.clickContinueButton();
        expect(page).toHaveURL('checkout-step-two.html');
        expect(await checkoutPage.getProductCount).toBe("1");
        expect(await checkoutPage.getpaymentInfo).toBe("Payment Information:");
        await checkoutPage.clickFinishButton();
        expect(await checkoutPage.getTitle).toBe("Finish");
        expect(page).toHaveURL('checkout-complete.html');
        expect(await checkoutPage.getSuccessMessage).toBe("THANK YOU FOR YOUR ORDER");
    });

})