# API Testing - Restful Booker

## Overview
API testing menggunakan **Postman** untuk collection dan **Newman** untuk CLI execution.

## Applications Under Test
| API | URL | Documentation |
|-----|-----|---------------|
| Restful Booker | https://restful-booker.herokuapp.com | [API Docs](https://restful-booker.herokuapp.com/apidoc/index.html) |

## Test Scenarios

### Authentication
| # | Endpoint | Method | Test Scenario |
|---|----------|--------|---------------|
| 1 | /auth | POST | Create token dengan valid credentials |
| 2 | /auth | POST | Create token dengan invalid credentials |

### Booking CRUD
| # | Endpoint | Method | Test Scenario |
|---|----------|--------|---------------|
| 3 | /booking | GET | Get all bookings |
| 4 | /booking/:id | GET | Get booking by valid ID |
| 5 | /booking | POST | Create new booking |
| 6 | /booking/:id | PUT | Update booking (full) |
| 7 | /booking/:id | PATCH | Update booking (partial) |
| 8 | /booking/:id | DELETE | Delete booking |

### Negative Tests
| # | Endpoint | Method | Test Scenario |
|---|----------|--------|---------------|
| 9 | /booking/99999 | GET | Get booking dengan invalid ID |
| 10 | /booking | POST | Create booking dengan invalid body |
| 11 | /booking/:id | PUT | Update booking tanpa auth |

## How to Run

### Via Postman
1. Import `postman/RestfulBooking.postman_collection.json`
2. Import `postman/Staging.postman_environment.json`
3. Run collection via Postman Runner

### Via Newman (CLI)
```bash
newman run 02-API-Testing/postman/RestfulBooking.postman_collection.json \
  -e 02-API-Testing/postman/Staging.postman_environment.json \
  --reporters cli,htmlextra \
  --reporter-htmlextra-export 02-API-Testing/newman/report.html
```

## Test Assertions
- Status codes (200, 201, 403, 404, 500)
- Response time < 2000ms
- Response body structure validation
- Data integrity checks

## Reports
- Newman HTML Report: `newman/report.html`
