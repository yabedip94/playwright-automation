import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/LoginPage';
import { InventoryPage } from '../../../src/pages/InventoryPage';
import { CartPage } from '../../../src/pages/CartPage';
import { CheckoutPage } from '../../../src/pages/CheckoutPage';
import { USERS } from '../../../src/data/users';

test('Successful checkout with Sauce Labs Bike Light', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await page.goto('/');
    await loginPage.login(
        USERS.standard.username,
        USERS.standard.password
    );
    await expect(page).toHaveURL(/inventory\.html/);


    await inventoryPage.addBikeLightToCart();
    await inventoryPage.openShoppingCart();
    await expect(page).toHaveURL(/cart.html/);
    await cartPage.proceedToCheckout();
    await checkoutPage.proceedToCheckout(
        USERS.standard.firstName,
        USERS.standard.lastName,
        USERS.standard.zipCode
    );
    await expect(page).toHaveURL(/checkout-step-two.html/);
});