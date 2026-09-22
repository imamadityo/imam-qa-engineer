# Setup Guide

## Prerequisites

### Required Software
| Software | Version | Download |
|----------|---------|----------|
| Node.js | >= 18 | [nodejs.org](https://nodejs.org) |
| Git | >= 2.0 | [git-scm.com](https://git-scm.com) |
| VS Code | Latest | [code.visualstudio.com](https://code.visualstudio.com) |

### Optional Software
| Software | Purpose | Download |
|----------|---------|----------|
| Postman | API Testing UI | [postman.com](https://www.postman.com) |
| OWASP ZAP | Security Scanning | [zaproxy.org](https://www.zaproxy.org) |
| K6 | Performance Testing | [k6.io](https://k6.io) |

## Installation

### 1. Clone Repository
```bash
git clone https://github.com/USERNAME/imam-qa-engineer.git
cd imam-qa-engineer
```

### 2. Install Web Automation Dependencies
```bash
cd 03-Web-Automation
npm install
npx playwright install
```

### 3. Install Global Tools
```bash
npm install -g newman newman-reporter-htmlextra k6
```

## Running Tests

### Web Automation (Playwright)
```bash
cd 03-Web-Automation
npm test                    # Run all tests
npm run test:headed         # Run with browser visible
npm run test:debug          # Run in debug mode
npm run report              # View HTML report
```

### API Testing (Newman)
```bash
newman run 02-API-Testing/postman/RestfulBooking.postman_collection.json \
  -e 02-API-Testing/postman/Staging.postman_environment.json \
  --reporters cli,htmlextra \
  --reporter-htmlextra-export 02-API-Testing/newman/report.html
```

### Mobile Testing
```bash
cd 03-Web-Automation
npx playwright test ../04-Mobile-Testing/tests/
```

### Security Testing
```bash
cd 03-Web-Automation
npx playwright test ../06-Security-Testing/tests/
```

### Performance Testing (K6)
```bash
k6 run 07-Performance-Testing/k6/load-test.js
```

## Project Structure
```
imam-qa-engineer/
├── 01-Manual-Testing/     # Test documentation
├── 02-API-Testing/        # Postman + Newman
├── 03-Web-Automation/     # Playwright tests
├── 04-Mobile-Testing/     # Mobile emulation
├── 05-Database-Testing/   # SQL validation
├── 06-Security-Testing/   # OWASP testing
├── 07-Performance-Testing/# K6 load tests
└── docs/                  # This file
```

## Troubleshooting

### Playwright browsers not found
```bash
npx playwright install
```

### Newman command not found
```bash
npm install -g newman
```

### K6 not recognized
```bash
# Windows (via Chocolatey)
choco install k6

# Or download from https://k6.io
```
