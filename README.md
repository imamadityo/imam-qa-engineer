# Imam - QA Engineer Portfolio

[![Playwright Tests](https://img.shields.io/badge/Playwright-42%20Tests-2EA44F.svg)](https://playwright.dev)
[![Newman API](https://img.shields.io/badge/Newman-28%20Assertions-FF6C37.svg)](https://www.postman.com)
[![OWASP](https://img.shields.io/badge/OWASP-Top%2010-00549E.svg)](https://owasp.org)
[![K6](https://img.shields.io/badge/K6-Load%20Test-7D64FF.svg)](https://k6.io)
[![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF.svg)](https://github.com/features/actions)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Overview

Portfolio QA Engineer yang mencakup **Manual Testing**, **API Testing**, **Web Automation**, **Mobile Testing**, **Database Testing**, **Security Testing**, dan **Performance Testing**.

## Test Results Summary

| Category | Tool | Tests | Status |
|----------|------|-------|--------|
| Web Automation | Playwright | 20 tests | ✅ All Pass |
| Mobile Testing | Playwright Emulation | 9 tests (3 devices + 6 breakpoints) | ✅ All Pass |
| API Testing | Newman | 10 requests, 28 assertions | ✅ All Pass |
| Security Testing | Playwright | 5 tests (SQLi, XSS, Session, etc.) | ✅ All Pass |
| Database Testing | Playwright | 5 tests (validation, integrity) | ✅ All Pass |
| Manual Testing | Documentation | 20 test cases, 5 bug reports | ✅ Complete |
| Performance | K6 | Load test script | ✅ Ready |
| CI/CD | GitHub Actions | Auto-run on push | ✅ Configured |

**Total: 42 automated tests + 28 API assertions = ALL PASS**

## Tools & Technologies

| Category | Tools |
|----------|-------|
| Manual Testing | Test Plan, Test Cases, Bug Reports |
| API Testing | Postman, Newman |
| Web Automation | Playwright (TypeScript) + POM Pattern |
| Mobile Testing | Playwright Device Emulation (iPhone, Pixel, iPad) |
| Database Testing | SQL Queries + Playwright Validation |
| Security Testing | OWASP ZAP, Security Payloads |
| Performance Testing | K6 Load Testing |
| CI/CD | GitHub Actions |

## Project Structure

```
imam-qa-engineer/
├── .github/workflows/          # CI/CD pipeline (auto-run tests)
├── 01-Manual-Testing/          # Test plan, 20 test cases, 5 bug reports
├── 02-API-Testing/             # Postman collection + Newman HTML report
├── 03-Web-Automation/          # Playwright POM (4 pages, 20 tests)
│   └── tests/
│       ├── pages/              # Page Object Model (LoginPage, InventoryPage, CartPage, CheckoutPage)
│       ├── specs/              # 42 test specs (web, mobile, security, db)
│       └── fixtures/           # Test data
├── 04-Mobile-Testing/          # Mobile emulation tests (iPhone, Pixel, iPad)
├── 05-Database-Testing/        # SQL queries + automated validation
├── 06-Security-Testing/        # OWASP Top 10 + security payloads
├── 07-Performance-Testing/     # K6 load test scripts
└── docs/                       # Setup guide
```

## Applications Under Test

| Application | Purpose | URL |
|-------------|---------|-----|
| Saucedemo | Web UI + Manual + Mobile | [saucedemo.com](https://www.saucedemo.com) |
| Restful Booker | API Testing | [restful-booker.herokuapp.com](https://restful-booker.herokuapp.com) |
| OWASP Juice Shop | Security Testing | [owasp.org/juice-shop](https://owasp.org/www-project-juice-shop/) |

## Quick Start

### Prerequisites
- Node.js >= 18
- npm >= 9
- Git

### Installation
```bash
git clone https://github.com/imamadityo/imam-qa-engineer.git
cd imam-qa-engineer/03-Web-Automation
npm install
npx playwright install
```

### Run Tests
```bash
# All Playwright tests (42 tests)
cd 03-Web-Automation
npx playwright test

# Web automation only
npx playwright test tests/specs/login.spec.ts tests/specs/inventory.spec.ts tests/specs/cart.spec.ts tests/specs/checkout.spec.ts

# Mobile tests only
npx playwright test tests/specs/mobile.spec.ts

# Security tests only
npx playwright test tests/specs/security.spec.ts

# API Testing (Newman)
cd ../..
npx newman run 02-API-Testing/postman/RestfulBooking.postman_collection.json -e 02-API-Testing/postman/Staging.postman_environment.json

# Performance Testing (requires K6)
k6 run 07-Performance-Testing/k6/load-test.js
```

## Test Coverage Details

### Web Automation (20 tests)
| Feature | Tests | Coverage |
|---------|-------|----------|
| Login | 5 | Valid, invalid, empty fields, locked user |
| Products | 5 | List, sort A-Z, Z-A, price low-high, high-low |
| Cart | 4 | Add single, multiple, remove, badge count |
| Checkout | 6 | Valid, empty fields, tax calculation, complete order |

### Mobile Testing (9 tests)
| Device | Tests |
|--------|-------|
| iPhone 13 | Login, Touch, Navigation |
| Pixel 5 | Login, Touch |
| iPad Air | Login |
| Responsive | 6 breakpoints (320px → 1920px) |

### API Testing (28 assertions)
| Endpoint | Method | Assertions |
|----------|--------|------------|
| /auth | POST | Status 200, has token |
| /booking | GET | Status 200, is array, has bookingid |
| /booking/:id | GET | Status 200, has details |
| /booking | POST | Status 200, has bookingid, correct data |
| /booking/:id | PUT | Status 200, updated data |
| /booking/:id | PATCH | Status 200, partial update |
| /booking/:id | DELETE | Status 201 |
| Negative | Various | 404, 500, 403 |

### Security Testing (5 tests)
- SQL Injection (5 payloads)
- XSS (5 payloads)
- Session Management (logout → direct access)
- Direct URL Access (3 protected pages)
- Input Boundary (10000 char string)

### OWASP Top 10 Coverage
| Category | Status |
|----------|--------|
| A01: Broken Access Control | ✅ Tested |
| A02: Cryptographic Failures | ✅ Tested |
| A03: Injection (SQLi, XSS) | ✅ Tested |
| A04: Insecure Design | ⚠️ Warning |
| A05: Security Misconfiguration | ⚠️ Warning |
| A06: Vulnerable Components | ℹ️ Info |
| A07: Auth Failures | ⚠️ Warning |
| A08: Data Integrity | ✅ Tested |
| A09: Logging & Monitoring | ℹ️ Info |
| A10: SSRF | ✅ Tested |

## Page Object Model (POM)

```
LoginPage        → login(), goto(), getErrorMessage()
InventoryPage    → addProductByName(), sortBy(), goToCart(), getCartBadgeCount(), logout()
CartPage         → getCartItemCount(), removeItemByName(), goToCheckout(), continueShopping()
CheckoutPage     → fillInformation(), continueToOverview(), finishOrder(), getTotal()
```

## CI/CD Pipeline

Tests run automatically on every push via GitHub Actions:

```yaml
Trigger: push to main
Jobs:
  - Web Automation (Playwright) → 20 tests
  - Mobile Testing (Emulation) → 9 tests
  - API Testing (Newman) → 28 assertions
  - Security Testing → 5 tests
```

## Reports

| Report | Location |
|--------|----------|
| Playwright HTML Report | `03-Web-Automation/playwright-report/index.html` |
| Newman API Report | `02-API-Testing/newman/report.html` |

## Contact

- **GitHub:** [imamadityo](https://github.com/imamadityo)

---

*Portfolio ini dibuat sebagai bukti kompetensi QA Engineer yang mencakup seluruh aspek testing: Manual, API, Web, Mobile, Database, Security, dan Performance.*
