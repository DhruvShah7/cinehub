import { useEffect } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import axios from "../../../lib/axios";
import GenreSection from "../../../components/GenreSection";
import {
  GET_ITEMS_BY_GENRE,
  POPULAR,
  TMDB_GENRE_URL,
  TOP_RATED,
} from "../../../constants/api-routes";
import { GenreType } from "../../../constants/types";

const TvsListsDisplay = () => {
  const { error, data: genreList } = useSuspenseQuery({
    queryKey: ["tvs-genre-list"],
    queryFn: async () => {
      const response = await axios.get(TMDB_GENRE_URL("tv"));
      return response.data?.genres;
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (error) return <>Error!</>;

  return (
    <>
      <GenreSection
        key={"popular"}
        type={"tv"}
        id={"popular"}
        title={"Popular"}
        fetchUrl={POPULAR("tv")}
        size="lg"
      />
      <GenreSection
        key={"top-rated"}
        type={"tv"}
        id={"top-rated"}
        title={"Top rated"}
        fetchUrl={TOP_RATED("tv")}
      />
      <>
        {genreList?.map((genre: GenreType) => (
          <GenreSection
            key={genre.id}
            type={"tv"}
            id={genre.id}
            title={genre.name}
            fetchUrl={`${GET_ITEMS_BY_GENRE("tv")}${genre.id}`}
          />
        ))}
      </>
    </>
  );
};

export default TvsListsDisplay;
