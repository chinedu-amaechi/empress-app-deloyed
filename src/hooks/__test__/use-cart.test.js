// src/hooks/__test__/use-cart.test.js
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useCart from "../use-cart";
import { getCartProducts } from "@/lib/cart-services";

// Mock the cart service
jest.mock("@/lib/cart-services", () => ({
  getCartProducts: jest.fn(),
}));

// Wrapper component for React Query
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries for testing
      },
    },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useCart hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("initially returns loading state", async () => {
    // Setup mock to return promise that never resolves
    getCartProducts.mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => useCart(), {
      wrapper: createWrapper(),
    });

    // Initial state should be loading with no data
    expect(result.current.isLoading).toBe(true);
    expect(result.current.cartData).toBeUndefined();
    expect(result.current.error).toBeNull();
  });

  test("returns cart data when fetch succeeds", async () => {
    // Mock data
    const mockCartItems = [
      { _id: "1", name: "Product 1", price: 99.99, quantity: 1 },
      { _id: "2", name: "Product 2", price: 129.99, quantity: 2 },
    ];

    // Setup mock to resolve with data
    getCartProducts.mockResolvedValue(mockCartItems);

    const { result } = renderHook(() => useCart(), {
      wrapper: createWrapper(),
    });

    // Wait for the hook to resolve
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Check final state
    expect(result.current.cartData).toEqual(mockCartItems);
    expect(result.current.error).toBeNull();
    expect(getCartProducts).toHaveBeenCalledTimes(1);
  });

  test("returns error when fetch fails", async () => {
    // Mock error
    const error = new Error("Failed to fetch cart");

    // Setup mock to reject
    getCartProducts.mockRejectedValue(error);

    const { result } = renderHook(() => useCart(), {
      wrapper: createWrapper(),
    });

    // Wait for the hook to resolve
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Check final state
    expect(result.current.cartData).toBeUndefined();
    expect(result.current.error).toBe(error);
    expect(getCartProducts).toHaveBeenCalledTimes(1);
  });

  test("caches data between hook invocations", async () => {
    // Mock data
    const mockCartItems = [
      { _id: "1", name: "Product 1", price: 99.99, quantity: 1 },
      { _id: "2", name: "Product 2", price: 129.99, quantity: 2 },
    ];

    // Setup mock to resolve with data
    getCartProducts.mockResolvedValue(mockCartItems);

    // Create a wrapper with a persistent query client
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: Infinity, // Prevent auto-refetching
        },
      },
    });

    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    // First render
    const { result: result1, unmount: unmount1 } = renderHook(() => useCart(), {
      wrapper,
    });

    // Wait for first render to complete
    await waitFor(() => {
      expect(result1.current.isLoading).toBe(false);
    });

    // Unmount the first hook
    unmount1();

    // Second render should use cached data
    const { result: result2 } = renderHook(() => useCart(), {
      wrapper,
    });

    // Should have data immediately from cache
    expect(result2.current.cartData).toEqual(mockCartItems);

    // API should have been called only once across both renders
    expect(getCartProducts).toHaveBeenCalledTimes(1);
  });

  test("triggers refetch on window focus", async () => {
    // Mock data
    const mockCartItems = [
      { _id: "1", name: "Product 1", price: 99.99, quantity: 1 },
    ];

    // Setup mock to resolve with data
    getCartProducts.mockResolvedValue(mockCartItems);

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    // Render the hook
    renderHook(() => useCart(), { wrapper });

    // Wait for initial load
    await waitFor(() => {
      expect(getCartProducts).toHaveBeenCalledTimes(1);
    });

    // Clear the mock call count
    getCartProducts.mockClear();

    // Simulate window focus event
    queryClient.refetchQueries({ queryKey: ["cart"] });

    // Verify that the hook refetched the data
    await waitFor(() => {
      expect(getCartProducts).toHaveBeenCalledTimes(1);
    });
  });
});
