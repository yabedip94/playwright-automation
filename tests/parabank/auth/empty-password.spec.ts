import { test, expect } from '@playwright/test';

import {
    createUser,
    logoutUser,
} from '../../../src/helpers/parabankAuth';

import { LoginPage } from '../../../src/pages/parabank/LoginPage';

test('Login with Empty Password', async ({ page }) => {
    const user = await createUser(page);

    await logoutUser(page);

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        user.username,
        ''
    );

    await expect(
        loginPage.errorMessage
    ).toBeVisible();
});