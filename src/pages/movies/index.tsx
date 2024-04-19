import { FilterOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect } from "react";
import StickyHeader from "../../components/StickyHeader";
import useIsMobile from "../../custom-hooks/useIsMobile";
import MoviesListsDisplay from "./components/MoviesListsDisplay";

const MoviesHeaderAndFilter = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
    }}
  >
    <h2 style={{ margin: 0, display: "inline-block" }}>MOVIES</h2>
    <Button type={"text"} size={"large"} icon={<FilterOutlined />} />
  </div>
);

const Movies: React.FC = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <StickyHeader>
        <MoviesHeaderAndFilter />
      </StickyHeader>
      {isMobile && <MoviesHeaderAndFilter />}
      <MoviesListsDisplay />
    </>
  );
};

export default Movies;
