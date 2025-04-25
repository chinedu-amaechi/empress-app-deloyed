// performance-tests/summary.js
import http from "k6/http";
import { check, sleep, group } from "k6";
import { Rate } from "k6/metrics";

// Define metrics
const errorRate = new Rate("errors");

// Test configuration
export const options = {
  vus: 5,
  duration: "1m",
  thresholds: {
    "http_req_duration{page:homepage}": ["p(95)<800"],
    "http_req_duration{page:products}": ["p(95)<800"],
    "http_req_duration{page:collections}": ["p(95)<800"],
    "http_req_duration{page:about}": ["p(95)<800"],
    "http_req_duration{page:api}": ["p(95)<500"],
  },
};

export default function () {
  const baseUrl = "http://localhost:3000";
  const apiUrl = "https://empress-backend-dep.onrender.com";

  // Homepage
  group("homepage", function () {
    const res = http.get(baseUrl, {
      tags: { page: "homepage" },
    });
    check(res, {
      "homepage is ok": (r) => r.status === 200,
    });
    sleep(1);
  });

  // Products page
  group("products", function () {
    const res = http.get(`${baseUrl}/products`, {
      tags: { page: "products" },
    });
    check(res, {
      "products page is ok": (r) => r.status === 200,
    });
    sleep(1);
  });

  // Collections page
  group("collections", function () {
    const res = http.get(`${baseUrl}/collections`, {
      tags: { page: "collections" },
    });
    check(res, {
      "collections page is ok": (r) => r.status === 200,
    });
    sleep(1);
  });

  // About page
  group("about", function () {
    const res = http.get(`${baseUrl}/about-us`, {
      tags: { page: "about" },
    });
    check(res, {
      "about page is ok": (r) => r.status === 200,
    });
    sleep(1);
  });

  // API endpoints
  group("api", function () {
    const res = http.get(`${apiUrl}/api/customer/products`, {
      tags: { page: "api" },
    });
    check(res, {
      "products api is ok": (r) => r.status === 200,
    });
  });
}
