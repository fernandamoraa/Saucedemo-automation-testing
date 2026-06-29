import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import dotenv from "dotenv";
dotenv.config();

const messages = require('../data/loginMessages.json');
const customerData = require('../data/customerData.json')

test.beforeEach('Login Successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(process.env.SAUCEDEMO_URL);
    await loginPage.sendLoginForm(process.env.SAUCEDEMO_STANDARD_USERNAME, process.env.SAUCEDEMO_PASSWORD);
});

test.afterEach('Logout Successfully', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.logout();
});

test('TC 05: Complete Checkout Form and Order', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await expect(page).toHaveURL(process.env.SAUCEDEMO_URL + '/inventory.html');
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await inventoryPage.addToCart();
    await inventoryPage.openCart();
    await expect(page).toHaveURL(process.env.SAUCEDEMO_URL + '/cart.html');
    await cartPage.startCheckout();
    await expect(page).toHaveURL(process.env.SAUCEDEMO_URL + '/checkout-step-one.html');
    await checkoutPage.sendCheckoutForm(customerData.clientData.firstName, customerData.clientData.lastName, customerData.clientData.zip);
    await expect(page).toHaveURL(process.env.SAUCEDEMO_URL + '/checkout-step-two.html');
    await expect(checkoutPage.overviewTitle).toHaveText(messages.messagesSaucedemo.orderDetails);
    await checkoutPage.finishCheckout();
    await expect(page.getByText(messages.messagesSaucedemo.confirmationMessage)).toBeVisible();
});