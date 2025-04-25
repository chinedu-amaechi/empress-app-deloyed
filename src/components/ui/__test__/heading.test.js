import React from "react";
import { render, screen } from "@testing-library/react";
import Heading from "../heading";

// Mock the fonts to avoid issues with Next.js font loading in tests
jest.mock("@/components/ui/fonts", () => ({
  activeFont: { className: "mock-font-class" },
}));

describe("Heading component", () => {
  test("renders correctly with default props", () => {
    render(<Heading>Test Heading</Heading>);
    const headingElement = screen.getByText("Test Heading");

    expect(headingElement.tagName).toBe("H1");
    expect(headingElement).toHaveClass("mock-font-class");
  });

  test("renders the correct heading level", () => {
    render(<Heading level={3}>Level 3 Heading</Heading>);
    const headingElement = screen.getByText("Level 3 Heading");

    expect(headingElement.tagName).toBe("H3");
  });

  test("applies custom className", () => {
    render(<Heading className="custom-class">Custom Heading</Heading>);
    const headingElement = screen.getByText("Custom Heading");

    expect(headingElement).toHaveClass("custom-class");
  });

  test("renders different heading levels", () => {
    const { rerender } = render(<Heading level={1}>Heading 1</Heading>);
    expect(screen.getByText("Heading 1").tagName).toBe("H1");

    rerender(<Heading level={2}>Heading 2</Heading>);
    expect(screen.getByText("Heading 2").tagName).toBe("H2");

    rerender(<Heading level={3}>Heading 3</Heading>);
    expect(screen.getByText("Heading 3").tagName).toBe("H3");

    rerender(<Heading level={4}>Heading 4</Heading>);
    expect(screen.getByText("Heading 4").tagName).toBe("H4");

    rerender(<Heading level={5}>Heading 5</Heading>);
    expect(screen.getByText("Heading 5").tagName).toBe("H5");

    rerender(<Heading level={6}>Heading 6</Heading>);
    expect(screen.getByText("Heading 6").tagName).toBe("H6");
  });

  });
