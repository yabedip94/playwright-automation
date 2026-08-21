import { Page, Locator } from '@playwright/test';

export class BillPayPage {

    readonly page: Page;

    readonly pageTitle: Locator;

    readonly payeeNameInput: Locator;
    readonly addressInput: Locator;
    readonly cityInput: Locator;
    readonly stateInput: Locator;
    readonly zipCodeInput: Locator;
    readonly phoneNumberInput: Locator;

    readonly accountNumberInput: Locator;
    readonly verifyAccountInput: Locator;
    readonly amountInput: Locator;

    readonly fromAccountSelect: Locator;
    readonly sendPaymentButton: Locator;

    readonly successTitle: Locator;
    readonly payeeNameResult: Locator;
    readonly amountResult: Locator;
    readonly fromAccountResult: Locator;

    constructor(page: Page) {
        this.page = page;

        this.pageTitle = page.getByRole('heading', {
            name: 'Bill Payment Service',
        });

        this.payeeNameInput = page.locator(
            'input[name="payee.name"]'
        );

        this.addressInput = page.locator(
            'input[name="payee.address.street"]'
        );

        this.cityInput = page.locator(
            'input[name="payee.address.city"]'
        );

        this.stateInput = page.locator(
            'input[name="payee.address.state"]'
        );

        this.zipCodeInput = page.locator(
            'input[name="payee.address.zipCode"]'
        );

        this.phoneNumberInput = page.locator(
            'input[name="payee.phoneNumber"]'
        );

        this.accountNumberInput = page.locator(
            'input[name="payee.accountNumber"]'
        );

        this.verifyAccountInput = page.locator(
            'input[name="verifyAccount"]'
        );

        this.amountInput = page.locator(
            'input[name="amount"]'
        );

        this.fromAccountSelect = page.locator(
            'select[name="fromAccountId"]'
        );

        this.sendPaymentButton = page.locator(
            'input[value="Send Payment"]'
        );

        this.successTitle = page.getByRole('heading', {
            name: 'Bill Payment Complete',
        });

        this.payeeNameResult = page.locator(
            '#payeeName'
        );

        this.amountResult = page.locator(
            '#amount'
        );

        this.fromAccountResult = page.locator(
            '#fromAccountId'
        );
    }

    async goto() {
        await this.page.getByRole('link', {
            name: 'Bill Pay',
        }).click();

        await this.pageTitle.waitFor();
    }

    async fillPayeeInformation(
        payeeName: string,
        address: string,
        city: string,
        state: string,
        zipCode: string,
        phoneNumber: string,
        accountNumber: string,
        amount: string
    ) {
        await this.payeeNameInput.fill(payeeName);

        await this.addressInput.fill(address);

        await this.cityInput.fill(city);

        await this.stateInput.fill(state);

        await this.zipCodeInput.fill(zipCode);

        await this.phoneNumberInput.fill(phoneNumber);

        await this.accountNumberInput.fill(accountNumber);

        await this.verifyAccountInput.fill(accountNumber);

        await this.amountInput.fill(amount);
    }

    async sendPayment() {
        await this.sendPaymentButton.click();
    }
}