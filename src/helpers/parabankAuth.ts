import { Page, expect } from '@playwright/test';

import { RegisterPage } from '../pages/parabank/RegisterPage';
import { LoginPage } from '../pages/parabank/LoginPage';

export async function createUser(page: Page) {
    const username = `bediqa${Date.now()}`;
    const password = 'Password123!';

    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);

    const registerPage = new RegisterPage(page);

    await registerPage.goto();

    await registerPage.register(username, password);

    await expect(
        page.getByText('Your account was created successfully.')
    ).toBeVisible();

    return {
        username,
        password,
    };
}

export async function logoutUser(page: Page) {
    await page.getByRole('link', {
        name: 'Log Out',
    }).click();
}

export async function loginAsUser(
    page: Page,
    username: string,
    password: string
) {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await expect(
        loginPage.usernameInput
    ).toBeVisible({ timeout: 15000 });

    await loginPage.login(username, password);

    await expect(
        page.getByRole('heading', {
            name: 'Accounts Overview',
        })
    ).toBeVisible({ timeout: 15000 });
}