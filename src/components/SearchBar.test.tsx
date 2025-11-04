import { describe, test, expect, vi } from "vitest";
import { waitFor, fireEvent, render, screen } from "@testing-library/react";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  test("should render a search bar", () => {
    const { container } = render(<SearchBar onQuery={() => {}} />);
    expect(container).toMatchSnapshot();
    expect(screen.getByRole("textbox")).toBeDefined();
    expect(screen.getByRole("button")).toBeDefined();
  });

  test("should call onQuery when the correct value after 1000ms", async () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(onQuery).toHaveBeenCalled();
      expect(onQuery).toHaveBeenCalledWith("test");
    }, { timeout: 1500 });
  });

  test("should call only once with the last value (debounce)", async () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "t" } });
    fireEvent.change(input, { target: { value: "te" } });
    fireEvent.change(input, { target: { value: "tes" } });
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(onQuery).toHaveBeenCalledTimes(1);
      expect(onQuery).toHaveBeenCalledWith("test");
    }, { timeout: 1500 });
  });

  test("should call onQuery when button clicked with the input value", async () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onQuery).toHaveBeenCalledTimes(1);
    expect(onQuery).toHaveBeenCalledWith("test");
  });

  test("should the input has the correct placeholder value", () => {
    const value = "Buscar gifs";
    render(<SearchBar onQuery={() => {}} placeholder={value} />);

    expect(screen.getByPlaceholderText(value)).toBeDefined();
  });
});
