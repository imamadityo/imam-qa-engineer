# Imam - QA Engineer Portfolio

[![Playwright](https://img.shields.io/badge/Playwright-1.60-green.svg)](https://playwright.dev)
[![Postman](https://img.shields.io/badge/Postman-API-orange.svg)](https://www.postman.com)
[![OWASP](https://img.shields.io/badge/OWASP-Security-red.svg)](https://owasp.org)
[![K6](https://img.shields.io/badge/K6-Performance-blue.svg)](https://k6.io)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Overview

Portfolio QA Engineer yang mencakup **Manual Testing**, **API Testing**, **Web Automation**, **Mobile Testing**, **Database Testing**, **Security Testing**, dan **Performance Testing**.

## Tools & Technologies

| Category | Tools |
|----------|-------|
| Manual Testing | Test Plan, Test Cases, Bug Reports |
| API Testing | Postman, Newman |
| Web Automation | Playwright (TypeScript) |
| Mobile Testing | Playwright Device Emulation |
| Database Testing | SQL, Playwright Integration |
| Security Testing | OWASP ZAP, Burp Suite |
| Performance Testing | K6 |
| CI/CD | GitHub Actions |

## Project Structure

```
imam-qa-engineer/
├── .github/workflows/          # CI/CD pipeline
├── 01-Manual-Testing/          # Test plan, cases, bug reports
├── 02-API-Testing/             # Postman collections + Newman reports
├── 03-Web-Automation/          # Playwright POM tests
├── 04-Mobile-Testing/          # Mobile emulation tests
├── 05-Database-Testing/        # SQL queries + validation
├── 06-Security-Testing/        # OWASP scan + checklist
├── 07-Performance-Testing/     # K6 load tests
└── docs/                       # Documentation
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
git clone https://github.com/USERNAME/imam-qa-engineer.git
cd imam-qa-engineer
npm install
```

### Run Tests
```bash
# Web Automation
npx playwright test

# API Testing (Newman)
newman run 02-API-Testing/postman/collection.json

# Performance Testing
k6 run 07-Performance-Testing/k6/load-test.js
```

## Reports

| Report | Location |
|--------|----------|
| Playwright HTML Report | [View Report](./03-Web-Automation/playwright-report/index.html) |
| Newman API Report | [View Report](./02-API-Testing/newman/report.html) |
| OWASP ZAP Report | [View Report](./06-Security-Testing/owasp-zap/zap-report.html) |
| K6 Performance Report | [View Report](./07-Performance-Testing/reports/k6-summary.html) |

## CI/CD Pipeline

Tests run automatically on every push via GitHub Actions:

```yaml
# Trigger: push to main
# Jobs: Manual → API → Web → Mobile → DB → Security → Performance
```

## Contact

- **GitHub:** [USERNAME](https://github.com/USERNAME)
- **Email:** [EMAIL]

---

*Portfolio ini dibuat sebagai bukti kompetensi QA Engineer yang mencakup seluruh aspek testing.*
