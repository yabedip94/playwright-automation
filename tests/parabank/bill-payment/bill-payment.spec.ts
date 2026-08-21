import { test, expect } from '@playwright/test';

import {
    createUser,
} from '../../../src/helpers/parabankAuth';

import { BillPayPage } from '../../../src/pages/parabank/BillPayPage';

test.describe('ParaBank - Bill Payment', () => {

    test('User can successfully pay a bill', async ({ page }) => {

        // Create dynamic user
        const user = await createUser(page);

        console.log(`Testing with user: ${user.username}`);

        // User is automatically logged in after registration

        const billPayPage = new BillPayPage(page);

        // Open Bill Pay page
        await billPayPage.goto();

        // Fill payee information
        await billPayPage.fillPayeeInformation(
            'Electric Company',
            '123 Main Street',
            'New York',
            'NY',
            '10001',
            '1234567890',
            '987654321',
            '50'
        );

        // Send payment
        await billPayPage.sendPayment();

        // Validate successful payment
        await expect(
            billPayPage.successTitle
        ).toBeVisible({
            timeout: 10000,
        });

    });

});