// src/lib/__test__/auth-services.test.js
import {
  postSignUp,
  postSignIn,
  checkAuth,
  postForgotPassword,
  postResetPassword,
} from "../auth-services";
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

describe("Auth Services", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    fetch.mockClear();
    localStorage.getItem.mockClear();
    localStorage.setItem.mockClear();
    localStorage.clear();

    // Setup fetch mock to return a default success response
    fetch.mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ status: 200, message: "Success" }),
      })
    );
  });

  describe("postSignUp", () => {
    test("calls correct API endpoint with user data", async () => {
      const userData = {
        email: "test@example.com",
        password: "password123",
        firstName: "Test",
        lastName: "User",
      };

      await postSignUp(userData);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `${backendUrl}/api/auth/create/customer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
    });

    test("returns API response on success", async () => {
      const mockResponse = {
        status: 201,
        message: "User created successfully",
      };
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        })
      );

      const result = await postSignUp({ email: "test@example.com" });

      expect(result).toEqual(mockResponse);
    });

    test("handles error cases", async () => {
      // Mock an error during fetch
      const fetchError = new Error("Network error");
      fetch.mockImplementationOnce(() => Promise.reject(fetchError));

      console.error = jest.fn(); // Mock console.error to prevent test output noise

      await postSignUp({ email: "test@example.com" });

      expect(console.error).toHaveBeenCalledWith(
        "Error during sign-up:",
        fetchError
      );
    });
  });

  describe("postSignIn", () => {
    test("calls correct API endpoint with credentials", async () => {
      const credentials = {
        email: "test@example.com",
        password: "password123",
      };

      await postSignIn(credentials);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `${backendUrl}/api/auth/login/customer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );
    });

    test("returns API response with user and token on success", async () => {
      const mockResponse = {
        status: 200,
        message: "Login successful",
        data: {
          user: { email: "test@example.com", firstName: "Test" },
          token: "mock-token",
        },
      };

      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        })
      );

      const result = await postSignIn({
        email: "test@example.com",
        password: "password123",
      });

      expect(result).toEqual(mockResponse);
    });

    test("handles error cases", async () => {
      // Mock an error during fetch
      const fetchError = new Error("Network error");
      fetch.mockImplementationOnce(() => Promise.reject(fetchError));

      console.error = jest.fn(); // Mock console.error to prevent test output noise

      await postSignIn({ email: "test@example.com", password: "wrong" });

      expect(console.error).toHaveBeenCalledWith(
        "Error during sign-in:",
        fetchError
      );
    });
  });

  describe("checkAuth", () => {
    test("calls correct API endpoint with auth token", async () => {
      // Setup token in localStorage
      localStorage.getItem.mockReturnValue("mock-token");

      await checkAuth();

      expect(localStorage.getItem).toHaveBeenCalledWith("token");
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(`${backendUrl}/api/auth/check/auth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "mock-token",
        },
      });
    });

    test("returns user data on successful auth check", async () => {
      localStorage.getItem.mockReturnValue("mock-token");

      const mockResponse = {
        status: 200,
        data: { email: "test@example.com", firstName: "Test" },
      };

      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        })
      );

      const result = await checkAuth();

      expect(result).toEqual(mockResponse);
    });

    test("handles error cases", async () => {
      localStorage.getItem.mockReturnValue("invalid-token");

      // Mock an error during fetch
      const fetchError = new Error("Authentication error");
      fetch.mockImplementationOnce(() => Promise.reject(fetchError));

      console.error = jest.fn(); // Mock console.error to prevent test output noise

      await checkAuth();

      expect(console.error).toHaveBeenCalledWith(
        "Error during auth check:",
        fetchError
      );
    });
  });

  describe("postForgotPassword", () => {
    test("calls correct API endpoint with email", async () => {
      const email = "test@example.com";

      await postForgotPassword(email);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `${backendUrl}/api/auth/forgot/password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
    });

    test("returns success response when email is sent", async () => {
      const mockResponse = { status: 200, message: "Reset link sent" };
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        })
      );

      const result = await postForgotPassword("test@example.com");

      expect(result).toEqual(mockResponse);
    });

    test("handles error cases", async () => {
      // Mock an error during fetch
      const fetchError = new Error("Network error");
      fetch.mockImplementationOnce(() => Promise.reject(fetchError));

      console.error = jest.fn(); // Mock console.error to prevent test output noise

      await postForgotPassword("test@example.com");

      expect(console.error).toHaveBeenCalledWith(
        "Error removing from cart:",
        fetchError
      );
    });
  });

  describe("postResetPassword", () => {
    test("calls correct API endpoint with password and token", async () => {
      const resetData = {
        password: "newpassword123",
        confirmPassword: "newpassword123",
        token: "reset-token",
      };

      await postResetPassword(resetData);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `${backendUrl}/api/auth/reset/password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resetData),
        }
      );
    });

    test("returns success response when password is reset", async () => {
      const mockResponse = {
        status: 200,
        message: "Password reset successful",
      };
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
        })
      );

      const result = await postResetPassword({
        password: "newpassword123",
        confirmPassword: "newpassword123",
        token: "reset-token",
      });

      expect(result).toEqual(mockResponse);
    });

    test("handles error cases", async () => {
      // Mock an error during fetch
      const fetchError = new Error("Network error");
      fetch.mockImplementationOnce(() => Promise.reject(fetchError));

      console.error = jest.fn(); // Mock console.error to prevent test output noise

      await postResetPassword({
        password: "newpassword123",
        confirmPassword: "newpassword123",
        token: "reset-token",
      });

      expect(console.error).toHaveBeenCalledWith(
        "Error removing from cart:",
        fetchError
      );
    });
  });
});
