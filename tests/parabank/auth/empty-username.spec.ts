import { test, expect } from '@playwright/test';

import { LoginPage } from '../../../src/pages/parabank/LoginPage';

test('Login with Empty Username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        '',
        'Password123!'
    );

    await expect(
        loginPage.errorMessage
    ).toBeVisible();
});