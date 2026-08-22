import { Page, Locator } from '@playwright/test';

export class LogoutPage {
    readonly page: Page;

    // Logout link
    readonly logoutLink: Locator;

    // Login page elements after logout
    readonly customerLoginHeading: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Logout
        this.logoutLink = page.getByRole('link', { name: 'Log Out' });

        // Elements on login page after successful logout
        this.customerLoginHeading = page.getByRole('heading', {
            name: 'Customer Login',
        });

        this.usernameInput = page.locator('input[name="username"]');

        this.passwordInput = page.locator('input[name="password"]');

        this.loginButton = page.getByRole('button', {
            name: 'Log In',
        });
    }

    /**
     * Click Log Out and wait until redirected to the main/login page
     */
    async logout(): Promise<void> {
        await this.logoutLink.click();
    }
}