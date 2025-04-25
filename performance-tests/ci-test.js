// apps/empress-app/performance-tests/summary.js
import http from "k6/http";
import { check, sleep, group } from "k6";
import { Trend } from "k6/metrics";
import { config } from "./config.js";

// Custom metrics for each page type
const homepageTime = new Trend("homepage_time");
const collectionsTime = new Trend("collections_time");
const productPageTime = new Trend("product_page_time");
const cartPageTime = new Trend("cart_page_time");

export let options = {
  vus: 5,
  duration: "1m",
  thresholds: config.thresholds,
  summaryTrendStats: ["avg", "min", "med", "max", "p(90)", "p(95)", "p(99)"],
};

export default function () {
  const baseUrl = config.baseUrl;

  group("Performance Summary", function () {
    // Homepage
    let start = new Date();
    let homeRes = http.get(baseUrl);
    let homeDuration = new Date() - start;
    homepageTime.add(homeDuration);

    check(homeRes, {
      "homepage loaded": (r) => r.status === 200,
    });
    sleep(1);

    // Collections page
    start = new Date();
    let collectionsRes = http.get(`${baseUrl}/collections`);
    let collectionsDuration = new Date() - start;
    collectionsTime.add(collectionsDuration);

    check(collectionsRes, {
      "collections page loaded": (r) => r.status === 200,
    });
    sleep(1);

    // Products page
    start = new Date();
    let productsRes = http.get(`${baseUrl}/products`);
    let productsDuration = new Date() - start;
    productPageTime.add(productsDuration);

    check(productsRes, {
      "products page loaded": (r) => r.status === 200,
    });
    sleep(1);

    // Cart page
    start = new Date();
    let cartRes = http.get(`${baseUrl}/cart`);
    let cartDuration = new Date() - start;
    cartPageTime.add(cartDuration);

    check(cartRes, {
      "cart page loaded": (r) => r.status === 200,
    });
    sleep(1);
  });
}
