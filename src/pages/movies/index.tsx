import { FilterOutlined } from "@ant-design/icons";
import { Button } from "antd";
import StickyHeader from "../../components/StickyHeader";
import useIsMobile from "../../custom-hooks/useIsMobile";
import ListsDisplay from "./components/ListsDisplay";

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
  return (
    <>
      <StickyHeader>
        <MoviesHeaderAndFilter />
      </StickyHeader>
      {/* <Banner /> */}
      {/* <Suspense fallback={<>Loading...2</>}> */}
      {isMobile && <MoviesHeaderAndFilter />}
      <ListsDisplay />
      {/* </Suspense> */}
    </>
  );
};

export default Movies;
