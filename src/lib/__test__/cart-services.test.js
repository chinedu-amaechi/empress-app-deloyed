// src/lib/__test__/cart-services.test.js
import {
  getCartProducts,
  addToCart,
  updateCart,
  removeFromCart,
} from "../cart-services";
import backendUrl from "../backend-url";

// Mock fetch
global.fetch = jest.fn();

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("Cart Services", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    fetch.mockClear();
    localStorage.getItem.mockClear();
    localStorage.setItem.mockClear();
    localStorage.clear();

    // Setup localStorage with a test token
    localStorage.setItem("token", "test-token");

    // Setup fetch mock to return a default success response
    fetch.mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            status: 200,
            message: "Success",
            data: [],
          }),
      })
    );
  });

  describe("getCartProducts", () => {
    test("calls correct API endpoint with auth token", async () => {
      await getCartProducts();

      expect(localStorage.getItem).toHaveBeenCalledWith("token");
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(`${backendUrl}/api/customer/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "test-token",
        },
      });
    });

    test("returns cart data when successful", async () => {
      const mockCartData = [
        { _id: "1", name: "Product 1", price: 99.99, quantity: 1 },
        { _id: "2", name: "Product 2", price: 129.99, quantity: 2 },
      ];

      const mockResponse = {
        status: 200,
        message: "Cart retrieved",
        data: mockCartData,
      };

      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        })
      );

      const result = await getCartProducts();

      expect(result).toEqual(mockCartData);
    });

    test("handles error cases", async () => {
      // Mock an error during fetch
      const fetchError = new Error("Network error");
      fetch.mockImplementationOnce(() => Promise.reject(fetchError));

      console.error = jest.fn(); // Mock console.error to prevent test output noise

      const result = await getCartProducts();

      expect(console.error).toHaveBeenCalledWith(
        "Error fetching all products:",
        fetchError
      );
      expect(result).toEqual([]);
    });
  });

  describe("addToCart", () => {
    test("calls correct API endpoint with product data", async () => {
      const productData = {
        _id: "product123",
        quantity: 2,
      };

      await addToCart(productData);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(`${backendUrl}/api/customer/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "test-token",
        },
        body: JSON.stringify({
          productId: "product123",
          quantity: 2,
        }),
      });
    });

    test("returns API response data on success", async () => {
      const mockCartData = {
        items: [{ productId: "product123", quantity: 2 }],
      };
      const mockResponse = {
        status: 200,
        message: "Product added to cart",
        data: mockCartData,
      };

      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        })
      );

      const result = await addToCart({ _id: "product123", quantity: 2 });

      expect(result).toEqual(mockCartData);
    });

    test("handles error cases", async () => {
      // Mock an error during fetch
      const fetchError = new Error("Network error");
      fetch.mockImplementationOnce(() => Promise.reject(fetchError));

      console.error = jest.fn(); // Mock console.error to prevent test output noise

      await addToCart({ _id: "product123", quantity: 2 });

      expect(console.error).toHaveBeenCalledWith(
        "Error adding to cart:",
        fetchError
      );
    });
  });

  describe("updateCart", () => {
    test("calls correct API endpoint with update data", async () => {
      const updateData = {
        productId: "product123",
        quantity: 3,
        operation: "add",
      };

      await updateCart(updateData);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `${backendUrl}/api/customer/cart/product123`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "test-token",
          },
          body: JSON.stringify({
            quantity: 3,
            operation: "add",
          }),
        }
      );
    });

    test("supports default operation", async () => {
      const updateData = {
        productId: "product123",
        quantity: 3,
        // No operation specified, should default
      };

      await updateCart(updateData);

      // Extract the body to check its content
      const call = fetch.mock.calls[0];
      const bodyContent = JSON.parse(call[1].body);

      expect(bodyContent).toEqual({
        quantity: 3,
        operation: "add", // Default operation
      });
    });

    test("returns API response data on success", async () => {
      const mockCartData = {
        items: [{ productId: "product123", quantity: 5 }],
      };
      const mockResponse = {
        status: 200,
        message: "Cart updated",
        data: mockCartData,
      };

      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        })
      );

      const result = await updateCart({
        productId: "product123",
        quantity: 2,
        operation: "add",
      });

      expect(result).toEqual(mockCartData);
    });

    test("handles error cases", async () => {
      // Mock an error during fetch
      const fetchError = new Error("Network error");
      fetch.mockImplementationOnce(() => Promise.reject(fetchError));

      console.error = jest.fn(); // Mock console.error to prevent test output noise

      await updateCart({ productId: "product123", quantity: 2 });

      expect(console.error).toHaveBeenCalledWith(
        "Error updating cart:",
        fetchError
      );
    });

    test("supports subtract operation", async () => {
      const updateData = {
        productId: "product123",
        quantity: 1,
        operation: "subtract",
      };

      await updateCart(updateData);

      // Extract the body to check its content
      const call = fetch.mock.calls[0];
      const bodyContent = JSON.parse(call[1].body);

      expect(bodyContent).toEqual({
        quantity: 1,
        operation: "subtract",
      });
    });
  });

  describe("removeFromCart", () => {
    test("calls correct API endpoint with product ID", async () => {
      const productData = {
        productId: "product123",
      };

      await removeFromCart(productData);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `${backendUrl}/api/customer/cart/product123`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "test-token",
          },
        }
      );
    });

    test("returns API response data on success", async () => {
      const mockCartData = { items: [] }; // Empty cart after removal
      const mockResponse = {
        status: 200,
        message: "Product removed from cart",
        data: mockCartData,
      };

      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        })
      );

      const result = await removeFromCart({ productId: "product123" });

      expect(result).toEqual(mockCartData);
    });

    test("handles error cases", async () => {
      // Mock an error during fetch
      const fetchError = new Error("Network error");
      fetch.mockImplementationOnce(() => Promise.reject(fetchError));

      console.error = jest.fn(); // Mock console.error to prevent test output noise

      await removeFromCart({ productId: "product123" });

      expect(console.error).toHaveBeenCalledWith(
        "Error removing from cart:",
        fetchError
      );
    });
  });
});
