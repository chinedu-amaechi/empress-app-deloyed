import React from "react";
import { render, screen } from "@testing-library/react";
import ProductHero from "../product-hero";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: jest.fn(({ children, ...props }) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    )),
    p: jest.fn(({ children, ...props }) => (
      <p data-testid="motion-p" {...props}>
        {children}
      </p>
    )),
  },
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    const { fill, priority, ...rest } = props;
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...rest} data-testid="next-image" />;
  },
}));

// Mock useRef
jest.mock("react", () => {
  const originalReact = jest.requireActual("react");
  return {
    ...originalReact,
    useRef: jest.fn(() => ({ current: null })),
  };
});

describe("ProductHero component", () => {
  beforeEach(() => {
    // Mock React.useEffect
    jest.spyOn(React, "useEffect").mockImplementation((f) => f());

    // Mock React.useState
    jest
      .spyOn(React, "useState")
      .mockImplementation((initialValue) => [initialValue, jest.fn()]);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders the heading text", () => {
    render(<ProductHero />);

    // Check for the main headline content
    expect(screen.getByText("Explore timeless")).toBeInTheDocument();
    expect(screen.getByText("Elegance")).toBeInTheDocument();
  });

  test("renders the description text", () => {
    render(<ProductHero />);

    const descriptionText =
      "Crafted with precision and passion, our bracelets are more than just accessories. Each piece tells a unique story, designed to empower and inspire the woman who wears it.";
    expect(screen.getByText(descriptionText)).toBeInTheDocument();
  });

  test("renders the background images", () => {
    render(<ProductHero />);

    // Check that images are rendered
    const images = screen.getAllByTestId("next-image");
    expect(images.length).toBeGreaterThan(0);

    // At least one image should have correct props
    const backgroundImage = images.find(
      (img) =>
        img.getAttribute("src")?.includes("Empress") &&
        img.getAttribute("alt")?.includes("Background")
    );
    expect(backgroundImage).toBeInTheDocument();
  });

  test("renders motion components for animations", () => {
    render(<ProductHero />);

    // Check that motion components are used
    const motionDivs = screen.getAllByTestId("motion-div");
    const motionParagraphs = screen.getAllByTestId("motion-p");

    expect(motionDivs.length).toBeGreaterThan(0);
    expect(motionParagraphs.length).toBeGreaterThan(0);
  });
});
