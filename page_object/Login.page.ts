import { Page } from "@playwright/test";
import * as selectors from '../utilities/selectors.json';

export default class LoginPage {

    constructor(public page: Page) {
    }

    async enterUsername(username: string) {
        await this.page.locator(selectors.LoginPage.usernameInput).type(username);
    }

    async enterPassword(password: string) {
        await this.page.locator(selectors.LoginPage.passwordInput).type(password);
    }

    async clickLoginButton() {
        await this.page.click(selectors.LoginPage.loginButton);
    }

    async login(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
        await this.page.waitForTimeout(2000);
    }

    get getErrorMessage() {
        return this.page.locator(selectors.LoginPage.errorMessage).textContent();
    }

}