import { test, expect } from '@playwright/test';

import { RegisterPage } from '../../../src/pages/parabank/RegisterPage';
import { OpenNewAccountPage } from '../../../src/pages/parabank/OpenNewAccountPage';
import { UpdateProfilePage } from '../../../src/pages/parabank/UpdateProfilePage';
import { TransferFundsPage } from '../../../src/pages/parabank/TransferFundsPage';
import { RequestLoanPage } from '../../../src/pages/parabank/RequestLoanPage';
import { LogoutPage } from '../../../src/pages/parabank/LogoutPage';

test.describe('ParaBank - Full End to End Journey', () => {

    test('User can complete full banking journey', async ({ page }) => {

        // ========================================
        // STEP 1 - REGISTER NEW USER
        // ========================================

        const username = `bediqa${Date.now()}`;
        const password = 'Password123!';

        console.log(`Testing with user: ${username}`);

        const registerPage = new RegisterPage(page);

        await registerPage.goto();

        await registerPage.register(username, password);

        await expect(
            page.getByText(
                'Your account was created successfully.'
            )
        ).toBeVisible();

        console.log('Step 1: Registration successful');


        // ========================================
        // STEP 2 - OPEN NEW ACCOUNT
        // ========================================

        const openNewAccountPage =
            new OpenNewAccountPage(page);

        await page.goto(
            'https://parabank.parasoft.com/parabank/openaccount.htm'
        );

        await expect(
            openNewAccountPage.pageTitle
        ).toBeVisible();

        await openNewAccountPage.waitForSourceAccount();

        // Get existing account ID
        const sourceAccountId =
            await openNewAccountPage.fromAccountSelect
                .locator('option')
                .first()
                .getAttribute('value');

        if (!sourceAccountId) {
            throw new Error('Source account ID not found');
        }

        // Select SAVINGS account
        await openNewAccountPage.selectAccountType(
            'SAVINGS'
        );

        // Open new account
        await openNewAccountPage.openNewAccount();

        await expect(
            openNewAccountPage.successTitle
        ).toBeVisible();

        // Get newly created account ID
        const newAccountId =
            await openNewAccountPage.newAccountId.textContent();

        if (!newAccountId) {
            throw new Error('New account ID not found');
        }

        const cleanNewAccountId =
            newAccountId.trim();

        console.log(
            `Step 2: New account created: ${cleanNewAccountId}`
        );


        // ========================================
        // STEP 3 - UPDATE PROFILE
        // ========================================

        const updateProfilePage =
            new UpdateProfilePage(page);

        await updateProfilePage.goto();

        await expect(
            updateProfilePage.pageTitle
        ).toBeVisible();

        await updateProfilePage.updateProfile(
            'Bedi',
            'QA Updated',
            '456 Testing Street',
            'Jakarta',
            'DKI Jakarta',
            '12345',
            '081234567890'
        );

        await expect(
            updateProfilePage.successMessage
        ).toContainText(
            'Your updated address and phone number have been added to the system.'
        );

        console.log('Step 3: Profile updated');


        // ========================================
        // STEP 4 - TRANSFER FUNDS
        // ========================================

        const transferFundsPage =
            new TransferFundsPage(page);

        await transferFundsPage.goto();

        await expect(
            transferFundsPage.pageTitle
        ).toBeVisible();

        await transferFundsPage.waitForAccounts();

        await transferFundsPage.transfer(
            '50',
            sourceAccountId,
            cleanNewAccountId
        );

        await expect(
            transferFundsPage.successTitle
        ).toBeVisible();

        console.log('Step 4: Funds transferred');


        // ========================================
        // STEP 5 - REQUEST LOAN
        // ========================================

        const requestLoanPage =
            new RequestLoanPage(page);

        await requestLoanPage.goto();

        await expect(
            requestLoanPage.pageTitle
        ).toBeVisible();

        await requestLoanPage.requestLoan(
            '1000',
            '100',
            sourceAccountId
        );

        await expect(
            requestLoanPage.successTitle
        ).toBeVisible();

        console.log('Step 5: Loan request processed');


        // ========================================
        // STEP 6 - LOGOUT
        // ========================================

        const logoutPage =
            new LogoutPage(page);

        await logoutPage.logout();

        await expect(
            page.getByRole('heading', {
                name: 'Customer Login',
            })
        ).toBeVisible();

        console.log('Step 6: Logout successful');

    });

});