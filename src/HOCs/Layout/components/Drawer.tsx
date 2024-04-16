import {
  DesktopOutlined,
  HomeOutlined,
  SearchOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { startTransition, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useIsMobile from "../../../custom-hooks/useIsMobile";
import { MOVIES, ROOT, TV_SHOWS } from "../../../routes";

interface DrawerPropTypes {
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const Drawer = ({ isDrawerOpen, openDrawer, closeDrawer }: DrawerPropTypes) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(ROOT);

  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    switch (pathname) {
      case MOVIES:
      case TV_SHOWS:
        setSelectedMenuItem(pathname);
        break;
      default:
        setSelectedMenuItem(ROOT);
        break;
    }
  }, []);

  const handleMenuItemClick = (route: string) => {
    setSelectedMenuItem(route);
    startTransition(() => {
      navigate(route);
    });
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
              <div
                className="menu-item"
                onClick={() => handleMenuItemClick(ROOT)}
              >
                <span className={`icon`}>
                  <SearchOutlined />
                </span>
                {isDrawerOpen && <span className={`text`}>Search</span>}
              </div>
              <div
                className="menu-item"
                onClick={() => handleMenuItemClick(ROOT)}
              >
                <span
                  className={`icon ${selectedMenuItem === ROOT ? "selected" : ""}`}
                >
                  <HomeOutlined />
                </span>
                {isDrawerOpen && (
                  <span
                    className={`text ${selectedMenuItem === ROOT ? "selected" : ""}`}
                  >
                    Home
                  </span>
                )}
              </div>
              <div
                className="menu-item"
                onClick={() => handleMenuItemClick(MOVIES)}
              >
                <span
                  className={`icon ${selectedMenuItem === MOVIES ? "selected" : ""}`}
                >
                  <VideoCameraOutlined />
                </span>
                {isDrawerOpen && (
                  <span
                    className={`text ${selectedMenuItem === MOVIES ? "selected" : ""}`}
                  >
                    Movies
                  </span>
                )}
              </div>
              <div
                className="menu-item"
                onClick={() => handleMenuItemClick(TV_SHOWS)}
              >
                <span
                  className={`icon ${selectedMenuItem === TV_SHOWS ? "selected" : ""}`}
                >
                  <DesktopOutlined />
                </span>
                {isDrawerOpen && (
                  <span
                    className={`text ${selectedMenuItem === TV_SHOWS ? "selected" : ""}`}
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
