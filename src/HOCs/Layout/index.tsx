import React from "react";
import { Outlet } from "react-router-dom";
import useIsMobile from "../../custom-hooks/useIsMobile";
import useCommonContext from "../Context/useCommonContext";
import Drawer from "./components/Drawer";
import "./styles/custom-layout-styles.css";

const CustomLayout: React.FC = () => {
  const { isDrawerOpen } = useCommonContext();

  const isMobile = useIsMobile();

  return (
    <div id="app-container">
      <Drawer />
      <div
        className={`main-content ${isDrawerOpen ? "blur" : ""} ${isMobile ? "mobile-content" : ""}`}
      >
        {/* Main content here */}
        <Outlet />
      </div>
    </div>
  );
};

export default CustomLayout;
