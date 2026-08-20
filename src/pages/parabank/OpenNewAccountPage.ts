import { Page, Locator } from '@playwright/test';

export class OpenNewAccountPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly accountTypeSelect: Locator;
    readonly fromAccountSelect: Locator;
    readonly openNewAccountButton: Locator;
    readonly successTitle: Locator;
    readonly newAccountId: Locator;
    readonly errorTitle: Locator;

    constructor(page: Page) {
        this.page = page;

        this.pageTitle = page.getByRole('heading', {
            name: 'Open New Account',
        });

        this.accountTypeSelect = page.locator('#type');

        this.fromAccountSelect = page.locator('#fromAccountId');

        this.openNewAccountButton = page.locator(
            'input[type="button"][value="Open New Account"]'
        );

        this.successTitle = page.locator(
            '#openAccountResult h1'
        );

        this.newAccountId = page.locator('#newAccountId');

        this.errorTitle = page.locator(
            '#openAccountError h1'
        );
    }

    async selectAccountType(accountType: 'CHECKING' | 'SAVINGS') {
        await this.accountTypeSelect.selectOption({
            label: accountType,
        });
    }

    async waitForSourceAccount() {
        await this.fromAccountSelect.locator('option').first().waitFor({
            state: 'attached',
        });
    }
    async openNewAccount() {
        await this.openNewAccountButton.click();
    }
}