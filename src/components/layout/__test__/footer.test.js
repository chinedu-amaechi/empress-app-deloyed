// src/components/layout/__test__/footer.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../footer";

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className }) => {
    return (
      // eslint-disable-next-line jsx-a11y/alt-text
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    );
  },
}));

// Save original Date before mocking
const originalDate = global.Date;

// Mock Date globally before all tests
beforeEach(() => {
  global.Date = class extends Date {
    constructor() {
      super();
    }
    getFullYear() {
      return 2025; // fixed year for testing
    }
  };
});

// Restore Date after each test
afterEach(() => {
  global.Date = originalDate;
});

describe("Footer component", () => {
  test("renders logo and company links", () => {
    render(<Footer />);

    expect(screen.getByAltText("Empress Logo")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText("FAQ")).toBeInTheDocument();
  });

  test("renders navigation sections", () => {
    render(<Footer />);

    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Collections")).toBeInTheDocument();
    expect(screen.getByText("New Arrivals")).toBeInTheDocument();
    expect(screen.getByText("Bestsellers")).toBeInTheDocument();
    expect(screen.getByText("All Products")).toBeInTheDocument();
  });

  test("renders social media links", () => {
    render(<Footer />);

    const links = screen.getAllByRole("link");

    // Check that the social media hrefs exist
    expect(
      links.some(
        (link) =>
          link.getAttribute("href") ===
          "https://www.instagram.com/_empressofficial_/"
      )
    ).toBe(true);
    expect(
      links.some(
        (link) =>
          link.getAttribute("href") === "https://www.tiktok.com/@empresscanada"
      )
    ).toBe(true);
    expect(
      links.some(
        (link) => link.getAttribute("href") === "https://empresscanada.etsy.com"
      )
    ).toBe(true);
  });

  test("displays copyright with current year", () => {
    render(<Footer />);

    expect(
      screen.getByText("© 2025 Empress. All rights reserved.")
    ).toBeInTheDocument();
  });

  test("all navigation links have proper href attributes", () => {
    render(<Footer />);

    expect(screen.getByText("Collections").closest("a")).toHaveAttribute(
      "href",
      "/collections?collection=Heritage"
    );
    expect(screen.getByText("New Arrivals").closest("a")).toHaveAttribute(
      "href",
      "/new-arrivals"
    );
    expect(screen.getByText("Bestsellers").closest("a")).toHaveAttribute(
      "href",
      "/bestsellers"
    );
    expect(screen.getByText("All Products").closest("a")).toHaveAttribute(
      "href",
      "/products"
    );
    expect(screen.getByText("About Us").closest("a")).toHaveAttribute(
      "href",
      "/about-us"
    );
    expect(screen.getByText("Contact Us").closest("a")).toHaveAttribute(
      "href",
      "/contact"
    );
    expect(screen.getByText("FAQ").closest("a")).toHaveAttribute(
      "href",
      "/faq"
    );
  });
});
