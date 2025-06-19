import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios";
import { TMDB_DISCOVER_URL } from "../../../constants/api-routes";

const useFetchMovies = () => {
  return useInfiniteQuery({
    queryKey: ["discover-movies"],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const response = await axios.get(
        `${TMDB_DISCOVER_URL("movie")}&page=${pageParam}`
      );
      return response.data.results;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });
};

export default useFetchMovies;
