import {Locator, Page}from '@playwright/test';

export class InventoryPage {
    public readonly hamburguerButton: Locator;
    public readonly logoutButton: Locator;

    constructor (page:Page){
        this.hamburguerButton = page.locator('[id="react-burger-menu-btn"]');
        this.logoutButton = page.locator('[data-test="logout-sidebar-link"]');
    }

async logout (){
    await this.hamburguerButton.click();
    await this.logoutButton.click();
}
}