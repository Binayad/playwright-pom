import { Page } from "@playwright/test";
import * as selectors from '../utilities/selectors.json';


export default class CheckoutPage {
    checkoutButton() {
        throw new Error("Method not implemented.");
    }

    constructor(public page: Page) { }

    get getTitle() {
        return this.page.locator(selectors.CheckoutPage.pageTittle).textContent();
    }

    async clickCheckoutButton() {
        await this.page.click(selectors.CheckoutPage.checkoutButton);
    }

    get getCartQuantity() {
        return this.page.locator(selectors.CheckoutPage.count).textContent();
    }

    async getFirstName(firstname: string) {
        return this.page.locator(selectors.CheckoutPage.firstName).type(firstname);
    }

    async getLastName(lastname: string) {
        return this.page.locator(selectors.CheckoutPage.lastName).type(lastname);
    }

    async getZipCode(postalcode: string) {
        return this.page.locator(selectors.CheckoutPage.postalCode).type(postalcode);
    }

    async clickContinueButton() {
        await this.page.click(selectors.CheckoutPage.continueButton);
    }

    get getProductCount() {
        return this.page.locator(selectors.CheckoutPage.count).textContent();
    }

    get getpaymentInfo() {
        return this.page.locator(selectors.CheckoutPage.paymentInfo).textContent();
    }

    async clickFinishButton() {
        await this.page.click(selectors.CheckoutPage.finishButton);
    }

    get getSuccessMessage() {
        return this.page.locator(selectors.CheckoutPage.thankyouMessage).textContent();
    }

}