import { Page, Locator } from '@playwright/test';

export class AccountActivityPage {
    readonly page: Page;

    readonly pageTitle: Locator;
    readonly accountDetailsTitle: Locator;
    readonly accountId: Locator;
    readonly accountType: Locator;
    readonly balance: Locator;
    readonly availableBalance: Locator;
    readonly activityTable: Locator;

    constructor(page: Page) {
        this.page = page;

        this.pageTitle = page.getByRole('heading', {
            name: 'Account Details',
        });

        this.accountDetailsTitle = page.getByText(
            'Account Details',
            { exact: true }
        );

        this.accountId = page.locator('#accountId');
        this.accountType = page.locator('#accountType');
        this.balance = page.locator('#balance');
        this.availableBalance = page.locator('#availableBalance');

        this.activityTable = page.locator('#transactionTable');
    }
}