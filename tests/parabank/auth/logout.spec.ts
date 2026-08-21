import { test, expect } from '@playwright/test';

import {
    createUser,
} from '../../../src/helpers/parabankAuth';

import {
    LogoutPage,
} from '../../../src/pages/parabank/LogoutPage';


test.describe('ParaBank - Logout', () => {

    test('User can successfully logout', async ({ page }) => {

        // Create dynamic user
        const user = await createUser(page);

        console.log(`Testing with user: ${user.username}`);

        // User is automatically logged in after registration

        // Logout
        const logoutPage = new LogoutPage(page);

        await logoutPage.logout();

        // Verify user is redirected to login page
        await expect(
            logoutPage.customerLoginHeading
        ).toBeVisible();

        // Verify login form is visible
        await expect(
            logoutPage.usernameInput
        ).toBeVisible();

        await expect(
            logoutPage.passwordInput
        ).toBeVisible();

        await expect(
            logoutPage.loginButton
        ).toBeVisible();

    });

});