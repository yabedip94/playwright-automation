
import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    priceTotal(priceTotal: any) {
        throw new Error('Method not implemented.');
    }
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipCodeInput: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.zipCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.cancelButton = page.locator('#cancel');
    }


    async fillCheckoutForm(firstName: string, lastName: string, zipCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async proceedToCheckout(firstName: string, lastName: string, zipCode: string) {
        await this.fillCheckoutForm(firstName, lastName, zipCode);
        await this.clickContinue();
    }
}