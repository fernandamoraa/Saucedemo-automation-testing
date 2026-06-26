import { Locator,Page}from '@playwright/test';

export class LoginPage {
    public readonly usernameTextbox: Locator;
    public readonly passwordTextbox: Locator;
    public readonly loginButton: Locator;

    constructor(page:Page){
        this.usernameTextbox = page.locator('[data-test="username"]');
        this.passwordTextbox = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
    }

    async sendLoginForm(username, password){
await this.usernameTextbox.fill(username);
await this.passwordTextbox.fill(password);
await this.loginButton.click();
    }
}