import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/parabank/LoginPage';
import { USERS } from '../../../src/data/parabank/users';

test('Successful Login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('https://parabank.parasoft.com/parabank/index.htm');

    await loginPage.login(
        USERS.validUser.username,
        USERS.validUser.password
    );

    await expect(page).toHaveURL(/overview\.htm/);

    await expect(
        page.locator('h1.title').filter({ hasText: 'Accounts Overview' })
    ).toBeVisible();
});