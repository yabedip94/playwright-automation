import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/LoginPage';
import { USERS } from '../../../src/data/users';

test('Successful Login', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(
        USERS.standard.username,
        USERS.standard.password
    );

    await expect(page).toHaveURL(/inventory\.html/);


});

