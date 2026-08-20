import { Page, Locator } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly addressInput: Locator;
    readonly cityInput: Locator;
    readonly stateInput: Locator;
    readonly zipCodeInput: Locator;
    readonly phoneNumberInput: Locator;
    readonly ssnInput: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly registerButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.firstNameInput = page.locator(
            'input[name="customer.firstName"]'
        );

        this.lastNameInput = page.locator(
            'input[name="customer.lastName"]'
        );

        this.addressInput = page.locator(
            'input[name="customer.address.street"]'
        );

        this.cityInput = page.locator(
            'input[name="customer.address.city"]'
        );

        this.stateInput = page.locator(
            'input[name="customer.address.state"]'
        );

        this.zipCodeInput = page.locator(
            'input[name="customer.address.zipCode"]'
        );

        this.phoneNumberInput = page.locator(
            'input[name="customer.phoneNumber"]'
        );

        this.ssnInput = page.locator(
            'input[name="customer.ssn"]'
        );

        this.usernameInput = page.locator(
            'input[name="customer.username"]'
        );

        this.passwordInput = page.locator(
            'input[name="customer.password"]'
        );

        this.confirmPasswordInput = page.locator(
            'input[name="repeatedPassword"]'
        );

        this.registerButton = page.locator(
            'input[value="Register"]'
        );
    }

    async goto() {
        await this.page.goto('https://parabank.parasoft.com/parabank/register.htm');
    }

    async register(username: string, password: string) {
        await this.firstNameInput.fill('Bedi');
        await this.lastNameInput.fill('QA');
        await this.addressInput.fill('Jakarta');
        await this.cityInput.fill('Jakarta');
        await this.stateInput.fill('DKI Jakarta');
        await this.zipCodeInput.fill('12345');
        await this.phoneNumberInput.fill('08123456789');
        await this.ssnInput.fill('123456789');

        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);

        await this.registerButton.click();
    }
}