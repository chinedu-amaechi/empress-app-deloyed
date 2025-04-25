// src/components/ui/button.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../button";

describe("Button component", () => {
  test("renders correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  test("applies custom className", () => {
    render(<Button className="custom-class">Click me</Button>);
    const button = screen.getByText("Click me");
    expect(button).toHaveClass("custom-class");
  });

  test("is disabled when disabled prop is true", () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText("Click me")).toBeDisabled();
  });

  test("triggers onClick when clicked", async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    await userEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders as a link when href is provided", () => {
    render(<Button href="/test">Click me</Button>);
    const link = screen.getByText("Click me");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/test");
  });
});
