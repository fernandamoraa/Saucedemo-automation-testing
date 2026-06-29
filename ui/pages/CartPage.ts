import { Locator, Page } from '@playwright/test';

export class CartPage {
    public readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async startCheckout() {
        await this.checkoutButton.click();
    }
}