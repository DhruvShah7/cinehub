import { DesktopOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Segmented } from "antd";
import { useState } from "react";
import cinehubLogo from "../../assets/cinehub-logo.svg";
import StickyHeader from "../../components/StickyHeader";
import MoviesList from "./components/MoviesList";
import TVShowsList from "./components/TVShowsList";
import "./styles/dashboard-styles.css";

type TabsType = "movies" | "tv-shows";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState<TabsType>("movies");

  return (
    <div>
      <StickyHeader>
        <div className="dashboard-logo">
          <img src={cinehubLogo} alt="cinehub-logo" width={"160px"} />
        </div>
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
      <div style={{ padding: "0px 20px" }}>
        {selectedTab === "movies" && <MoviesList />}
        {selectedTab === "tv-shows" && <TVShowsList />}
      </div>
    </div>
  );
};

export default Dashboard;
