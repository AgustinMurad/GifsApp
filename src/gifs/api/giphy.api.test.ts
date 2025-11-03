import { describe, test } from "node:test";
import { expect } from "vitest";
import { giphyApi } from "./giphy.api";

describe("giphy.api", () => {
  test("should be confiigures", () => {
    const params = giphyApi.defaults.params;
    expect(giphyApi.defaults.params.baseURL).toBe(
      "https://api.giphy.com/v1/gifs"
    );

    expect(params.lang).toBe("es");
    expect(params.api_key).toBe(import.meta.env.VITE_GIPHY_API_KEY);

    expect(params).toStrictEqual({
      lang: "es",
      api_key: import.meta.env.VITE_GIPHY_API_KEY,
    });
  });
});
