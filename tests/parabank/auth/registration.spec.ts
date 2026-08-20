import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../../src/pages/parabank/RegisterPage';
import { USERS } from '../../../src/data/parabank/users';

test('Successful Registration', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();

    await registerPage.register(
        USERS.validUser.username,
        USERS.validUser.password
    );

    await expect(
        page.getByText('Your account was created successfully.')
    ).toBeVisible();
});