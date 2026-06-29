import { Locator, Page } from '@playwright/test';

export class InventoryPage {
    public readonly hamburguerButton: Locator;
    public readonly logoutButton: Locator;
    public readonly addToCartButton: Locator;
    public readonly cartIconBadge: Locator;
    public readonly cartIconButton: Locator;

    constructor(page: Page) {
        this.hamburguerButton = page.locator('[id="react-burger-menu-btn"]');
        this.logoutButton = page.locator('[data-test="logout-sidebar-link"]');
        this.addToCartButton = page.locator('[id="add-to-cart-sauce-labs-backpack"]');
        this.cartIconBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.cartIconButton = page.locator('[data-test="shopping-cart-link"]');
    }

    async logout() {
        await this.hamburguerButton.click();
        await this.logoutButton.click();
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async openCart() {
        await this.cartIconButton.click();
    }
}