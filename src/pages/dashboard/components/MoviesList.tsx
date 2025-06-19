import { useEffect } from "react";
import { Card, List, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useInView } from "react-intersection-observer";

import { TMDB_IMG_BASE_URL } from "../../../constants/api-routes";
import { MovieType } from "../../../constants/types";
import useFetchMovies from "../fetch-data/useFetchMovies";

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
