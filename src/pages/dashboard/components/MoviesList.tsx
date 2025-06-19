import { useEffect } from "react";
import { Card, List, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useInView } from "react-intersection-observer";

import { TMDB_IMG_BASE_URL } from "../../../constants/api-routes";
import { MovieType } from "../../../constants/types";
import useFetchMovies from "../fetch-data/useFetchMovies";
import GoogleAd from "../../../google-ads/GoogleAd";

const MoviesList = () => {
  const { ref, inView } = useInView();

  const {
    data: movies,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useFetchMovies();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading || error)
    return <Spin indicator={<LoadingOutlined spin />} size="large" />;

  // This will insert a special object at regular intervals to represent an ad
  const moviesWithAds =
    movies?.pages
      .flat()
      .reduce<(MovieType | { isAd: true })[]>((acc, item, index) => {
        acc.push(item);
        if ((index + 1) % 4 === 0) {
          acc.push({ isAd: true }); // ad placeholder
        }
        return acc;
      }, []) || [];

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
      dataSource={moviesWithAds}
      renderItem={(item: MovieType | { isAd: true }) => {
        if ("isAd" in item) {
          return (
            <List.Item>
              <GoogleAd />
            </List.Item>
          );
        }

        return (
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
        );
      }}
    />
  );
};

export default MoviesList;
