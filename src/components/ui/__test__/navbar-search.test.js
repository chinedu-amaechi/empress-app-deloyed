// src/components/ui/__test__/navbar-search.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavbarSearch from "../navbar-search";

// Mock the product service
jest.mock("@/lib/product-service", () => ({
  searchProducts: jest.fn().mockImplementation((query) => {
    if (query === "test") {
      return Promise.resolve([
        {
          id: "1",
          name: "Test Bracelet",
          price: 99.99,
          collectionName: "Heritage",
          collectionId: "heritage",
          image: "/test-image.jpg",
        },
        {
          id: "2",
          name: "Another Test",
          price: 129.99,
          collectionName: "Ethereal",
          collectionId: "ethereal",
          image: "/test-image-2.jpg",
        },
      ]);
    }
    return Promise.resolve([]);
  }),
}));

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

describe("NavbarSearch component", () => {
  beforeEach(() => {
    // Mock window.location.href
    delete window.location;
    window.location = { href: "" };

    // Reset mocks
    jest.clearAllMocks();
  });

  test("renders search input", () => {
    render(<NavbarSearch />);
    expect(
      screen.getByPlaceholderText("Search for bracelets...")
    ).toBeInTheDocument();
  });

  test("shows search icon", () => {
    render(<NavbarSearch />);
    const searchInput = screen.getByPlaceholderText("Search for bracelets...");
    const searchIcon = searchInput.parentElement.querySelector("svg");
    expect(searchIcon).toBeInTheDocument();
  });

  test("updates input value on change", async () => {
    render(<NavbarSearch />);
    const searchInput = screen.getByPlaceholderText("Search for bracelets...");
    await userEvent.type(searchInput, "test");
    expect(searchInput.value).toBe("test");
  });

  test("shows search results after typing", async () => {
    render(<NavbarSearch />);
    const searchInput = screen.getByPlaceholderText("Search for bracelets...");
    await userEvent.type(searchInput, "test");

    await waitFor(() => {
      expect(screen.getByText("Test Bracelet")).toBeInTheDocument();
      expect(screen.getByText("Another Test")).toBeInTheDocument();
    });
  });

  test("shows product prices in search results", async () => {
    render(<NavbarSearch />);
    const searchInput = screen.getByPlaceholderText("Search for bracelets...");
    await userEvent.type(searchInput, "test");

    await waitFor(() => {
      expect(screen.getByText("$99.99")).toBeInTheDocument();
      expect(screen.getByText("$129.99")).toBeInTheDocument();
    });
  });

  test("shows collection names in search results", async () => {
    render(<NavbarSearch />);
    const searchInput = screen.getByPlaceholderText("Search for bracelets...");
    await userEvent.type(searchInput, "test");

    await waitFor(() => {
      expect(screen.getByText("Heritage")).toBeInTheDocument();
      expect(screen.getByText("Ethereal")).toBeInTheDocument();
    });
  });

  test("navigates to product page when result is clicked", async () => {
    render(<NavbarSearch />);
    const searchInput = screen.getByPlaceholderText("Search for bracelets...");
    await userEvent.type(searchInput, "test");

    await waitFor(() => {
      expect(screen.getByText("Test Bracelet")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Test Bracelet"));
    expect(window.location.href).toBe("/collections/heritage/products/1");
  });

  test("navigates to search results page on form submission", async () => {
    render(<NavbarSearch />);
    const searchInput = screen.getByPlaceholderText("Search for bracelets...");
    await userEvent.type(searchInput, "test");

    fireEvent.submit(searchInput.form);
    expect(window.location.href).toBe("/products?q=test");
  });

  test("shows 'View all results' link in dropdown", async () => {
    render(<NavbarSearch />);
    const searchInput = screen.getByPlaceholderText("Search for bracelets...");
    await userEvent.type(searchInput, "test");

    await waitFor(() => {
      expect(screen.getByText("View all results")).toBeInTheDocument();
    });

    const viewAllLink = screen.getByText("View all results");
    expect(viewAllLink).toHaveAttribute("href", "/products?q=test");
  });

  test("shows 'No products found' message for empty results", async () => {
    render(<NavbarSearch />);
    const searchInput = screen.getByPlaceholderText("Search for bracelets...");
    await userEvent.type(searchInput, "nonexistent");

    await waitFor(() => {
      expect(screen.getByText("No products found")).toBeInTheDocument();
    });
  });
});
