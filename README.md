# Playwright Automation

A scalable end-to-end test automation framework built with **Playwright** and **TypeScript**.

This project demonstrates UI automation testing using the **Page Object Model (POM)** design pattern and covers key user workflows from authentication to checkout.

---

## 🚀 Tech Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions
- Page Object Model (POM)

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
│   ├── constants
│   │
│   ├── data
│   │   └── users.ts
│   │
│   ├── fixtures
│   │
│   ├── helpers
│   │
│   ├── pages
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   ├── CartPage.ts
│   │   ├── CheckoutPage.ts
│   │   └── CheckoutStepTwoPage.ts
│   │
│   └── utils
│
├── tests
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