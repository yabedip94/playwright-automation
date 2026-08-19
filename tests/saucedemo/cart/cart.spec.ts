
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/LoginPage';
import { InventoryPage } from '../../../src/pages/InventoryPage';
import { CartPage } from '../../../src/pages/CartPage';
import { USERS } from '../../../src/data/saucedemo/users';

test('Add Sauce Labs Bike Light to cart', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await page.goto('/');

    await loginPage.login(
        USERS.standard.username,
        USERS.standard.password
    );

    await inventoryPage.addBikeLightToCart();

    await expect(inventoryPage.nameProduct)
        .toHaveText('Sauce Labs Bike Light');
    await inventoryPage.openShoppingCart();

    await expect(page).toHaveURL(/cart.html/);

    await expect(cartPage.productName)
        .toHaveText('Sauce Labs Bike Light');

    await cartPage.removeItem();
    await expect(cartPage.productName).toBeHidden();
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one.html/);
});
