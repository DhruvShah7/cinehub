import {
  DesktopOutlined,
  HomeOutlined,
  SearchOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { startTransition, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import cinehubLogo from "../../../assets/cinehub-logo.svg";
import { MOVIES, ROOT, TV_SHOWS } from "../../../constants/internal-routes";
import useIsMobile from "../../../custom-hooks/useIsMobile";
import useCommonContext from "../../Context/useCommonContext";

const Drawer = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(ROOT);
  const { isDrawerOpen, openDrawer, closeDrawer } = useCommonContext();

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
      isMobile && closeDrawer();
    });
  };

  return (
    <>
      <div className="drawer-container">
        {isDrawerOpen && <div className="backdrop" onClick={closeDrawer} />}
        <div className={isDrawerOpen ? "drawer open" : "drawer"}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 15,
              visibility: isDrawerOpen ? "unset" : "hidden",
            }}
          >
            <img src={cinehubLogo} alt="cinehub-logo" width={"160px"} />
          </div>
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
          <div />
        </div>
      </div>
    </>
  );
};

export default Drawer;
