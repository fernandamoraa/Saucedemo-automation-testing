import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import dotenv from 'dotenv';
dotenv.config();

const messages = require('../data/loginMessages.json');

test('TC 01: Login with Valid Standard User', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(process.env.SAUCEDEMO_URL);
    await loginPage.sendLoginForm(process.env.SAUCEDEMO_STANDARD_USERNAME, process.env.SAUCEDEMO_PASSWORD);
    await expect(page).toHaveURL(process.env.SAUCEDEMO_URL + '/inventory.html');
    await expect(page.getByText('Swag Labs')).toBeVisible();
});

test('TC 02: Error Handling for Locked Out User', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(process.env.SAUCEDEMO_URL);
    await loginPage.sendLoginForm(process.env.SAUCEDEMO_LOCKED_USERNAME, process.env.SAUCEDEMO_PASSWORD);
    await expect(page.getByText(messages.messagesSaucedemo.lockedOutMessage)).toBeVisible();
});