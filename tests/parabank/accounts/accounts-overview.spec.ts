import { test, expect } from '@playwright/test';

import {
    createUser,
} from '../../../src/helpers/parabankAuth';

import { AccountsOverviewPage } from '../../../src/pages/parabank/AccountsOverviewPage';

test.describe('ParaBank - Accounts Overview', () => {

    test(
        'User can view account overview after successful registration',
        async ({ page }) => {

            await createUser(page);

            const accountsOverviewPage =
                new AccountsOverviewPage(page);

            await page.getByRole('link', {
                name: 'Accounts Overview',
            }).click();

            await expect(
                accountsOverviewPage.pageTitle
            ).toBeVisible({
                timeout: 10000,
            });

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

        }
    );

});