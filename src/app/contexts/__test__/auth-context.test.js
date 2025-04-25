// src/app/contexts/auth-context.test.js
import React from "react";
import { render, screen, act } from "@testing-library/react";
import { AuthContextProvider, useAuthContext } from "../auth-context";

// Create a test component that uses the context
const TestComponent = () => {
  const { user, setUser } = useAuthContext();

  return (
    <div>
      <div data-testid="user-value">{user ? user.firstName : "No user"}</div>
      <button
        onClick={() => setUser({ firstName: "Test", lastName: "User" })}
        data-testid="login-button"
      >
        Login
      </button>
      <button onClick={() => setUser(null)} data-testid="logout-button">
        Logout
      </button>
    </div>
  );
};

describe("AuthContextProvider", () => {
  test("provides user state and setUser function", () => {
    render(
      <AuthContextProvider>
        <TestComponent />
      </AuthContextProvider>
    );

    // Initially, no user is logged in
    expect(screen.getByTestId("user-value")).toHaveTextContent("No user");

    // Log in a user
    act(() => {
      screen.getByTestId("login-button").click();
    });

    // Check if the user state was updated
    expect(screen.getByTestId("user-value")).toHaveTextContent("Test");

    // Log out the user
    act(() => {
      screen.getByTestId("logout-button").click();
    });

    // Check if the user state was cleared
    expect(screen.getByTestId("user-value")).toHaveTextContent("No user");
  });
});
