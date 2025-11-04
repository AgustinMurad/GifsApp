import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { getGifsByQuery } from "./get-gifs-by-query.action";

import AxiosMockAdapter from "axios-mock-adapter";
import { giphyApi } from "../api/giphy.api";

import { giphySearchResponseMock } from "../../../test/mock/giphy.response.data";

describe("getGifsByQuery", () => {
  let mock: AxiosMockAdapter;

  beforeEach(() => {
    mock = new AxiosMockAdapter(giphyApi);
  });

  afterEach(() => {
    mock.restore();
  });

  /*
  test("should return a list of gifs", async () => {
    const gifs = await getGifsByQuery("goku");
    const [gifs1] = gifs;

    expect(gifs.length).toBe(10);

    expect(gifs1).toStrictEqual({
      id: expect.any(String),
      title: expect.any(String),
      url: expect.any(String),
      width: expect.any(Number),
      height: expect.any(Number),
    });
  });
  */
  test("should return a list of gifs", async () => {
    mock.onGet("/search").reply(200, giphySearchResponseMock);
    const gifs = await getGifsByQuery("goku");

    expect(gifs.length).toBe(10);

    gifs.forEach((gif) => {
      expect(typeof gif.id).toBe("string");
      expect(typeof gif.title).toBe("string");
      expect(typeof gif.url).toBe("string");
      expect(typeof gif.width).toBe("number");
      expect(typeof gif.height).toBe("number");
    });
  });

  test("should return an empty list of gifs if query is empty", async () => {
    const gifs = await getGifsByQuery("");

    expect(gifs.length).toBe(0);
  });

  test("should handle error when api returns an error", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {
        // do nothing
      });

    mock.onGet("/search").reply(400, {
      message: "Bad Request",
    });

    const gifs = await getGifsByQuery("goku");

    expect(gifs.length).toBe(0);
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());

    consoleErrorSpy.mockRestore();
  });
});
