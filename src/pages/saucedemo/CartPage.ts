import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly removeButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.productName = page.locator(
            '[data-test="item-0-title-link"]'
        );

        this.removeButton = page.locator(
            '[data-test="remove-sauce-labs-bike-light"]'
        );

        this.checkoutButton = page.locator(
            '[data-test="checkout"]'
        );
    }

    async getProductName() {
        return await this.productName.textContent();
    }

    async removeItem() {
        await this.removeButton.click();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

}
