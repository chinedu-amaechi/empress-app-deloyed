// performance-tests/load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Define metrics
const errorRate = new Rate('errors');

// Scenarios for different load patterns
export const options = {
  scenarios: {
    // Constant load scenario
    constant_request_load: {
      executor: 'constant-arrival-rate',
      rate: 30,                // 30 iterations per timeUnit
      timeUnit: '1m',          // 1 minute
      duration: '5m',          // 5 minutes
      preAllocatedVUs: 20,     // Pre-allocate 20 VUs
      maxVUs: 100,             // Maximum VUs to use if needed
    },
    
    // Ramp up load scenario
    ramp_up_load: {
      executor: 'ramping-arrival-rate',
      startRate: 5,            // Start at 5 iterations per timeUnit
      timeUnit: '1m',          // 1 minute
      preAllocatedVUs: 5,
      maxVUs: 50,
      stages: [
        { target: 20, duration: '2m' },  // Ramp up to 20 iterations per minute over 2 minutes
        { target: 20, duration: '3m' },  // Stay at 20 iterations per minute for 3 minutes
        { target: 0, duration: '1m' },   // Ramp down to 0 iterations per minute over 1 minute
      ],
    },
    
    // Stress test scenario
    stress_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '2m', target: 50 },   // Ramp up to 50 users over 2 minutes
        { duration: '5m', target: 50 },   // Stay at 50 users for 5 minutes
        { duration: '2m', target: 100 },  // Ramp up to 100 users over 2 minutes
        { duration: '5m', target: 100 },  // Stay at 100 users for 5 minutes
        { duration: '1m', target: 0 },    // Ramp down to 0 users over 1 minute
      ],
    },
  },
  thresholds: {
    'http_req_duration': ['p(95)<1000'],   // 95% of requests should be below 1s
    'http_req_failed': ['rate<0.05'],     // Less than 5% of requests should fail
  },
};

// Main test function
export default function() {
  const baseUrl = 'http://localhost:3000';
  
  // Select a page at random
  const pages = [
    '/',                    // Homepage
    '/products',            // Products page
    '/collections',         // Collections page
    '/about-us',            // About page
    '/faq',                 // FAQ page
  ];
  
  const randomPage = pages[Math.floor(Math.random() * pages.length)];
  
  // Visit the page
  const res = http.get(`${baseUrl}${randomPage}`);
  
  // Check if the request was successful
  const pageCheck = check(res, {
    'page loaded': (r) => r.status === 200,
  });
  
  // Count errors
  errorRate.add(!pageCheck);
  
  // Simulate user thinking time
  sleep(Math.random() * 3 + 1); // Random sleep between 1-4 seconds
}  