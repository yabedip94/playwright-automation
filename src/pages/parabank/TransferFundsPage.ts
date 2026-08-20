import { Page, Locator, expect } from '@playwright/test';

export class TransferFundsPage {
    readonly page: Page;

    readonly pageTitle: Locator;

    readonly amountInput: Locator;
    readonly fromAccountSelect: Locator;
    readonly toAccountSelect: Locator;
    readonly transferButton: Locator;

    readonly successTitle: Locator;
    readonly amountResult: Locator;
    readonly fromAccountResult: Locator;
    readonly toAccountResult: Locator;

    constructor(page: Page) {
        this.page = page;

        this.pageTitle = page.getByRole('heading', {
            name: 'Transfer Funds',
        });

        this.amountInput = page.locator('#amount');
        this.fromAccountSelect = page.locator('#fromAccountId');
        this.toAccountSelect = page.locator('#toAccountId');

        this.transferButton = page.locator(
            'input[value="Transfer"]'
        );

        this.successTitle = page.getByRole('heading', {
            name: 'Transfer Complete!',
        });

        this.amountResult = page.locator('#amountResult');
        this.fromAccountResult = page.locator(
            '#fromAccountIdResult'
        );
        this.toAccountResult = page.locator(
            '#toAccountIdResult'
        );
    }

    async goto() {
        await this.page.goto(
            'https://parabank.parasoft.com/parabank/transfer.htm'
        );
    }

    async waitForAccounts() {
        await expect(
            this.fromAccountSelect.locator('option')
        ).not.toHaveCount(0);

        await expect(
            this.toAccountSelect.locator('option')
        ).not.toHaveCount(0);
    }

    async transfer(
        amount: string,
        fromAccountId: string,
        toAccountId: string
    ) {
        await this.amountInput.fill(amount);

        await this.fromAccountSelect.selectOption(
            fromAccountId
        );

        await this.toAccountSelect.selectOption(
            toAccountId
        );

        await this.transferButton.click();
    }
}