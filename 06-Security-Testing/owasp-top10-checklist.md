# OWASP Top 10 Checklist - Security Testing

## Target Application
- **URL:** https://www.saucedemo.com
- **Tool:** OWASP ZAP (Baseline Scan)
- **Date:** 2026-09-22

---

## OWASP Top 10 (2021) Checklist

### A01:2021 - Broken Access Control
| # | Test Case | Status | Evidence |
|---|-----------|--------|----------|
| 1 | Direct access to admin page tanpa auth | ✅ Tested | Tidak bisa akses /inventory.html tanpa login |
| 2 | Access other user's data | ✅ Tested | Data user ter-isolate |
| 3 | Privilege escalation | ✅ Tested | Tidak ada endpoint admin yang bisa diakses |
| 4 | IDOR (Insecure Direct Object Reference) | ✅ Tested | URL tidak expose user ID |

### A02:2021 - Cryptographic Failures
| # | Test Case | Status | Evidence |
|---|-----------|--------|----------|
| 1 | Password transmitted over HTTPS | ✅ Tested | Site menggunakan HTTPS |
| 2 | Sensitive data in URL | ✅ Tested | Tidak ada password/token di URL |
| 3 | Cache control untuk sensitive data | ✅ Tested | Headers appropriate |

### A03:2021 - Injection
| # | Test Case | Status | Evidence |
|---|-----------|--------|----------|
| 1 | SQL Injection di login form | ✅ Tested | Input `' OR 1=1--` ditolak |
| 2 | XSS di input fields | ✅ Tested | Input `<script>alert(1)</script>` di-escape |
| 3 | Command Injection | ✅ Tested | Tidak ada endpoint vulnerable |

### A04:2021 - Insecure Design
| # | Test Case | Status | Evidence |
|---|-----------|--------|----------|
| 1 | Rate limiting pada login | ⚠️ Not Found | Tidak ada rate limiting terdeteksi |
| 2 | Account lockout setelah failed attempts | ⚠️ Not Found | locked_out_user adalah user biasa, bukan lockout mechanism |
| 3 | Input validation | ✅ Tested | Form memiliki validasi |

### A05:2021 - Security Misconfiguration
| # | Test Case | Status | Evidence |
|---|-----------|--------|----------|
| 1 | Default credentials | ⚠️ Found | `standard_user` / `secret_sauce` adalah default |
| 2 | Error messages expose info | ⚠️ Found | Error message cukup detail |
| 3 | Security headers | ✅ Tested | Headers present |

### A06:2021 - Vulnerable and Outdated Components
| # | Test Case | Status | Evidence |
|---|-----------|--------|----------|
| 1 | Library versions | ℹ️ Info | Perlu scan lebih dalam |
| 2 | Known CVEs | ℹ️ Info | Perlu scan lebih dalam |

### A07:2021 - Identification and Authentication Failures
| # | Test Case | Status | Evidence |
|---|-----------|--------|----------|
| 1 | Brute force protection | ⚠️ Not Found | Tidak ada CAPTCHA atau rate limit |
| 2 | Session management | ✅ Tested | Session invalidate setelah logout |
| 3 | Password policy | ⚠️ Not Found | Tidak ada password complexity requirement |

### A08:2021 - Software and Data Integrity Failures
| # | Test Case | Status | Evidence |
|---|-----------|--------|----------|
| 1 | CI/CD pipeline security | ℹ️ Info | Tidak ada CI/CD publik |
| 2 | Data tampering | ✅ Tested | Checkout data ter-validasi |

### A09:2021 - Security Logging and Monitoring Failures
| # | Test Case | Status | Evidence |
|---|-----------|--------|----------|
| 1 | Login attempt logging | ℹ️ Info | Tidak dapat verifikasi dari sisi client |
| 2 | Error logging | ℹ️ Info | Tidak dapat verifikasi dari sisi client |

### A10:2021 - Server-Side Request Forgery (SSRF)
| # | Test Case | Status | Evidence |
|---|-----------|--------|----------|
| 1 | URL input validation | ✅ Tested | Tidak ada URL input field |

---

## Summary

| Category | Tested | Passed | Warning | Info |
|----------|--------|--------|---------|------|
| A01: Broken Access Control | 4 | 4 | 0 | 0 |
| A02: Cryptographic Failures | 3 | 3 | 0 | 0 |
| A03: Injection | 3 | 3 | 0 | 0 |
| A04: Insecure Design | 3 | 1 | 2 | 0 |
| A05: Security Misconfiguration | 3 | 1 | 2 | 0 |
| A06: Vulnerable Components | 2 | 0 | 0 | 2 |
| A07: Auth Failures | 3 | 1 | 2 | 0 |
| A08: Data Integrity | 2 | 1 | 0 | 1 |
| A09: Logging & Monitoring | 2 | 0 | 0 | 2 |
| A10: SSRF | 1 | 1 | 0 | 0 |
| **Total** | **26** | **15** | **6** | **5** |

## Recommendations
1. Implement rate limiting pada login endpoint
2. Add CAPTCHA setelah 3 failed attempts
3. Enforce password complexity requirements
4. Reduce error message detail level
5. Remove default credentials documentation dari public
