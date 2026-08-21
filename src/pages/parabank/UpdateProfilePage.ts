import { Page, Locator } from '@playwright/test';

export class UpdateProfilePage {

    readonly page: Page;

    readonly pageTitle: Locator;

    readonly firstNameInput: Locator;

    readonly lastNameInput: Locator;

    readonly addressInput: Locator;

    readonly cityInput: Locator;

    readonly stateInput: Locator;

    readonly zipCodeInput: Locator;

    readonly phoneNumberInput: Locator;

    readonly updateProfileButton: Locator;

    readonly successTitle: Locator;

    readonly successMessage: Locator;

    constructor(page: Page) {

        this.page = page;

        this.pageTitle = page.getByRole('heading', {
            name: 'Update Profile',
        });

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

        this.updateProfileButton = page.getByRole('button', {
            name: 'Update Profile',
        });

        this.successTitle = page.getByRole('heading', {
            name: 'Profile Updated',
        });

        this.successMessage = page.getByText(
            'Your updated address and phone number have been added to the system.'
        );
    }

    async goto() {

        await this.page.goto(
            'https://parabank.parasoft.com/parabank/updateprofile.htm'
        );

    }

    async updateProfile(
        firstName: string,
        lastName: string,
        address: string,
        city: string,
        state: string,
        zipCode: string,
        phoneNumber: string
    ) {

        await this.firstNameInput.fill(firstName);

        await this.lastNameInput.fill(lastName);

        await this.addressInput.fill(address);

        await this.cityInput.fill(city);

        await this.stateInput.fill(state);

        await this.zipCodeInput.fill(zipCode);

        await this.phoneNumberInput.fill(phoneNumber);

        await this.updateProfileButton.click();

    }

}