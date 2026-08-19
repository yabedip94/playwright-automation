import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/LoginPage';
import { USERS } from '../../../src/data/saucedemo/users';

test('Invalid Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(
        USERS.invalid.username,
        USERS.invalid.password
    );


    await expect(await loginPage.getErrorMessage()).toContain('Username and password do not match any user in this service');
});
