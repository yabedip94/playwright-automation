import { Page, Locator } from '@playwright/test';

export class AccountsOverviewPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly accountTable: Locator;
    readonly accountRows: Locator;
    readonly accountLinks: Locator;
    readonly balanceAmounts: Locator;
    readonly availableAmounts: Locator;
    readonly totalRow: Locator;

    constructor(page: Page) {
        this.page = page;

        this.pageTitle = page.getByRole('heading', {
            name: 'Accounts Overview',
        });

        this.accountTable = page.locator('#accountTable');

        this.accountRows = page.locator(
            '#accountTable tbody tr'
        );

        this.accountLinks = page.locator(
            '#accountTable tbody tr td:first-child a'
        );

        this.balanceAmounts = page.locator(
            '#accountTable tbody tr:not(:has-text("Total")) td:nth-child(2)'
        );

        this.availableAmounts = page.locator(
            '#accountTable tbody tr:not(:has-text("Total")) td:nth-child(3)'
        );

        this.totalRow = page.locator(
            '#accountTable tbody tr',
            {
                hasText: 'Total',
            }
        );
    }
}