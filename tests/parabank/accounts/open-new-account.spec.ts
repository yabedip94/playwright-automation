import { test, expect } from '@playwright/test';

import {
    createUser,
    loginAsUser,
} from '../../../src/helpers/parabankAuth';

import { OpenNewAccountPage } from '../../../src/pages/parabank/OpenNewAccountPage';

test.describe('ParaBank - Open New Account', () => {
    test('User can open a new savings account', async ({ page }) => {
        const user = await createUser(page);

        await loginAsUser(
            page,
            user.username,
            user.password
        );

        const openNewAccountPage = new OpenNewAccountPage(page);

        await page.getByRole('link', {
            name: 'Open New Account',
        }).click();

        await expect(
            openNewAccountPage.pageTitle
        ).toBeVisible();

        await openNewAccountPage.waitForSourceAccount();

        await expect(
            openNewAccountPage.fromAccountSelect.locator('option')
        ).not.toHaveCount(0);

        await openNewAccountPage.selectAccountType('SAVINGS');

        await openNewAccountPage.openNewAccount();

        await expect(
            openNewAccountPage.successTitle
        ).toBeVisible({
            timeout: 10000,
        });

        await expect(
            openNewAccountPage.newAccountId
        ).toBeVisible();

        await expect(
            openNewAccountPage.newAccountId
        ).not.toHaveText('');
    });
});