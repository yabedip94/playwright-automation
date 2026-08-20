import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/saucedemo/LoginPage';
import { InventoryPage } from '../../../src/pages/saucedemo/InventoryPage';
import { USERS } from '../../../src/data/saucedemo/users';

test('Add Sauce Labs Bike Light to cart', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

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
});

