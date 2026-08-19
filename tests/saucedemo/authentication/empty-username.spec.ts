import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/LoginPage';
import { USERS } from '../../../src/data/saucedemo/users';

test('Empty Username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(
        USERS.emptyUsername.username,
        USERS.emptyUsername.password
    );

    await expect(await loginPage.getErrorMessage()).toContain('Username is required');
});
