import { useState } from "react";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";
import type { Gif } from "../interfaces/gif.interface";
export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousSearches, setPreviousSearches] = useState<string[]>([]);

  const handleSearchClicked = async (search: string) => {
    const gifs = await getGifsByQuery(search);
    setGifs(gifs);
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
  };

  return {
    //Props
    gifs,
    //Methods
    handleSearch,
    handleSearchClicked,
    previousSearches,
  };
};
