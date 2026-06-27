import { Locator,Page}from '@playwright/test';

export class CheckoutPage {
    public readonly firstNameTextbox: Locator;
    public readonly lastNameTextbox: Locator;
    public readonly zipTextbox: Locator;
    public readonly continueButton: Locator;
    public readonly overviewTitle: Locator;
    public readonly finishButton: Locator;

    constructor(page:Page){
        this.firstNameTextbox = page.locator('[data-test="firstName"]');
        this.lastNameTextbox = page.locator('[data-test="lastName"]');
        this.zipTextbox = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.overviewTitle = page.locator('[data-test="title"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }

    async sendCheckoutForm(firstName, lastName, zip){
await this.firstNameTextbox.fill(firstName);
await this.lastNameTextbox.fill(lastName);
await this.zipTextbox.fill(zip);
await this.continueButton.click();
}

    async finishCheckout(){
await this.finishButton.click();
}   
}