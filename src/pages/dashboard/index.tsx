import { DesktopOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Card, List, Segmented } from "antd";
import axios from "axios";
import { Suspense, useState } from "react";
import StickyHeader from "../../components/StickyHeader";
import {
  GET_DISCOVER_MOVIES,
  GET_DISCOVER_TV,
  TMDB_IMG_BASE_URL,
} from "../../constants/api-routes";
import { MovieType, TVSType } from "../../constants/types";
import "./dashboard-styles.css";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("movies");
  const { error, data: response } = useSuspenseQuery({
    queryKey: ["discover-movies-and-tvshows"],
    queryFn: async () => {
      const moviesResponse = await axios.get(GET_DISCOVER_MOVIES);
      const tvResponse = await axios.get(GET_DISCOVER_TV);
      return {
        movies: moviesResponse.data.results,
        tvs: tvResponse.data.results,
      };
    },
  });

  if (error) return <>Error!</>;

  return (
    <div>
      <StickyHeader>
        <Segmented
          size={"large"}
          defaultValue={selectedTab}
          options={[
            { label: "Movies", value: "movies", icon: <DesktopOutlined /> },
            {
              label: "TV Shows",
              value: "tv-shows",
              icon: <VideoCameraOutlined />,
            },
          ]}
          onChange={(value) => setSelectedTab(value)}
        />
      </StickyHeader>

      <div style={{ padding: "10px 20px" }}>
        <Suspense fallback={<>Loading Discover</>}>
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
            dataSource={
              selectedTab === "movies" ? response.movies : response.tvs
            }
            renderItem={(item: MovieType | TVSType) => (
              <List.Item>
                <Card
                  hoverable
                  className="item-card"
                  cover={
                    <img
                      alt={(item as MovieType).title || (item as TVSType).name}
                      src={`${TMDB_IMG_BASE_URL}/${item.poster_path}`}
                    />
                  }
                >
                  <Card.Meta
                    title={(item as MovieType).title || (item as TVSType).name}
                  />
                </Card>
              </List.Item>
            )}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
