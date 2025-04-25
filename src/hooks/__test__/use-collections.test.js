// src/hooks/use-collections.test.js
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useCollections from "../use-collections";
import { getAllCollections } from "@/lib/collection-service";

// Mock the service
jest.mock("@/lib/collection-service");

// Create a wrapper with QueryClientProvider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const TestWrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  // Add display name
  TestWrapper.displayName = "TestWrapper";

  return TestWrapper;
};

describe("useCollections hook", () => {
  test("fetches collections successfully", async () => {
    // Mock implementation of getAllCollections
    const mockCollections = [
      { _id: "1", name: "Collection 1" },
      { _id: "2", name: "Collection 2" },
    ];
    getAllCollections.mockResolvedValue(mockCollections);

    // Render the hook with the wrapper
    const { result } = renderHook(() => useCollections(), {
      wrapper: createWrapper(),
    });

    // Initially loading with no data
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    // Wait for the query to complete
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Verify the data is loaded
    expect(result.current.data).toEqual(mockCollections);
    expect(result.current.error).toBeNull();
  });

  test("handles error when fetching collections fails", async () => {
    // Mock implementation that throws an error
    const errorMessage = "Failed to fetch collections";
    getAllCollections.mockRejectedValue(new Error(errorMessage));

    // Render the hook
    const { result } = renderHook(() => useCollections(), {
      wrapper: createWrapper(),
    });

    // Wait for the query to complete
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Verify error state
    expect(result.current.error).toBeDefined();
    expect(result.current.error.message).toBe(errorMessage);
  });
});
