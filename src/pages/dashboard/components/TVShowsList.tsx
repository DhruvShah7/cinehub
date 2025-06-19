import { useEffect } from "react";
import { Card, List } from "antd";
import { useInView } from "react-intersection-observer";

import { TMDB_IMG_BASE_URL } from "../../../constants/api-routes";
import { TVSType } from "../../../constants/types";
import useFetchTvShows from "../fetch-data/useFetchTvShows";

const TVShowsList = () => {
  const { ref, inView } = useInView();

  const {
    data: tvshows,
    error,
    fetchNextPage,
    hasNextPage,
  } = useFetchTvShows();

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
      dataSource={tvshows?.pages.flat()}
      renderItem={(item: TVSType) => (
        <List.Item ref={ref}>
          <Card
            hoverable
            className="item-card"
            cover={
              <img
                alt={item.name}
                src={`${TMDB_IMG_BASE_URL}/${item.poster_path}`}
              />
            }
          >
            <Card.Meta title={item.name} />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default TVShowsList;
