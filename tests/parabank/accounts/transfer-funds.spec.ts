import { test, expect } from '@playwright/test';

import {
    createUser,
} from '../../../src/helpers/parabankAuth';

import { TransferFundsPage } from '../../../src/pages/parabank/TransferFundsPage';

test('Successfully Transfer Funds', async ({ page }) => {

    // Create dynamic user
    const user = await createUser(page);

    console.log(`Testing with user: ${user.username}`);

    // User is automatically logged in after registration

    const transferFundsPage = new TransferFundsPage(page);

    await transferFundsPage.goto();

    // Wait until accounts are loaded
    await transferFundsPage.waitForAccounts();

    // Get account IDs
    const fromAccount = await transferFundsPage
        .fromAccountSelect
        .locator('option')
        .first()
        .getAttribute('value');

    const toAccount = await transferFundsPage
        .toAccountSelect
        .locator('option')
        .last()
        .getAttribute('value');

    console.log(`From Account: ${fromAccount}`);
    console.log(`To Account: ${toAccount}`);

    // Transfer $50
    await transferFundsPage.transfer(
        '50',
        fromAccount!,
        toAccount!
    );

    // Validate transfer success
    await expect(
        transferFundsPage.successTitle
    ).toBeVisible();

    await expect(
        transferFundsPage.amountResult
    ).toHaveText('$50.00');

});