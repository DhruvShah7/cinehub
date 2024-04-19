import { FilterOutlined } from "@ant-design/icons";
import { Button } from "antd";
import StickyHeader from "../../components/StickyHeader";
import useIsMobile from "../../custom-hooks/useIsMobile";
import TvsListsDisplay from "./components/TvsListsDisplay";

const TvsHeaderAndFilter = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
    }}
  >
    <h2 style={{ margin: 0, display: "inline-block" }}>TV SHOWS</h2>
    <Button type={"text"} size={"large"} icon={<FilterOutlined />} />
  </div>
);

const TVShows: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <StickyHeader>
        <TvsHeaderAndFilter />
      </StickyHeader>
      {isMobile && <TvsHeaderAndFilter />}
      <TvsListsDisplay />
    </>
  );
};

export default TVShows;
