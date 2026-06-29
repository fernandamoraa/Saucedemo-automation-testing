import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('TC 03: Secure Logout Flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.sendLoginForm('standard_user', 'secret_sauce');
    await inventoryPage.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/')
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.getByText("Epic sadface: You can only access '/inventory.html' when you are logged in.")).toBeVisible();
});