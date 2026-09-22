# Web Automation - Playwright

## Overview
Web automation testing menggunakan **Playwright** dengan **TypeScript** dan **Page Object Model (POM)** pattern.

## Architecture

```
tests/
├── pages/           # Page Object Model
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── specs/           # Test files
│   ├── login.spec.ts
│   ├── inventory.spec.ts
│   ├── cart.spec.ts
│   └── checkout.spec.ts
└── fixtures/        # Test data
    └── test-data.json
```

## Page Object Model (POM)
Setiap halaman memiliki class yang merepresentasikan:
- **Locators** - Element selectors
- **Methods** - Actions yang bisa dilakukan
- **Assertions** - Validasi yang bisa dilakukan

## Test Coverage

| Feature | Test Cases | File |
|---------|------------|------|
| Login | 5 tests | login.spec.ts |
| Products | 5 tests | inventory.spec.ts |
| Cart | 4 tests | cart.spec.ts |
| Checkout | 6 tests | checkout.spec.ts |
| **Total** | **20 tests** | |

## How to Run

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run with browser visible
npm run test:headed

# Run with UI mode
npm run test:ui

# Run in debug mode
npm run test:debug

# View HTML report
npm run report
```

## Reports
- HTML Report: `playwright-report/index.html`
- Screenshots on failure: `test-results/`
- Videos on failure: `test-results/`
