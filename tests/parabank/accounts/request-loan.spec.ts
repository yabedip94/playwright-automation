import { test, expect } from '@playwright/test';

import {
    createUser,
} from '../../../src/helpers/parabankAuth';

import {
    RequestLoanPage,
} from '../../../src/pages/parabank/RequestLoanPage';


test.describe('ParaBank - Request Loan', () => {

    test('User can successfully request a loan', async ({ page }) => {

        // Create dynamic user
        const user = await createUser(page);

        console.log(`Testing with user: ${user.username}`);


        // User is automatically logged in after registration
        const requestLoanPage = new RequestLoanPage(page);


        // Open Request Loan page
        await requestLoanPage.goto();


        // Validate page is loaded
        await expect(
            requestLoanPage.pageTitle
        ).toBeVisible();


        // Wait for account to be available
        await expect(
            requestLoanPage.fromAccountSelect
        ).toBeVisible();


        // Get first available account ID
        const fromAccountId = await requestLoanPage
            .fromAccountSelect
            .locator('option')
            .first()
            .getAttribute('value');


        console.log(
            `From Account: ${fromAccountId}`
        );


        // Request loan
        await requestLoanPage.requestLoan(
            '1000',
            '100',
            fromAccountId!
        );


        // Validate loan request result
        await expect(
            requestLoanPage.successTitle
        ).toBeVisible();


        // Validate loan provider
        await expect(
            requestLoanPage.loanProviderName
        ).not.toBeEmpty();


        // Validate loan status
        await expect(
            requestLoanPage.loanStatus
        ).toHaveText(/Approved|Denied/);

    });

});