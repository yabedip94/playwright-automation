import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly addToCartBikeLight: Locator;
    readonly shoppingCartLink: Locator;
    readonly nameProduct: Locator;
    readonly appLogo: Locator;

    constructor(page: Page) {
        this.page = page;

        this.addToCartBikeLight = page.locator(
            '[data-test="add-to-cart-sauce-labs-bike-light"]'
        );

        this.shoppingCartLink = page.locator(
            '[data-test="shopping-cart-link"]'
        );

        this.nameProduct = page.locator('#item_0_title_link');

        this.appLogo = page.locator(
            '.app_logo'
        );
    }

    async addBikeLightToCart() {
        await this.addToCartBikeLight.click();
    }

    async openShoppingCart() {
        await this.shoppingCartLink.click();
    }

    async getNameProduct() {
        return await this.nameProduct.textContent();
    }

    async getAppLogo() {
        return await this.appLogo.textContent();
    }
}
