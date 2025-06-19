import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios";
import { TMDB_DISCOVER_URL } from "../../../constants/api-routes";

const useFetchTvShows = () => {
  return useInfiniteQuery({
    queryKey: ["discover-tvshows"],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const response = await axios.get(
        `${TMDB_DISCOVER_URL("tv")}&page=${pageParam}`
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

export default useFetchTvShows;
