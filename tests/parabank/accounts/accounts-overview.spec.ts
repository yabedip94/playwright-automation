import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/parabank/LoginPage';
import { AccountsOverviewPage } from '../../../src/pages/parabank/AccountsOverviewPage';
import { USERS } from '../../../src/data/parabank/users';

test.describe('ParaBank - Accounts Overview', () => {

    test('User can view account overview after successful login', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const accountsOverviewPage = new AccountsOverviewPage(page);

        await loginPage.goto();

        await loginPage.login(
            USERS.validUser.username,
            USERS.validUser.password
        );

        await expect(
            accountsOverviewPage.pageTitle
        ).toBeVisible();

        await expect(
            accountsOverviewPage.accountTable
        ).toBeVisible();

        await expect(
            accountsOverviewPage.accountLinks.first()
        ).toBeVisible();

        await expect(
            accountsOverviewPage.balanceAmounts.first()
        ).toBeVisible();

        await expect(
            accountsOverviewPage.availableAmounts.first()
        ).toBeVisible();

        await expect(
            accountsOverviewPage.totalRow
        ).toBeVisible();
    });

});