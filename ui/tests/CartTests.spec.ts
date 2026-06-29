import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('TC 04: Add Single Item to Shopping Cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.sendLoginForm('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await inventoryPage.addToCart();
    await expect(page.getByText('Remove')).toBeVisible();
    await expect(inventoryPage.cartIconBadge).toHaveText('1');
});