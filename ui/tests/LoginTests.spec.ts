import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage} from '../pages/CartPage';
import { CheckoutPage} from '../pages/CheckoutPage';

test('TC 01: Login with Valid Standard User', async ({ page }) =>{
    const loginPage = new LoginPage(page);
await page.goto ('https://www.saucedemo.com/');
await loginPage.sendLoginForm('standard_user', 'secret_sauce');
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
await expect(page.getByText('Swag Labs')).toBeVisible();
});

test ('TC 02: Error Handling for Locked Out User', async({ page }) => {
    const loginPage = new LoginPage (page);
await page.goto ('https://www.saucedemo.com/');
await loginPage.sendLoginForm('locked_out_user', 'secret_sauce');
await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
});

test ('TC 03: Secure Logout Flow', async ({ page }) => {
    const loginPage = new LoginPage (page);
    const inventoryPage = new InventoryPage (page);
await page.goto ('https://www.saucedemo.com/');
await loginPage.sendLoginForm('standard_user', 'secret_sauce');
await inventoryPage.logout();
await expect(page).toHaveURL('https://www.saucedemo.com/')
await page.goto('https://www.saucedemo.com/inventory.html');
await expect(page.getByText("Epic sadface: You can only access '/inventory.html' when you are logged in.")).toBeVisible();
});

test ('TC 04: Add Single Item to Shopping Cart', async ({ page }) => {
    const loginPage = new LoginPage (page);
    const inventoryPage = new InventoryPage (page);
await page.goto ('https://www.saucedemo.com/');
await loginPage.sendLoginForm('standard_user', 'secret_sauce');
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
await inventoryPage.addToCart();
await expect(page.getByText('Remove')).toBeVisible();
await expect(inventoryPage.cartIcon).toHaveText('1');
});

test ('TC 05: Complete Checkout Form and Order', async ({ page }) => {
    const loginPage = new LoginPage (page);
    const inventoryPage = new InventoryPage (page);
    const cartPage = new CartPage (page);
    const checkoutPage = new CheckoutPage (page);
await page.goto ('https://www.saucedemo.com/');
await loginPage.sendLoginForm('standard_user', 'secret_sauce');
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
await inventoryPage.addToCart();
await inventoryPage.openCart ();
await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
await cartPage.startCheckout();
await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
await checkoutPage.sendCheckoutForm ('Fernanda', 'Mora', '42094');
await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
await expect(checkoutPage.overviewTitle).toHaveText('Checkout: Overview');
await checkoutPage.finishCheckout();
await expect(page.getByText('Thank you for your order!')).toBeVisible();
});