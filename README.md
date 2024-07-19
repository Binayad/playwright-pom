# Home Assignment

## Overview

This project contains end-to-end (E2E) tests for a web application using [Playwright](https://playwright.dev/). The tests cover various features of the application such as login, sorting, and cart functionalities. The Page Object Model (POM) pattern is used to organize the code and make it more maintainable.

## Project Structure
```
├── e2e
│ ├── 01 Authentication
│ ├── ├── login.spec.ts # Tests for login feature
│ ├── 02 Product Sorting
│ ├── ├── sorting.spec.ts # Tests for sorting feature
│ ├── 03 Cart Page
│ └── ├── cart.spec.ts # Tests for cart feature
│ ├── 04 Checkout Page
│ └── ├── Checkout.spec.ts # Tests for checkout feature
├── fixtures
│ └── test-data
│ └── user.json # Test data for users
├── page_object
│ ├── Cart.page.ts # Page object for Cart page
│ ├── Checkout.page.ts # Page object for Checkout page
│ ├── Inventory.page.ts # Page object for Inventory page
│ └── Login.page.ts # Page object for Login page
├── utilities
│ ├── select.enum.ts # Enum for select values (e.g., sorting options)
│ ├── selectors.json # JSON file containing selectors (if needed)
│ └── utility-methods.ts # Utility methods used in tests
├── playwright.config.ts # Playwright configuration file
└── README.md # This README file
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher)
- [Playwright](https://playwright.dev/)

### Installation

To install the necessary dependencies, run the following command:

```bash
yarn install
```

#### Scripts
Check out the package.json file.

The following scripts are available in this project:

- `run:test:chrome`: Runs the Playwright tests using the Chromium browser.
- `open:test:ui`: Opens the Playwright test UI using the Chromium browser.
- `html:report`: Shows the Playwright inbuild test report.
- `test-login`: Runs the Playwright tests tagged with @login.
- `test-sorting`: Runs the Playwright tests tagged with @sorting.
- `test-cart`: Runs the Playwright tests tagged with @cart.
- `test-checkout`: Runs the Playwright tests tagged with @checkout.

### Running Tests
To run the tests, use the following commands based on your requirement:
1. Run tests using the Chromium browser:
```
yarn run:test:chrome
```

2. Open the Playwright test UI:
```
yarn open:test:ui
```

3. Show the playwright inbuild test report:
```
yarn html:report
```

4. To run test for a specific feature using tags:
```
yarn test-login # Run login feature tests
yarn test-sorting # Run sorting feature tests
yarn test-cart # Run cart feature tests
yarn test-checkout # Run checkout feature tests
```
## Configuration
The Playwright configuration file (playwright.config.ts) is located at the root of the project. You can update the base URL and other settings as needed.

## Writing Tests
Tests are written using the Playwright testing library and follow the Page Object Model (POM) pattern. Each page has a corresponding page object class that encapsulates the interactions with that page.

## Using data-test to target elements

Playwright provides all the goodies of a selector engine, so as to make it really easy to target elements on the document.

1. Prefer user-facing and rarely changing attributes like `roles`, input `types` etc.
2. Use `data-test` responsibly.
3. There is no one-size-fits-all.

### Example Test
Here's an example of how to write a test using the POM pattern:
```
import { test, expect } from "@playwright/test";
import LoginPage from "../../page_object/Login.page";
import * as users from "../../fixtures/test-data/user.json";
import ProductsPage from "../../page_object/Inventory.page";

test.describe("Login Feature @login", () => {
let loginPage: LoginPage;

test.beforeEach(async ({ page, baseURL }) => {
loginPage = new LoginPage(page);
await page.goto(`${baseURL}`);
});

test("User can login with valid credentials", async ({ page }) => {
await loginPage.login(users.standard.username, users.standard.password);
await expect(page).toHaveTitle("Swag Labs");
const productsPage = new ProductsPage(page);
expect(await productsPage.getTitle).toBe("Products");
expect(page).toHaveURL('inventory.html');
});
});
```