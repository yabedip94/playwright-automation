import { Page, Locator } from '@playwright/test';

export class FindTransactionsPage {

    readonly page: Page;

    readonly pageTitle: Locator;

    readonly accountSelect: Locator;

    readonly transactionIdInput: Locator;

    readonly findByTransactionIdButton: Locator;

    readonly dateInput: Locator;

    readonly findByDateButton: Locator;

    readonly constructorAccountSelect: Locator;

    constructor(page: Page) {

        this.page = page;

        this.pageTitle = page.getByRole('heading', {
            name: 'Find Transactions',
        });

        this.accountSelect = page.locator(
            '#accountId'
        );

        this.transactionIdInput = page.locator(
            '#transactionId'
        );

        this.findByTransactionIdButton = page.locator(
            'button:has-text("Find Transactions")'
        ).first();

        this.dateInput = page.locator(
            '#transactionDate'
        );

        this.findByDateButton = page.locator(
            'button:has-text("Find Transactions")'
        ).last();

        this.constructorAccountSelect = page.locator(
            '#accountId'
        );

    }

    async goto() {

        await this.page.goto(
            'https://parabank.parasoft.com/parabank/findtrans.htm'
        );

    }

    async waitForAccounts() {
        await this.accountSelect
            .locator('option')
            .first()
            .waitFor({ state: 'attached' });
    }

    async selectAccount(accountId: string) {

        await this.accountSelect.selectOption(
            accountId
        );

    }

    async searchByTransactionId(
        transactionId: string
    ) {

        await this.transactionIdInput.fill(
            transactionId
        );

        await this.findByTransactionIdButton.click();

    }

    async searchByDate(date: string) {

        await this.dateInput.fill(date);

        await this.findByDateButton.click();

    }

}