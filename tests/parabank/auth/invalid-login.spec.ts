import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/parabank/LoginPage';
import { USERS } from '../../../src/data/parabank/users';

test('Login with Invalid Credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('/');

    await loginPage.login(
        USERS.invalid.username,
        USERS.invalid.password
    );

    await expect(loginPage.errorMessage).toHaveText(
        'An internal error has occurred and has been logged.'
    );
});