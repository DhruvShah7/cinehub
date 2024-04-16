import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  GET_GENRE_MOVIES,
  POPULAR,
  TMDB_GENRE_URL,
  TOP_RATED,
} from "../../../constants/api-routes";
import { GenreType } from "../types";
import GenreSection from "./GenreSection";

const ListsDisplay = () => {
  const { error, data: genreList } = useSuspenseQuery({
    queryKey: ["genre-list"],
    queryFn: async () => {
      const response = await axios.get(TMDB_GENRE_URL);
      return response.data?.genres;
    },
  });

  if (error) return <>Error!</>;

  return (
    <>
      <GenreSection
        key={"popular"}
        id={"popular"}
        title={"Popular"}
        fetchUrl={POPULAR}
        size="lg"
      />
      <GenreSection
        key={"top-rated"}
        id={"top-rated"}
        title={"Top rated"}
        fetchUrl={TOP_RATED}
      />
      <>
        {genreList?.map((genre: GenreType) => (
          <GenreSection
            key={genre.id}
            id={genre.id}
            title={genre.name}
            fetchUrl={`${GET_GENRE_MOVIES}${genre.id}`}
          />
        ))}
      </>
    </>
  );
};

export default ListsDisplay;
