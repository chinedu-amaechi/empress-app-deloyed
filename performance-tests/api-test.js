// performance-tests/api-test.js
import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

const errorRate = new Rate("errors");

export const options = {
  stages: [
    { duration: "10s", target: 10 }, // Ramp up to 10 users
    { duration: "30s", target: 50 }, // Ramp up to 50 users
    { duration: "1m", target: 50 }, // Stay at 50 users
    { duration: "20s", target: 0 }, // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ["p(95)<400"], // 95% of requests should be below 400ms
    errors: ["rate<0.05"], // Error rate should be less than 5%
  },
};

export default function () {
  const backendUrl = "https://empress-backend-dep.onrender.com";

  // Test products API
  const productsRes = http.get(`${backendUrl}/api/customer/products`);
  check(productsRes, {
    "products API returned 200": (r) => r.status === 200,
    "products API returned data": (r) =>
      r.json().data && r.json().data.length > 0,
  });

  // Test collections API
  const collectionsRes = http.get(`${backendUrl}/api/admin/collections`);
  check(collectionsRes, {
    "collections API returned 200": (r) => r.status === 200,
    "collections API returned data": (r) =>
      r.json().data && r.json().data.length > 0,
  });

  // Test search products (if implemented)
  const searchRes = http.get(
    `${backendUrl}/api/customer/products?search=bracelet`
  );
  check(searchRes, {
    "search API returned 200": (r) => r.status === 200,
  });

  // Add small sleep to avoid hammering the server
  sleep(1);
}
