import { CustomHeader } from "./components/CustomHeader";

import { SearchBar } from "./components/SearchBar";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { GifsList } from "./gifs/components/GifsList";

import { useGifs } from "./gifs/hooks/useGifs";

export const GifsApp = () => {
  const { gifs, previousSearches, handleSearchClicked, handleSearch } =
    useGifs();
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
