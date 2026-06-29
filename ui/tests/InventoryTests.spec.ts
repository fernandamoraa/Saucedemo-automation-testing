import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import dotenv from 'dotenv';
dotenv.config();

const messages = require('../data/loginMessages.json');

test.beforeEach('Login Successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(process.env.SAUCEDEMO_URL);
    await loginPage.sendLoginForm(process.env.SAUCEDEMO_STANDARD_USERNAME, process.env.SAUCEDEMO_PASSWORD);
});

test('TC 03: Secure Logout Flow', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.logout();
    await page.goto(process.env.SAUCEDEMO_URL);
    await page.goto(process.env.SAUCEDEMO_URL + '/inventory.html');
    await expect(page.getByText(messages.messagesSaucedemo.errorAccessInventory)).toBeVisible();
});