import { Page, Locator } from '@playwright/test';

export class RequestLoanPage {

    readonly page: Page;

    readonly pageTitle: Locator;

    readonly loanAmountInput: Locator;

    readonly downPaymentInput: Locator;

    readonly fromAccountSelect: Locator;

    readonly applyNowButton: Locator;

    readonly successTitle: Locator;

    readonly loanProviderName: Locator;

    readonly responseDate: Locator;

    readonly loanStatus: Locator;

    readonly approvedMessage: Locator;

    readonly newAccountId: Locator;


    constructor(page: Page) {

        this.page = page;

        this.pageTitle = page.getByRole('heading', {
            name: 'Apply for a Loan',
        });

        this.loanAmountInput = page.locator('#amount');

        this.downPaymentInput = page.locator('#downPayment');

        this.fromAccountSelect = page.locator(
            '#fromAccountId'
        );

        this.applyNowButton = page.locator(
            'input[value="Apply Now"]'
        );

        this.successTitle = page.getByRole('heading', {
            name: 'Loan Request Processed',
        });

        this.loanProviderName = page.locator(
            '#loanProviderName'
        );

        this.responseDate = page.locator(
            '#responseDate'
        );

        this.loanStatus = page.locator(
            '#loanStatus'
        );

        this.approvedMessage = page.locator(
            '#loanRequestApproved'
        );

        this.newAccountId = page.locator(
            '#newAccountId'
        );

    }


    async goto() {

        await this.page.goto(
            'https://parabank.parasoft.com/parabank/requestloan.htm'
        );

    }


    async requestLoan(
        loanAmount: string,
        downPayment: string,
        fromAccountId: string
    ) {

        await this.loanAmountInput.fill(loanAmount);

        await this.downPaymentInput.fill(downPayment);

        await this.fromAccountSelect.selectOption(
            fromAccountId
        );

        await this.applyNowButton.click();

    }

}