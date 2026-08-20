import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/parabank/LoginPage';
import { USERS } from '../../../src/data/parabank/users';

test('Successful Login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        USERS.validUser.username,
        USERS.validUser.password
    );

    await expect(
        page.getByRole('heading', { name: 'Accounts Overview' })
    ).toBeVisible();
});