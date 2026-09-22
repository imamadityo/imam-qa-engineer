# Database Testing

## Overview
Database testing memvalidasi integritas dan konsistensi data melalui SQL queries dan automated validation.

## SQL Queries

### Validation Queries (`sql-queries/validation-queries.sql`)
| # | Query Purpose | Type |
|---|---------------|------|
| 1 | Cek duplikasi user | Data Quality |
| 2 | Cek user tanpa password | Data Quality |
| 3 | Cek harga negatif | Business Rule |
| 4 | Cek harga range wajar | Business Rule |
| 5 | Cek stok negatif | Business Rule |
| 6 | Cek order total calculation | Calculation |
| 7 | Cek order tanpa item | Referential |
| 8 | Cek quantity valid | Business Rule |
| 9 | Cek checkout info lengkap | Completeness |
| 10 | Cek cart item orphan | Referential |

### Integrity Checks (`sql-queries/integrity-checks.sql`)
| # | Check Purpose | Type |
|---|---------------|------|
| 1 | Order items → valid order | Referential Integrity |
| 2 | Order items → valid product | Referential Integrity |
| 3 | Checkout → valid order | Referential Integrity |
| 4 | Status order valid | Domain Check |
| 5 | Format email valid | Format Check |
| 6 | Tanggal checkout > checkin | Business Rule |
| 7 | Total = sum items | Calculation |
| 8 | Cart badge count match | Consistency |

## Automated DB Validation (`tests/db-validation.spec.ts`)
| # | Test Case | Status |
|---|-----------|--------|
| 1 | Product count matches expected | ✅ |
| 2 | Product prices are positive | ✅ |
| 3 | Product names are not empty | ✅ |
| 4 | Sort order consistency | ✅ |
| 5 | Cart data integrity | ✅ |

## Tools
- SQL queries untuk manual validation
- Playwright untuk automated UI-based data validation
