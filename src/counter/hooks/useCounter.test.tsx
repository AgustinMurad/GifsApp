import { describe, expect, test } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  const initialValue = 5;
  test("should initialize with default value of 1", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.counter).toBe(1);
  });

  test("should initialize with custom value", () => {
    const { result } = renderHook(() => useCounter(initialValue));
    expect(result.current.counter).toBe(initialValue);
  });

  test("should increment counter on handleAdd", () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.handleAdd();
    });
    expect(result.current.counter).toBe(2);
  });

  test("should decrement counter on handleSubtrac", () => {
    const { result } = renderHook(() => useCounter(initialValue));
    act(() => {
      result.current.handleSubtrac();
    });
    expect(result.current.counter).toBe(initialValue - 1);
  });

  test("should reset counter on handleReset", () => {
    const { result } = renderHook(() => useCounter(initialValue));
    act(() => {
      result.current.handleAdd();
    });
    act(() => {
      result.current.handleReset();
    });
    expect(result.current.counter).toBe(initialValue);
  });
});
