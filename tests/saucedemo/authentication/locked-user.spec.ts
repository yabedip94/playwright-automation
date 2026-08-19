import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/LoginPage';
import { USERS } from '../../../src/data/saucedemo/users';

test('Locked User', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(
        USERS.locked.username,
        USERS.locked.password
    );

    await expect(await loginPage.getErrorMessage()).toContain('Sorry, this user has been locked out');
});
