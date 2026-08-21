import { test, expect } from '@playwright/test';

import {
    createUser,
} from '../../../src/helpers/parabankAuth';

import {
    FindTransactionsPage,
} from '../../../src/pages/parabank/FindTransactionsPage';

test.describe('ParaBank - Find Transactions', () => {

    test(
        'User can access Find Transactions page',
        async ({ page }) => {

            // Create dynamic user
            const user = await createUser(page);

            console.log(
                `Testing with user: ${user.username}`
            );

            // User is automatically logged in after registration

            const findTransactionsPage =
                new FindTransactionsPage(page);

            // Open Find Transactions page
            await findTransactionsPage.goto();

            // Validate page title
            await expect(
                findTransactionsPage.pageTitle
            ).toBeVisible();

            // Wait until accounts are loaded
            await findTransactionsPage.waitForAccounts();

            // Validate account dropdown
            await expect(
                findTransactionsPage
                    .accountSelect
                    .locator('option')
            ).not.toHaveCount(0);

        }
    );

});