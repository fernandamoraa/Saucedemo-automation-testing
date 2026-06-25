import { test, expect} from '@playwright/test';

test('TC 01: Loging with Valid Standard User', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.getByText('Swag Labs')).toBeVisible();
});

test('TC 02: Error Handling for Locked Out User', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
});

test('TC 03: Secure Logout Flow', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[id="react-burger-menu-btn"]').click(); 
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/')
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.getByText("Epic sadface: You can only access '/inventory.html' when you are logged in.")).toBeVisible();
});

test('TC 04: Add Single Item to Shopping Cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await page.locator('[id="add-to-cart-sauce-labs-backpack"]').click(); 
    await expect(page.getByText('Remove')).toBeVisible();
    await expect(page.locator ('[data-test="shopping-cart-badge"]')).toHaveText('1');
});