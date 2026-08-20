import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/parabank/LoginPage';
import { USERS } from '../../../src/data/parabank/users';

test('Login with Empty Username and Password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        USERS.emptyUsernameAndPassword.username,
        USERS.emptyUsernameAndPassword.password
    );

    await expect(loginPage.errorMessage).toHaveText(
        'Please enter a username and password.'
    );
});