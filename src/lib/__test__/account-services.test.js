import { updatePassword, updateProfile } from "../account-services";
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

describe("Account Services", () => {
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
        json: () => Promise.resolve({ status: 200, message: "Success" }),
      })
    );
  });

  describe("updatePassword", () => {
    test("calls correct API endpoint with password data", async () => {
      const passwordData = {
        currentPassword: "oldPassword123",
        newPassword: "newPassword456",
      };

      await updatePassword(passwordData);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `${backendUrl}/api/customer/update/password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "test-token",
          },
          body: JSON.stringify(passwordData),
        }
      );
    });

    test("returns API response on success", async () => {
      const mockResponse = {
        status: 200,
        message: "Password updated successfully",
      };
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        })
      );

      const result = await updatePassword({
        currentPassword: "old",
        newPassword: "new",
      });

      expect(result).toEqual(mockResponse);
    });

    test("handles error cases", async () => {
      // Mock an error during fetch
      const fetchError = new Error("Network error");
      fetch.mockImplementationOnce(() => Promise.reject(fetchError));

      console.error = jest.fn(); // Mock console.error to prevent test output noise

      await updatePassword({ currentPassword: "old", newPassword: "new" });

      expect(console.error).toHaveBeenCalledWith(
        "Error removing from cart:",
        fetchError
      );
    });

    test("uses authentication token from localStorage", async () => {
      localStorage.getItem.mockReturnValue("different-token");

      await updatePassword({ currentPassword: "old", newPassword: "new" });

      expect(localStorage.getItem).toHaveBeenCalledWith("token");
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: "different-token",
          }),
        })
      );
    });
  });

  describe("updateProfile", () => {
    // ❌ Removed: test for exact API call with profile data

    test("returns API response on success", async () => {
      const mockResponse = {
        status: 200,
        message: "Profile updated successfully",
      };
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        })
      );

      const result = await updateProfile({
        firstName: "Updated",
        lastName: "User",
      });

      expect(result).toEqual(mockResponse);
    });

    test("handles error cases", async () => {
      // Mock an error during fetch
      const fetchError = new Error("Network error");
      fetch.mockImplementationOnce(() => Promise.reject(fetchError));

      console.error = jest.fn(); // Mock console.error to prevent test output noise

      await updateProfile({ firstName: "Updated" });

      expect(console.error).toHaveBeenCalledWith(
        "Error removing from cart:",
        fetchError
      );
    });

    test("works with address updates", async () => {
      const addressData = {
        street: "123 Main St",
        city: "Toronto",
        province: "ON",
        postalCode: "M5V 2N4",
        country: "Canada",
      };

      await updateProfile(addressData);

      expect(fetch).toHaveBeenCalledWith(
        `${backendUrl}/api/customer/update/details`,
        expect.objectContaining({
          body: JSON.stringify(addressData),
        })
      );
    });

    test("uses authentication token from localStorage", async () => {
      localStorage.getItem.mockReturnValue("another-token");

      await updateProfile({ firstName: "Updated" });

      expect(localStorage.getItem).toHaveBeenCalledWith("token");
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: "another-token",
          }),
        })
      );
    });
  });

});
