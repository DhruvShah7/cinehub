import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import GenreSection from "../../../components/GenreSection";
import {
  GET_ITEMS_BY_GENRE,
  POPULAR,
  TMDB_GENRE_URL,
  TOP_RATED,
} from "../../../constants/api-routes";
import { GenreType } from "../../../constants/types";

const MoviesListsDisplay = () => {
  const { error, data: genreList } = useSuspenseQuery({
    queryKey: ["movies-genre-list"],
    queryFn: async () => {
      const response = await axios.get(TMDB_GENRE_URL("movie"));
      return response.data?.genres;
    },
  });

  if (error) return <>Error!</>;

  return (
    <>
      <GenreSection
        key={"popular"}
        type={"movie"}
        id={"popular"}
        title={"Popular"}
        fetchUrl={POPULAR("movie")}
        size="lg"
      />
      <GenreSection
        key={"top-rated"}
        type={"movie"}
        id={"top-rated"}
        title={"Top rated"}
        fetchUrl={TOP_RATED("movie")}
      />
      <>
        {genreList?.map((genre: GenreType) => (
          <GenreSection
            key={genre.id}
            type={"movie"}
            id={genre.id}
            title={genre.name}
            fetchUrl={`${GET_ITEMS_BY_GENRE("movie")}${genre.id}`}
          />
        ))}
      </>
    </>
  );
};

export default MoviesListsDisplay;
