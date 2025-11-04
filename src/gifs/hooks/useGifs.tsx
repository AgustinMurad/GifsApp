import { useState, useRef } from "react";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";
import type { Gif } from "../interfaces/gif.interface";

//const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousSearches, setPreviousSearches] = useState<string[]>([]);

  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handleSearchClicked = async (search: string) => {
    if (gifsCache.current[search]) {
      setGifs(gifsCache.current[search]);
      return;
    }

    const gifs = await getGifsByQuery(search);
    setGifs(gifs);
    gifsCache.current[search] = gifs;
  };

  const handleSearch = async (query: string) => {
    query = query.trim().toLowerCase();
    if (query.length === 0) return;

    //Evitar busquedas duplicadas
    if (previousSearches.includes(query)) return;

    // const currentSearch = previousSearches.slice(0, 7);
    // currentSearch.unshift(query);
    // setPreviousSearches(currentSearch);
    setPreviousSearches([query, ...previousSearches].splice(0, 3));

    const gifs = await getGifsByQuery(query);

    setGifs(gifs);

    gifsCache.current[query] = gifs;
  };

  return {
    //Props
    gifs,
    previousSearches,

    //Methods
    handleSearch,
    handleSearchClicked,
  };
};
