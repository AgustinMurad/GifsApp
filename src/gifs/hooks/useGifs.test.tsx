import { describe, test, expect, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useGifs } from "./useGifs";
import * as gifsActions from "../actions/get-gifs-by-query.action";

describe("useGifs", () => {
  test("should return default values methods", () => {
    const { result } = renderHook(() => useGifs());

    expect(result.current.gifs.length).toBe(0);
    expect(result.current.previousSearches.length).toBe(0);
    expect(result.current.handleSearch).toBeDefined();
    expect(result.current.handleSearchClicked).toBeDefined();
  });
  test("should return a list of gifs", async () => {
    //handleSearch
    const { result } = renderHook(() => useGifs());
    await act(async () => {
      await result.current.handleSearch("goku");
    });
    expect(result.current.gifs.length).toBe(10);
  });

  test("should return a list of gifs when handleSearchClicked is calles", async () => {
    //handleSearchClicked
    const { result } = renderHook(() => useGifs());
    await act(async () => {
      await result.current.handleSearchClicked("goku");
    });
    expect(result.current.gifs.length).toBe(10);
  });

  test("should return a list of gifs from cache", async () => {
    const { result } = renderHook(() => useGifs());
    await act(async () => {
      await result.current.handleSearchClicked("goku");
    });
    expect(result.current.gifs.length).toBe(10);

    vi.spyOn(gifsActions, "getGifsByQuery").mockRejectedValue(
      new Error("This is my custom error")
    );

    await act(async () => {
      await result.current.handleSearchClicked("goku");
    });
    expect(result.current.gifs.length).toBe(10);
  });

  test("should return no more than 3 previous searches", async () => {
    const { result } = renderHook(() => useGifs());

    vi.spyOn(gifsActions, "getGifsByQuery").mockResolvedValue([]);

    await act(async () => {
      await result.current.handleSearch("goku1");
    });
    await act(async () => {
      await result.current.handleSearch("goku2");
    });
    await act(async () => {
      await result.current.handleSearch("goku3");
    });
    await act(async () => {
      await result.current.handleSearch("goku4");
    });
    expect(result.current.previousSearches.length).toBe(3);
    expect(result.current.previousSearches).toStrictEqual([
      "goku4",
      "goku3",
      "goku2",
    ]);
  });
});
