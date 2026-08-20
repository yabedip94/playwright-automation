import { test, expect } from '@playwright/test';

import { createUser } from '../../../src/helpers/parabankAuth';

import { AccountsOverviewPage } from '../../../src/pages/parabank/AccountsOverviewPage';
import { AccountActivityPage } from '../../../src/pages/parabank/AccountActivityPage';

test('View Account Activity', async ({ page }) => {
    await createUser(page);

    const accountsOverviewPage = new AccountsOverviewPage(page);
    const accountActivityPage = new AccountActivityPage(page);

    await page.goto(
        'https://parabank.parasoft.com/parabank/overview.htm'
    );

    await expect(
        accountsOverviewPage.pageTitle
    ).toBeVisible();

    const firstAccount = accountsOverviewPage.accountLinks.first();

    await expect(firstAccount).toBeVisible();

    await firstAccount.click();

    await expect(
        accountActivityPage.pageTitle
    ).toBeVisible();

    await expect(
        accountActivityPage.accountId
    ).toBeVisible();

    await expect(
        accountActivityPage.accountType
    ).toBeVisible();

    await expect(
        accountActivityPage.balance
    ).toBeVisible();

    await expect(
        accountActivityPage.availableBalance
    ).toBeVisible();

    await expect(
        accountActivityPage.activityTable
    ).toBeVisible();
});