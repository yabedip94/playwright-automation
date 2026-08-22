# Playwright Automation – SauceDemo & ParaBank

A scalable end-to-end test automation framework built with **Playwright** and **TypeScript**.

This project demonstrates UI automation testing using the **Page Object Model (POM)** design pattern across multiple web applications.

The framework currently covers authentication, e-commerce, and banking workflows using **SauceDemo** and **ParaBank**.

---

## ⚠️ ParaBank Test Environment Notice

ParaBank is a public demo banking application used as an external test environment.

During development and CI execution, the application may occasionally become unavailable or return **Cloudflare Error 1015 – You are being rate limited** after repeated automated registration, login, or banking requests.

Because of this external limitation, ParaBank tests may occasionally be **flaky**, especially when executed repeatedly or from cloud-based CI environments.

To reduce unnecessary registrations, authenticated ParaBank tests use a reusable dynamic test user strategy. A generated user can be temporarily reused across multiple tests before a new user is created.

Example behavior:

```text
Test Run
   ↓
Check Cached Test User
   ↓
User Still Valid?
   ├── Yes → Login with Existing User
   │
   └── No → Register New Dynamic User
                ↓
             Save User
```

This approach reduces repeated registration requests and helps minimize rate-limiting issues.

> **Note:** A failed ParaBank test caused by Cloudflare rate limiting or temporary external service instability does not necessarily indicate a defect in the automation framework.

---

## 🚀 Tech Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions
- Jenkins
- Page Object Model (POM)

---

## 🧪 Applications Under Test

### SauceDemo

Test coverage includes:

- Authentication
- Inventory
- Cart
- Checkout

### ParaBank

Test coverage includes:

- User Registration
- Successful Login
- Invalid Login
- Empty Username
- Empty Password
- Empty Username & Password
- Accounts Overview
- Account Activity
- Open New Account
- Find Transactions
- Transfer Funds
- Update Profile
- Bill Payment
- Request Loan
- Logout
- Full End-to-End Banking Journey

---

## 📁 Project Structure

```text
playwright-automation
│
├── .github
│   └── workflows
│       └── playwright.yml
│
├── src
│   │
│   ├── constants
│   │
│   ├── data
│   │   └── parabank
│   │
│   ├── fixtures
│   │
│   ├── helpers
│   │   └── parabankAuth.ts
│   │
│   ├── pages
│   │   │
│   │   ├── parabank
│   │   │   ├── AccountActivityPage.ts
│   │   │   ├── AccountsOverviewPage.ts
│   │   │   ├── BillPayPage.ts
│   │   │   ├── FindTransactionsPage.ts
│   │   │   ├── LoginPage.ts
│   │   │   ├── LogoutPage.ts
│   │   │   ├── OpenNewAccountPage.ts
│   │   │   ├── RegisterPage.ts
│   │   │   ├── RequestLoanPage.ts
│   │   │   ├── TransferFundsPage.ts
│   │   │   └── UpdateProfilePage.ts
│   │   │
│   │   └── saucedemo
│   │       ├── LoginPage.ts
│   │       ├── InventoryPage.ts
│   │       ├── CartPage.ts
│   │       ├── CheckoutPage.ts
│   │       └── CheckoutStepTwoPage.ts
│   │
│   └── utils
│
├── tests
│   │
│   ├── parabank
│   │   │
│   │   ├── accounts
│   │   │   ├── account-activity.spec.ts
│   │   │   ├── accounts-overview.spec.ts
│   │   │   ├── find-transactions.spec.ts
│   │   │   ├── open-new-account.spec.ts
│   │   │   ├── request-loan.spec.ts
│   │   │   └── update-profile.spec.ts
│   │   │
│   │   ├── auth
│   │   │   ├── empty-password.spec.ts
│   │   │   ├── empty-username-password.spec.ts
│   │   │   ├── empty-username.spec.ts
│   │   │   ├── invalid-login.spec.ts
│   │   │   ├── logout.spec.ts
│   │   │   ├── registration.spec.ts
│   │   │   └── successful-login.spec.ts
│   │   │
│   │   ├── bill-payment
│   │   │   └── bill-payment.spec.ts
│   │   │
│   │   ├── e2e
│   │   │   └── parabank-full-journey.spec.ts
│   │   │
│   │   └── transfer
│   │       └── transfer-funds.spec.ts
│   │
│   └── saucedemo
│       │
│       ├── authentication
│       │   ├── successful-login.spec.ts
│       │   ├── invalid-login.spec.ts
│       │   ├── empty-username.spec.ts
│       │   ├── empty-password.spec.ts
│       │   └── locked-user.spec.ts
│       │
│       ├── cart
│       │   └── cart.spec.ts
│       │
│       ├── checkout
│       │   ├── checkout.spec.ts
│       │   └── checkoutsteptwo.spec.ts
│       │
│       └── inventory
│           └── inventory.spec.ts
│
├── .gitignore
├── Jenkinsfile
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md
```

---

## 🔐 Dynamic Test User Strategy

ParaBank requires authenticated users for most banking workflows.

Instead of creating a completely new user for every authenticated test, the framework uses a temporary cached test user.

The helper checks whether a previously generated user is still valid before creating a new account.

The workflow is:

```text
Test Starts
    ↓
Check Cached User
    ↓
Is Cached User Still Valid?
    │
    ├── Yes
    │     ↓
    │   Login with Cached User
    │
    └── No
          ↓
      Create New User
          ↓
      Save User Credentials
          ↓
      Continue Test
```

The current cache duration is **30 minutes**.

Example usage:

```ts
const user = await getTestUser(page);
```

The helper handles:

- Checking the cached user
- Checking the cache duration
- Creating a new dynamic user when necessary
- Saving generated credentials locally
- Logging in with the existing user

The cached user file is excluded from Git using:

```text
.parabank-user.json
```

This prevents temporary credentials from being committed to the repository.

---

## 🔄 ParaBank Full End-to-End Journey

The project includes a complete end-to-end banking journey that simulates a user performing multiple banking operations in a single session.

The journey includes:

```text
Register Dynamic User
        ↓
Automatic Login
        ↓
Open New Account
        ↓
Update Profile
        ↓
Transfer Funds
        ↓
Request Loan
        ↓
Logout
```

The full journey is implemented in:

```text
tests/parabank/e2e/parabank-full-journey.spec.ts
```

This test validates that multiple banking features can work together as part of a complete user workflow.

---

## ▶️ Running Tests

Run all tests:

```bash
npx playwright test
```

Run ParaBank tests:

```bash
npx playwright test tests/parabank
```

Run SauceDemo tests:

```bash
npx playwright test tests/saucedemo
```

Run the ParaBank full end-to-end journey:

```bash
npx playwright test tests/parabank/e2e/parabank-full-journey.spec.ts
```

Run a specific test:

```bash
npx playwright test tests/parabank/accounts/request-loan.spec.ts
```

Run tests with one worker:

```bash
npx playwright test --workers=1
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run the full ParaBank journey in headed mode:

```bash
npx playwright test tests/parabank/e2e/parabank-full-journey.spec.ts --headed
```

---

## 📊 Test Report

After running the tests, open the Playwright HTML report:

```bash
npx playwright show-report
```

The report provides:

- Test execution results
- Passed and failed tests
- Execution duration
- Error details
- Screenshots and traces when configured

---

## 🏗️ Test Architecture

The project follows the **Page Object Model (POM)** architecture:

```text
Test Specification
        ↓
Page Object
        ↓
Locator & Action
        ↓
Application Under Test
```

Reusable authentication logic is separated into helpers:

```text
Test
  ↓
Helper
  ↓
Page Object
  ↓
Application
```

This approach improves:

- Code reusability
- Test maintainability
- Separation of concerns
- Scalability
- Readability

---

## 🔄 CI/CD

The project is configured to run automated tests using **GitHub Actions** and **Jenkins**.

The automation pipeline can execute Playwright tests after code changes are pushed to the repository.

The CI/CD workflow provides automated execution and reporting for the test suite.

> **Note:** ParaBank is an external public demo environment. CI failures caused by temporary service instability or Cloudflare rate limiting may occur independently of the automation framework.

---

## 📌 Current Test Coverage

### ParaBank

| Feature | Status |
|---|---|
| Registration | ✅ |
| Successful Login | ✅ |
| Invalid Login | ✅ |
| Empty Username | ✅ |
| Empty Password | ✅ |
| Empty Username & Password | ✅ |
| Logout | ✅ |
| Accounts Overview | ✅ |
| Account Activity | ✅ |
| Open New Account | ✅ |
| Find Transactions | ✅ |
| Update Profile | ✅ |
| Bill Payment | ✅ |
| Transfer Funds | ✅ |
| Request Loan | ✅ |
| Full End-to-End Journey | ✅ |

### SauceDemo

| Feature | Status |
|---|---|
| Authentication | ✅ |
| Inventory | ✅ |
| Cart | ✅ |
| Checkout | ✅ |

---

## 🎯 Project Goal

This project is part of a Software Quality Assurance Automation portfolio focused on building maintainable and scalable end-to-end test automation using:

- Playwright
- TypeScript
- Page Object Model
- Dynamic Test Data
- Reusable Helpers
- Test User Caching
- End-to-End Testing
- CI/CD
- GitHub Actions
- Jenkins
- Automated Reporting

The project demonstrates how automation testing can be structured to support multiple applications while maintaining clear separation between test suites, page objects, test data, and reusable helper utilities.