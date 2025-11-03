import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CustomHeader } from "./CustomHeader";

describe("CustomHeader", () => {
  const title = "Test title";
  test("Should render the title correctly", () => {
    render(<CustomHeader title={title} />);
    expect(screen.getByText("Test title")).toBeDefined();
  });
  test("Should render the description when provided", () => {
    const description = "Test description";
    render(<CustomHeader title={title} description={description} />);
    expect(screen.getByText("Test description")).toBeDefined();
    expect(screen.getByRole("paragraph")).toBeDefined();
    expect(screen.getByRole("paragraph").innerHTML).toBe("Test description");
  });
  test("Should not render description when not provided", () => {
    const { container } = render(<CustomHeader title={title} />);
    const paragraph = container.querySelector("p");
    expect(paragraph).toBeNull();
  });
});
