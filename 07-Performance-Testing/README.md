# Performance Testing - K6

## Overview
Performance testing menggunakan **K6** untuk load testing API endpoints.

## Application Under Test
| API | URL |
|-----|-----|
| Restful Booker | https://restful-booker.herokuapp.com |

## Load Test Configuration

| Stage | Duration | Virtual Users |
|-------|----------|---------------|
| Ramp Up | 30s | 0 → 10 |
| Steady State | 1m | 10 |
| Ramp Up | 30s | 10 → 20 |
| Steady State | 1m | 20 |
| Ramp Down | 30s | 20 → 0 |

**Total Duration:** 3.5 minutes

## Thresholds

| Metric | Threshold | Description |
|--------|-----------|-------------|
| Response Time (p95) | < 2000ms | 95% of requests must complete under 2s |
| Error Rate | < 10% | Error rate must be under 10% |

## Test Scenarios

| # | Endpoint | Method | Description |
|---|----------|--------|-------------|
| 1 | /booking | GET | Get all bookings |
| 2 | /booking/1 | GET | Get specific booking |
| 3 | /auth | POST | Create authentication token |

## How to Run

```bash
# Install K6
npm install -g k6

# Run load test
k6 run 07-Performance-Testing/k6/load-test.js

# View report
open 07-Performance-Testing/reports/k6-summary.html
```

## Reports
- HTML Report: `reports/k6-summary.html`
- Console output with real-time metrics
