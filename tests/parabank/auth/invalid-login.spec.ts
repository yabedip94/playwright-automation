import { test, expect } from '@playwright/test';

import { LoginPage } from '../../../src/pages/parabank/LoginPage';

test('Invalid Login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        'invalid_user',
        'wrong_password'
    );

    await expect(
        loginPage.errorMessage
    ).toBeVisible();
});