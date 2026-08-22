import { Page, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

import { RegisterPage } from '../pages/parabank/RegisterPage';
import { LoginPage } from '../pages/parabank/LoginPage';

type TestUser = {
    username: string;
    password: string;
    createdAt: number;
};

const CACHE_DURATION = 30 * 60 * 1000;

const USER_CACHE_PATH = path.resolve(
    process.cwd(),
    '.parabank-user.json'
);

export async function getTestUser(
    page: Page
): Promise<TestUser> {

    if (fs.existsSync(USER_CACHE_PATH)) {
        const cachedUser: TestUser = JSON.parse(
            fs.readFileSync(USER_CACHE_PATH, 'utf-8')
        );

        const userAge =
            Date.now() - cachedUser.createdAt;

        if (userAge < CACHE_DURATION) {
            console.log(
                `Using cached user: ${cachedUser.username}`
            );

            await loginAsUser(
                page,
                cachedUser.username,
                cachedUser.password
            );

            return cachedUser;
        }

        console.log(
            'Cached user expired. Creating new user...'
        );
    }

    console.log(
        'No valid cached user. Creating new user...'
    );

    const username = `bediqa${Date.now()}`;

    const password = 'Password123!';

    const registerPage = new RegisterPage(page);

    await registerPage.goto();

    await registerPage.register(
        username,
        password
    );

    await expect(
        page.getByText(
            'Your account was created successfully.'
        )
    ).toBeVisible();

    const newUser: TestUser = {
        username,
        password,
        createdAt: Date.now(),
    };

    fs.writeFileSync(
        USER_CACHE_PATH,
        JSON.stringify(newUser, null, 2)
    );

    console.log(
        `New user created: ${username}`
    );

    return newUser;
}

export async function createUser(
    page: Page
): Promise<TestUser> {
    return getTestUser(page);
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
    ).toBeVisible({
        timeout: 15000,
    });

    await loginPage.login(
        username,
        password
    );

    await expect(
        page.getByRole('heading', {
            name: 'Accounts Overview',
        })
    ).toBeVisible({
        timeout: 15000,
    });
}