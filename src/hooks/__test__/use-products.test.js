// src/hooks/__test__/use-products.test.js
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useProducts from "../use-products";
import { getAllProducts } from "@/lib/product-service";

// Mock the product service
jest.mock("@/lib/product-service", () => ({
  getAllProducts: jest.fn(),
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

describe("useProducts hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("initially returns loading state", async () => {
    // Setup mock to return promise that never resolves
    getAllProducts.mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    // Initial state should be loading with no data
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
  });

  test("returns products data when fetch succeeds", async () => {
    // Mock data
    const mockProducts = [
      {
        _id: "1",
        name: "Product 1",
        price: 99.99,
        collectionId: "collection1",
      },
      {
        _id: "2",
        name: "Product 2",
        price: 129.99,
        collectionId: "collection2",
      },
    ];

    // Setup mock to resolve with data
    getAllProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    // Wait for the hook to resolve
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Check final state
    expect(result.current.data).toEqual(mockProducts);
    expect(result.current.error).toBeNull();
    expect(getAllProducts).toHaveBeenCalledTimes(1);
  });

  test("returns error when fetch fails", async () => {
    // Mock error
    const error = new Error("Failed to fetch products");

    // Setup mock to reject
    getAllProducts.mockRejectedValue(error);

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    // Wait for the hook to resolve
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Check final state
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBe(error);
    expect(getAllProducts).toHaveBeenCalledTimes(1);
  });

  test("caches data between hook invocations", async () => {
    // Mock data
    const mockProducts = [
      { _id: "1", name: "Product 1", price: 99.99 },
      { _id: "2", name: "Product 2", price: 129.99 },
    ];

    // Setup mock to resolve with data
    getAllProducts.mockResolvedValue(mockProducts);

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
    const { result: result1, unmount: unmount1 } = renderHook(
      () => useProducts(),
      {
        wrapper,
      }
    );

    // Wait for first render to complete
    await waitFor(() => {
      expect(result1.current.isLoading).toBe(false);
    });

    // Unmount the first hook
    unmount1();

    // Second render should use cached data
    const { result: result2 } = renderHook(() => useProducts(), {
      wrapper,
    });

    // Should have data immediately from cache
    expect(result2.current.data).toEqual(mockProducts);

    // API should have been called only once across both renders
    expect(getAllProducts).toHaveBeenCalledTimes(1);
  });
});
