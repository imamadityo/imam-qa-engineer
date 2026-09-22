import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const errorRate = new Rate('errors');
const responseTime = new Trend('response_time');

export const options = {
  stages: [
    { duration: '30s', target: 10 },  // Ramp up to 10 users
    { duration: '1m', target: 10 },   // Stay at 10 users
    { duration: '30s', target: 20 },  // Ramp up to 20 users
    { duration: '1m', target: 20 },   // Stay at 20 users
    { duration: '30s', target: 0 },   // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],  // 95% of requests under 2s
    errors: ['rate<0.1'],               // Error rate under 10%
  },
};

const BASE_URL = 'https://restful-booker.herokuapp.com';

export default function () {
  // Test 1: Get all bookings
  const getAllRes = http.get(`${BASE_URL}/booking`);
  check(getAllRes, {
    'GET /booking - status is 200': (r) => r.status === 200,
    'GET /booking - response time < 2s': (r) => r.timings.duration < 2000,
    'GET /booking - has body': (r) => r.body && r.body.length > 0,
  }) || errorRate.add(1);
  responseTime.add(getAllRes.timings.duration);

  sleep(1);

  // Test 2: Get booking by ID
  const getOneRes = http.get(`${BASE_URL}/booking/1`);
  check(getOneRes, {
    'GET /booking/1 - status is 200': (r) => r.status === 200,
    'GET /booking/1 - has firstname': (r) => {
      try {
        const body = JSON.parse(r.body as string);
        return body.firstname !== undefined;
      } catch {
        return false;
      }
    },
  }) || errorRate.add(1);
  responseTime.add(getOneRes.timings.duration);

  sleep(1);

  // Test 3: Create auth token
  const authRes = http.post(
    `${BASE_URL}/auth`,
    JSON.stringify({
      username: 'admin',
      password: 'password123',
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  check(authRes, {
    'POST /auth - status is 200': (r) => r.status === 200,
    'POST /auth - has token': (r) => {
      try {
        const body = JSON.parse(r.body as string);
        return body.token !== undefined;
      } catch {
        return false;
      }
    },
  }) || errorRate.add(1);
  responseTime.add(authRes.timings.duration);

  sleep(1);
}

export function handleSummary(data: any) {
  return {
    '07-Performance-Testing/reports/k6-summary.html': htmlReport(data),
  };
}

function htmlReport(data: any): string {
  const metrics = data.metrics;
  return `
<!DOCTYPE html>
<html>
<head>
  <title>K6 Performance Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; }
    h1 { color: #333; }
    .metric { margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 5px; }
    .metric h3 { margin: 0 0 10px 0; }
    .value { font-size: 24px; font-weight: bold; color: #2196F3; }
    .pass { color: #4CAF50; }
    .fail { color: #f44336; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
    th { background: #2196F3; color: white; }
  </style>
</head>
<body>
  <h1>K6 Performance Test Report</h1>
  <p>Date: ${new Date().toISOString()}</p>

  <div class="metric">
    <h3>Total Requests</h3>
    <div class="value">${metrics.http_reqs?.values?.count || 0}</div>
  </div>

  <div class="metric">
    <h3>Average Response Time</h3>
    <div class="value">${(metrics.http_req_duration?.values?.avg || 0).toFixed(2)}ms</div>
  </div>

  <div class="metric">
    <h3>95th Percentile Response Time</h3>
    <div class="value ${(metrics.http_req_duration?.values?.['p(95)'] || 0) < 2000 ? 'pass' : 'fail'}">
      ${(metrics.http_req_duration?.values?.['p(95)'] || 0).toFixed(2)}ms
    </div>
  </div>

  <div class="metric">
    <h3>Error Rate</h3>
    <div class="value ${((metrics.errors?.values?.rate || 0) * 100) < 10 ? 'pass' : 'fail'}">
      ${((metrics.errors?.values?.rate || 0) * 100).toFixed(2)}%
    </div>
  </div>

  <h2>Thresholds</h2>
  <table>
    <tr><th>Metric</th><th>Threshold</th><th>Actual</th><th>Status</th></tr>
    <tr>
      <td>Response Time (p95)</td>
      <td>&lt; 2000ms</td>
      <td>${(metrics.http_req_duration?.values?.['p(95)'] || 0).toFixed(2)}ms</td>
      <td class="${(metrics.http_req_duration?.values?.['p(95)'] || 0) < 2000 ? 'pass' : 'fail'}">
        ${(metrics.http_req_duration?.values?.['p(95)'] || 0) < 2000 ? 'PASS' : 'FAIL'}
      </td>
    </tr>
    <tr>
      <td>Error Rate</td>
      <td>&lt; 10%</td>
      <td>${((metrics.errors?.values?.rate || 0) * 100).toFixed(2)}%</td>
      <td class="${((metrics.errors?.values?.rate || 0) * 100) < 10 ? 'pass' : 'fail'}">
        ${((metrics.errors?.values?.rate || 0) * 100) < 10 ? 'PASS' : 'FAIL'}
      </td>
    </tr>
  </table>
</body>
</html>`;
}