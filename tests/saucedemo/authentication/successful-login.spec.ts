import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/saucedemo/LoginPage';
import { USERS } from '../../../src/data/saucedemo/users';
import { allure } from 'allure-playwright';

test(
    'Successful Login',
    async ({ page }) => {
        await allure.feature('Authentication');
        await allure.story('User Login');
        await allure.epic('Login');
        await allure.owner('Bedi');
        await allure.severity('critical');


        await allure.description(
            'Verify that a standard user can successfully log in to SauceDemo.'
        );

        const loginPage = new LoginPage(page);

        await page.goto('/');

        await loginPage.login(
            USERS.standard.username,
            USERS.standard.password
        );

        await expect(page).toHaveURL(/inventory\.html/);
    }
);
