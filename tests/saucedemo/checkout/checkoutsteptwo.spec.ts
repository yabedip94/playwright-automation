import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/LoginPage';
import { InventoryPage } from '../../../src/pages/InventoryPage';
import { CartPage } from '../../../src/pages/CartPage';
import { CheckoutPage } from '../../../src/pages/CheckoutPage';
import { CheckoutStepTwoPage } from '../../../src/pages/CheckoutStepTwoPage';
import { USERS } from '../../../src/data/users';

test('Verify price total on checkout step two', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);

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

    await expect(checkoutStepTwoPage.paymentInformation)
        .toHaveText('SauceCard #31337');
    await expect(checkoutStepTwoPage.shippingInformation)
        .toHaveText('Free Pony Express Delivery!');
    await expect(checkoutStepTwoPage.itemTotal)
        .toContainText('9.99');

    await expect(checkoutStepTwoPage.tax)
        .toContainText('0.80');

    await expect(checkoutStepTwoPage.total)
        .toContainText('10.79');
    await expect(checkoutStepTwoPage.cancelButton)
        .toBeVisible();

    await expect(checkoutStepTwoPage.finishButton)
        .toBeVisible();
    await checkoutStepTwoPage.clickFinish();
    await expect(page).toHaveURL(/checkout-complete.html/);
});