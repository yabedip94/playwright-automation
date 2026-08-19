import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/parabank/LoginPage';
import { USERS } from '../../../src/data/parabank/users';

test('Login with Empty Password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('/');

    await loginPage.login(
        USERS.emptyPassword.username,
        USERS.emptyPassword.password
    );

    await expect(loginPage.errorMessage).toHaveText(
        'Please enter a username and password.'
    );
});