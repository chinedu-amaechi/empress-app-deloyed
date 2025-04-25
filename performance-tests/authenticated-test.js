// performance-tests/authenticated-test.js
import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";
import { SharedArray } from "k6/data";

const errorRate = new Rate("errors");

// Create a pool of test users (you would load this from a file in real tests)
const users = new SharedArray("users", function () {
  return [
    { email: "test1@example.com", password: "Password123!" },
    { email: "test2@example.com", password: "Password123!" },
    // Add more test users as needed
  ];
});

export const options = {
  stages: [
    { duration: "1m", target: 10 }, // Ramp up to 10 authenticated users
    { duration: "2m", target: 10 }, // Stay at 10 users
    { duration: "30s", target: 0 }, // Ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<800"], // 95% of requests should be below 800ms
    errors: ["rate<0.1"], // Error rate should be less than 10%
  },
};

export default function () {
  const backendUrl = "https://empress-backend-dep.onrender.com";

  // Select a random user
  const user = users[Math.floor(Math.random() * users.length)];

  // Log in to get auth token
  const loginRes = http.post(
    `${backendUrl}/api/auth/login/customer`,
    JSON.stringify({
      email: user.email,
      password: user.password,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  const loginCheck = check(loginRes, {
    "login successful": (r) => r.status === 200 && r.json().data.token,
  });

  if (!loginCheck) {
    errorRate.add(true);
    sleep(3);
    return;
  }

  // Extract token from response
  const token = loginRes.json().data.token;

  // Test authenticated endpoints with the token
  const authHeaders = {
    Authorization: token,
    "Content-Type": "application/json",
  };

  // Get user profile
  const profileRes = http.get(`${backendUrl}/api/customer/profile`, {
    headers: authHeaders,
  });

  check(profileRes, {
    "profile request successful": (r) => r.status === 200,
  });

  // Get cart items
  const cartRes = http.get(`${backendUrl}/api/customer/cart`, {
    headers: authHeaders,
  });

  check(cartRes, {
    "cart request successful": (r) => r.status === 200,
  });

  // Add to cart (optional)
  /*
  const addToCartRes = http.post(`${backendUrl}/api/customer/cart`, JSON.stringify({
    productId: 'product123',
    quantity: 1
  }), {
    headers: authHeaders,
  });
  
  check(addToCartRes, {
    'add to cart successful': (r) => r.status === 200,
  });
  */

  sleep(3);
}
