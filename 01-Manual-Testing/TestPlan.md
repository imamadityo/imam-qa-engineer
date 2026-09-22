# Test Plan - Saucedemo Checkout Flow

## 1. Introduction

### 1.1 Objective
Menguji fungsionalitas checkout flow pada aplikasi Saucedemo (saucedemo.com) untuk memastikan proses pembelian berjalan sesuai expected.

### 1.2 Scope
- Login functionality
- Product selection & cart management
- Checkout information form
- Checkout overview & completion
- Error handling scenarios

### 1.3 Out of Scope
- Performance testing
- Security testing (dibahas di bagian terpisah)
- Payment gateway integration

## 2. Test Strategy

### 2.1 Testing Types
- Functional Testing
- UI/UX Testing
- Negative Testing
- Boundary Testing

### 2.2 Entry Criteria
- Aplikasi Saucedemo dapat diakses
- Test environment stabil
- Test cases telah direview

### 2.3 Exit Criteria
- Semua test case telah dieksekusi
- Critical/High severity bugs telah dilaporkan
- Test report telah dibuat

## 3. Test Environment

| Item | Detail |
|------|--------|
| URL | https://www.saucedemo.com |
| Browser | Chrome, Firefox, Edge |
| Resolution | 1920x1080, 1366x768 |
| Test Account | standard_user / secret_sauce |

## 4. Features to Test

| # | Feature | Priority |
|---|---------|----------|
| 1 | Login (valid/invalid credentials) | High |
| 2 | Product listing & sorting | Medium |
| 3 | Add to cart / Remove from cart | High |
| 4 | Checkout information form | High |
| 5 | Checkout overview (totals calculation) | High |
| 6 | Order completion | High |
| 7 | Logout | Medium |

## 5. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Aplikasi down | Gunakan test data yang sudah disiapkan |
| Test data berubah | Gunakan akun test terpisah |
| Browser compatibility | Test di minimal 2 browser |

## 6. Schedule

| Activity | Duration |
|----------|----------|
| Test case preparation | 30 menit |
| Test execution | 45 menit |
| Bug reporting | 15 menit |
| Test report | 15 menit |

## 7. Deliverables
- [x] Test Plan (dokumen ini)
- [x] Test Cases (20 test cases)
- [x] Bug Reports (5 bugs)
- [x] Test Execution Report
