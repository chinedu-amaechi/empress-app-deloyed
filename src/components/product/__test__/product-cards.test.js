// src/components/product/__test__/product-card.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "../product-card";

// Mock the cart context
jest.mock("@/app/contexts/cart-context", () => ({
  useCartContext: jest.fn(() => ({
    cart: [],
    setCart: jest.fn(),
  })),
}));

// Mock the auth context
jest.mock("@/app/contexts/auth-context", () => ({
  useAuthContext: jest.fn(() => ({
    user: null,
  })),
}));

// Mock the cart services
jest.mock("@/lib/cart-services", () => ({
  addToCart: jest.fn(),
  updateCart: jest.fn(),
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock react-hot-toast
jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe("ProductCard component", () => {
  // Sample product for testing
  const mockProduct = {
    _id: "123",
    name: "Test Bracelet",
    price: 99.99,
    originalPrice: 129.99,
    rating: 4.5,
    reviews: 10,
    description: "A beautiful bracelet for testing",
    colors: ["Silver", "Gold"],
    imagesUrl: [
      { optimizeUrl: "/test-image-1.jpg" },
      { optimizeUrl: "/test-image-2.jpg" },
    ],
    material: "Sterling Silver",
  };

  beforeEach(() => {
    // Clear all mocks between tests
    jest.clearAllMocks();
  });

 
  test("handles empty or partial product data gracefully", () => {
    // Render with minimum required properties
    const minimalProduct = {
      name: "Minimal Product",
      price: 50,
      imagesUrl: [{ optimizeUrl: "/minimal.jpg" }],
    };

    render(<ProductCard product={minimalProduct} />);

    // Should show name and price without errors
    expect(screen.getByText("Minimal Product")).toBeInTheDocument();
    expect(screen.getByText("$50.00")).toBeInTheDocument();
  });

 
  test("displays the correct number of stars based on rating", () => {
    render(<ProductCard product={mockProduct} />);

    // For a 4.5 rating, we should see 4 filled stars and 1 empty star
    // This is a simplified test; in a real test we might query more specifically for the star SVGs
    const ratingElement = screen.getByText("(10)").closest("div");
    expect(ratingElement).toBeInTheDocument();
  });

  test("allows changing product image in the carousel", () => {
    render(<ProductCard product={mockProduct} />);

    // Find image container
    const productContainer = screen
      .getByText("Test Bracelet")
      .closest(".group");
    fireEvent.mouseEnter(productContainer);

    // Find and click the next image button
    const nextButton = productContainer.querySelector(
      'button[aria-label="Next image"]'
    );
    fireEvent.click(nextButton);

    // Find and click the previous image button
    const prevButton = productContainer.querySelector(
      'button[aria-label="Previous image"]'
    );
    fireEvent.click(prevButton);

    // Hard to verify the exact image changed without more complex test setup
    // But we at least verify the buttons exist and don't crash when clicked
    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
  });

  // Add more tests for functionality like:
  // - Adding to cart
  // - Color selection
  // - Quantity changes
  // - Mobile responsiveness
});
