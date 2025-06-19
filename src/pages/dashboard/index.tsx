import { useEffect, useState } from "react";
import { DesktopOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Segmented } from "antd";

import StickyHeader from "../../components/StickyHeader";
import useIsMobile from "../../custom-hooks/useIsMobile";
import MoviesList from "./components/MoviesList";
import TVShowsList from "./components/TVShowsList";

import "./styles/dashboard-styles.css";

type TabsType = "movies" | "tv-shows";

const Dashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<TabsType>("movies");

  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
          onChange={(value: TabsType) => setSelectedTab(value)}
        />
      </StickyHeader>
      <div style={{ padding: `0px ${isMobile ? "0px" : "20px"}` }}>
        {selectedTab === "movies" && <MoviesList />}
        {selectedTab === "tv-shows" && <TVShowsList />}
      </div>
    </div>
  );
};

export default Dashboard;
