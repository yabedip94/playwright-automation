import { test, expect } from '@playwright/test';

import { LoginPage } from '../../../src/pages/parabank/LoginPage';

test('Login with Empty Username and Password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login('', '');

    await expect(
        loginPage.errorMessage
    ).toBeVisible();
});