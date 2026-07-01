import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import dotenv from 'dotenv';
dotenv.config();

test.beforeEach('Login Successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(process.env.SAUCEDEMO_URL);
    await loginPage.sendLoginForm(process.env.SAUCEDEMO_STANDARD_USERNAME, process.env.SAUCEDEMO_PASSWORD);
});

test.afterEach('Logout Successfully', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.logout();
});

test('TC 04: Add Single Item to Shopping Cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await expect(page).toHaveURL(process.env.SAUCEDEMO_URL + '/inventory.html');
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await inventoryPage.addToCart();
    await expect(page.getByText('Remove')).toBeVisible();
    await expect(inventoryPage.cartIconBadge).toHaveText('1');
});