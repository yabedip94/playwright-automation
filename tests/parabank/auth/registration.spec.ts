import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../../src/pages/parabank/RegisterPage';

test('Successful Registration', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    const username = `bediqa${Date.now()}`;
    const password = 'Password123!';

    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);

    await registerPage.goto();

    await registerPage.register(username, password);

    await expect(
        page.getByText('Your account was created successfully.')
    ).toBeVisible();
});