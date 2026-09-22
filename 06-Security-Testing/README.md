# Security Testing

## Overview
Security testing mencakup OWASP Top 10 checklist dan automated security payloads.

## Applications Under Test
| Application | URL | Purpose |
|-------------|-----|---------|
| Saucedemo | saucedemo.com | Web security testing |
| OWASP Juice Shop | owasp.org/juice-shop | Advanced security testing |

## OWASP Top 10 Coverage

| # | Category | Status | Details |
|---|----------|--------|---------|
| A01 | Broken Access Control | ✅ Tested | Direct URL access, privilege escalation |
| A02 | Cryptographic Failures | ✅ Tested | HTTPS, data exposure |
| A03 | Injection | ✅ Tested | SQLi, XSS payloads |
| A04 | Insecure Design | ⚠️ Warning | Rate limiting, account lockout |
| A05 | Security Misconfiguration | ⚠️ Warning | Default credentials, error messages |
| A06 | Vulnerable Components | ℹ️ Info | Requires deeper scan |
| A07 | Auth Failures | ⚠️ Warning | Brute force, password policy |
| A08 | Data Integrity | ✅ Tested | Checkout validation |
| A09 | Logging & Monitoring | ℹ️ Info | Server-side verification needed |
| A10 | SSRF | ✅ Tested | No URL input fields |

**See detailed checklist:** `owasp-top10-checklist.md`

## Automated Security Tests

### File: `tests/security-api.spec.ts`

| # | Test | Payloads | Status |
|---|------|----------|--------|
| 1 | SQL Injection | 5 payloads | ✅ |
| 2 | XSS | 5 payloads | ✅ |
| 3 | Session Management | Logout → direct access | ✅ |
| 4 | Direct URL Access | 3 protected pages | ✅ |
| 5 | Input Boundary | 10000 char string | ✅ |

## Tools Used

| Tool | Purpose | Type |
|------|---------|------|
| OWASP ZAP | DAST scanning | Automated |
| Playwright | Security payload testing | Automated |
| Browser DevTools | Manual inspection | Manual |

## How to Run

```bash
# Run security tests
npx playwright test 06-Security-Testing/tests/

# OWASP ZAP baseline scan (requires ZAP installed)
zap-cli quick-scan --self-contained https://www.saucedemo.com
```

## Recommendations
1. Implement rate limiting pada login
2. Add CAPTCHA setelah failed attempts
3. Enforce password complexity
4. Reduce error message detail
5. Implement CSP headers
