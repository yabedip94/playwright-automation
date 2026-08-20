# Playwright Automation

A scalable end-to-end test automation framework built with **Playwright** and **TypeScript**.

This project demonstrates UI automation testing using the **Page Object Model (POM)** design pattern across multiple web applications.

The framework currently covers authentication and banking workflows using **SauceDemo** and **ParaBank**.

---

## 🚀 Tech Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions
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
- Accounts Overview
- Account Activity
- Open New Account
- Transfer Funds

ParaBank uses dynamic user generation because test users and sessions may expire.

Each test can create a new user with a unique username using:

```ts
const username = `bediqa${Date.now()}`;
```

After registration, ParaBank automatically authenticates the newly created user, allowing authenticated workflows to continue within the same session.

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
│   │   │   ├── LoginPage.ts
│   │   │   ├── OpenNewAccountPage.ts
│   │   │   ├── RegisterPage.ts
│   │   │   └── TransferFundsPage.ts
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
│   │   ├── auth
│   │   │   ├── registration.spec.ts
│   │   │   ├── successful-login.spec.ts
│   │   │   ├── invalid-login.spec.ts
│   │   │   ├── empty-username.spec.ts
│   │   │   ├── empty-password.spec.ts
│   │   │   └── empty-username-password.spec.ts
│   │   │
│   │   └── accounts
│   │       ├── accounts-overview.spec.ts
│   │       ├── account-activity.spec.ts
│   │       ├── open-new-account.spec.ts
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
├── playwright.config.ts
├── package.json
├── package-lock.json
└── README.md
```

---

## 🔐 Dynamic User Strategy

ParaBank test users are generated dynamically to avoid issues with expired users or sessions.

The authentication helper handles user registration and provides generated credentials:

```ts
const user = await createUser(page);
```

The generated user can then be used for login scenarios:

```ts
await logoutUser(page);

await loginAsUser(
    page,
    user.username,
    user.password
);
```

For authenticated banking workflows, registration automatically creates an active session, so the test can continue directly without logging in again.

Example:

```text
Create Dynamic User
        ↓
Register
        ↓
Automatic Login
        ↓
Active Session
        ↓
Open Banking Feature
        ↓
Execute Test
```

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

Run a specific test:

```bash
npx playwright test tests/parabank/accounts/transfer-funds.spec.ts
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

---

## 📊 Test Report

After running the tests, open the Playwright HTML report:

```bash
npx playwright show-report
```

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

The project is configured to run automated tests using **GitHub Actions**.

The workflow can execute Playwright tests automatically after code changes are pushed to the repository.

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
| Accounts Overview | ✅ |
| Account Activity | ✅ |
| Open New Account | ✅ |
| Transfer Funds | ✅ |

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
- CI/CD
- Automated Reporting