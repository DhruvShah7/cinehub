import { MenuOutlined } from "@ant-design/icons";
import { ReactNode } from "react";
import useCommonContext from "../../HOCs/Context/useCommonContext";
import cinehubLogo from "../../assets/cinehub-logo.svg";
import useIsMobile from "../../custom-hooks/useIsMobile";
import "./sticky-header.css";

type StickyHeaderPropsType = { children?: ReactNode };

const StickyHeader = ({ children }: StickyHeaderPropsType) => {
  const { openDrawer } = useCommonContext();

  const isMobile = useIsMobile();

  return (
    <header className="sticky-header">
      <div className="dashboard-logo">
        {isMobile && (
          <MenuOutlined style={{ fontSize: 26 }} onClick={openDrawer} />
        )}
        <img src={cinehubLogo} alt="cinehub-logo" width={"160px"} />
      </div>
      {!isMobile && <div className="right-side-content">{children}</div>}
    </header>
  );
};

export default StickyHeader;
