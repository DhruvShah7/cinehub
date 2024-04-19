import { useInfiniteQuery } from "@tanstack/react-query";
import { Card, List } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  TMDB_DISCOVER_URL,
  TMDB_IMG_BASE_URL,
} from "../../../constants/api-routes";
import { MovieType } from "../../../constants/types";

const MoviesList = () => {
  const { ref, inView } = useInView();

  const {
    data: movies,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["discover-movies"],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const response = await axios.get(
        `${TMDB_DISCOVER_URL("movie")}&page=${pageParam}`,
      );
      return response.data.results;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (error) return <>Error!</>;

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      dataSource={movies?.pages.flat()}
      renderItem={(item: MovieType) => (
        <List.Item ref={ref}>
          <Card
            hoverable
            className="item-card"
            cover={
              <img
                alt={item.title}
                src={`${TMDB_IMG_BASE_URL}/${item.poster_path}`}
              />
            }
          >
            <Card.Meta title={item.title} />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default MoviesList;
