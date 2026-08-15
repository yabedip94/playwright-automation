import { Page, Locator } from '@playwright/test';

export class CheckoutStepTwoPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly productDescription: Locator;
    readonly productQuantity: Locator;
    readonly productPrice: Locator;
    readonly paymentInformation: Locator;
    readonly shippingInformation: Locator;
    readonly itemTotal: Locator;
    readonly tax: Locator;
    readonly total: Locator;
    readonly cancelButton: Locator;
    readonly finishButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.productName = page.locator('#item_0_title_link');
        this.productDescription = page.locator('[data-test="inventory-item-desc"]');
        this.productQuantity = page.locator('[data-test="inventory-item-qty"]');
        this.productPrice = page.locator('[data-test="inventory-item-price"]');
        this.paymentInformation = page.locator('[data-test="payment-info-value"]');
        this.shippingInformation = page.locator('[data-test="shipping-info-value"]');
        this.itemTotal = page.locator('[data-test="subtotal-label"]');
        this.tax = page.locator('[data-test="tax-label"]');
        this.total = page.locator('[data-test="total-label"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }

    async getProductName() {
        return await this.productName.textContent();
    }

    async getProductDescription() {
        return await this.productDescription.textContent();
    }

    async getProductQuantity() {
        return await this.productQuantity.textContent();
    }

    async getProductPrice() {
        return await this.productPrice.textContent();
    }

    async getPaymentInformation() {
        return await this.paymentInformation.textContent();
    }

    async getShippingInformation() {
        return await this.shippingInformation.textContent();
    }
    async getItemTotal() {
        return await this.itemTotal.textContent();
    }

    async getTax() {
        return await this.tax.textContent();
    }

    async getTotal() {
        return await this.total.textContent();
    }

    async clickCancel() {
        await this.cancelButton.click();
    }

    async clickFinish() {
        await this.finishButton.click();
    }

}
