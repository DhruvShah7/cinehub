import {
  DesktopOutlined,
  HomeOutlined,
  SearchOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import useIsMobile from "../../../custom-hooks/useIsMobile";

interface DrawerPropTypes {
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const Drawer = ({ isDrawerOpen, openDrawer, closeDrawer }: DrawerPropTypes) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(1);

  const isMobile = useIsMobile();

  const handleMenuItemClick = (index: number) => {
    setSelectedMenuItem(index);
  };

  return (
    <>
      {!isMobile && (
        <div className="drawer-container">
          {isDrawerOpen && <div className="backdrop" onClick={closeDrawer} />}
          <div className={isDrawerOpen ? "drawer open" : "drawer"}>
            <div
              className="menu"
              onMouseOver={openDrawer}
              onMouseLeave={closeDrawer}
            >
              <div className="menu-item" onClick={() => handleMenuItemClick(0)}>
                <span
                  className={`icon ${selectedMenuItem === 0 ? "selected" : ""}`}
                >
                  <SearchOutlined />
                </span>
                {isDrawerOpen && (
                  <span
                    className={`text ${selectedMenuItem === 0 ? "selected" : ""}`}
                  >
                    Search
                  </span>
                )}
              </div>
              <div className="menu-item" onClick={() => handleMenuItemClick(1)}>
                <span
                  className={`icon ${selectedMenuItem === 1 ? "selected" : ""}`}
                >
                  <HomeOutlined />
                </span>
                {isDrawerOpen && (
                  <span
                    className={`text ${selectedMenuItem === 1 ? "selected" : ""}`}
                  >
                    Home
                  </span>
                )}
              </div>
              <div className="menu-item" onClick={() => handleMenuItemClick(2)}>
                <span
                  className={`icon ${selectedMenuItem === 2 ? "selected" : ""}`}
                >
                  <VideoCameraOutlined />
                </span>
                {isDrawerOpen && (
                  <span
                    className={`text ${selectedMenuItem === 2 ? "selected" : ""}`}
                  >
                    Movies
                  </span>
                )}
              </div>
              <div className="menu-item" onClick={() => handleMenuItemClick(3)}>
                <span
                  className={`icon ${selectedMenuItem === 3 ? "selected" : ""}`}
                >
                  <DesktopOutlined />
                </span>
                {isDrawerOpen && (
                  <span
                    className={`text ${selectedMenuItem === 3 ? "selected" : ""}`}
                  >
                    TV Shows
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Drawer;
