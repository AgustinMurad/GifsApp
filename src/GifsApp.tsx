import { useState } from "react";
import { CustomHeader } from "./components/CustomHeader";

import { SearchBar } from "./components/SearchBar";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { GifsList } from "./gifs/components/GifsList";

import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action";
import type { Gif } from "./gifs/interfaces/gif.interface";

export const GifsApp = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousSearches, setPreviousSearches] = useState<string[]>([]);

  const handleSearchClicked = (search: string) => {
    console.log({ search });
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
  return (
    <>
      {/** Header */}
      <CustomHeader
        title="Buscador de gifs"
        description="Descubre y comparte el gif perfecto"
      />
      {/** Search */}
      <SearchBar placeholder="Buscar tus gifs" onQuery={handleSearch} />

      {/** Busquedas previas */}
      <PreviousSearches
        title="Busquedas previas"
        searches={previousSearches}
        onLabelClicked={handleSearchClicked}
      />

      {/** GifsList: Prop => gifs: Gif[] */}
      <GifsList gifs={gifs} />
    </>
  );
};
