// performance-tests/homepage-test.js
import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

// Custom metric for failures
const errorRate = new Rate("errors");

// Test configuration
export const options = {
  stages: [
    { duration: "30s", target: 20 }, // Ramp up to 20 users over 30 seconds
    { duration: "1m", target: 20 }, // Stay at 20 users for 1 minute
    { duration: "30s", target: 0 }, // Ramp down to 0 users over 30 seconds
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% of requests should be below 500ms
    errors: ["rate<0.1"], // Error rate should be less than 10%
  },
};

export default function () {
  // Visit the homepage
  const homeRes = http.get("http://localhost:3000");

  // Check if the request was successful
  const homeCheck = check(homeRes, {
    "homepage status is 200": (r) => r.status === 200,
    "homepage contains expected content": (r) => r.body.includes("Collections"),
  });

  // Count errors
  errorRate.add(!homeCheck);

  // Sleep between each iteration to simulate real user behavior
  sleep(3);
}
