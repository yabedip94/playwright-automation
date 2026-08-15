import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/LoginPage';
import { USERS } from '../../../src/data/users';

test('Empty Password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(
        USERS.emptyPassword.username,
        USERS.emptyPassword.password
    );

    await expect(await loginPage.getErrorMessage()).toContain('Password is required');
});