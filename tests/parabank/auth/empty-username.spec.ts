import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/parabank/LoginPage';
import { USERS } from '../../../src/data/parabank/users';

test('Login with Empty Username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        USERS.emptyUsername.username,
        USERS.emptyUsername.password
    );

    await expect(loginPage.errorMessage).toHaveText(
        'Please enter a username and password.'
    );
});