// src/components/ui/__test__/breadcrumb.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import Breadcrumb from "../breadcrumb";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/test/path"),
  useSearchParams: jest.fn(() => ({
    get: jest.fn((param) => {
      if (param === "collection") return "test-collection";
      return null;
    }),
  })),
}));

// Mock next/link
jest.mock("next/link", () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

describe("Breadcrumb component", () => {
  test("renders default breadcrumbs correctly", () => {
    render(<Breadcrumb />);

    // Check for default items
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Collections")).toBeInTheDocument();

    // Check that they're rendered as links
    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("Collections").closest("a")).toHaveAttribute(
      "href",
      "/collections"
    );
  });

  test("renders custom breadcrumb items", () => {
    const customItems = [
      { label: "Custom Home", href: "/custom" },
      { label: "Category", href: "/custom/category" },
      { label: "Product", href: "/custom/category/product", active: true },
    ];

    render(<Breadcrumb items={customItems} />);

    // Check for custom items
    expect(screen.getByText("Custom Home")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Product")).toBeInTheDocument();

    // Check that non-active items are rendered as links
    expect(screen.getByText("Custom Home").closest("a")).toHaveAttribute(
      "href",
      "/custom"
    );
    expect(screen.getByText("Category").closest("a")).toHaveAttribute(
      "href",
      "/custom/category"
    );

    // Check that active item is not a link
    expect(screen.getByText("Product").closest("a")).toBeNull();
  });

  test("renders current collection when provided", () => {
    render(<Breadcrumb currentCollection="test-collection" />);

    // Format should convert "test-collection" to "Test Collection"
    expect(screen.getByText("Test Collection")).toBeInTheDocument();

    // Check that it's marked as active (not a link)
    const collectionElement = screen.getByText("Test Collection");
    expect(collectionElement.closest("a")).toBeNull();
  });

  
  test("formats collection names correctly", () => {
    const { rerender } = render(
      <Breadcrumb currentCollection="test-collection" />
    );
    expect(screen.getByText("Test Collection")).toBeInTheDocument();

    rerender(<Breadcrumb currentCollection="multiple-word-collection" />);
    expect(screen.getByText("Multiple Word Collection")).toBeInTheDocument();
  });
});
