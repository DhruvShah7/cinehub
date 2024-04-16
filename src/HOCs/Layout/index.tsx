import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Drawer from "./components/Drawer";
import "./styles/custom-layout.css";

const CustomLayout: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => {
    setDrawerOpen(true);
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <div id="app-container">
      <Drawer
        isDrawerOpen={drawerOpen}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
      />
      <div className={`main-content ${drawerOpen ? "blur" : ""}`}>
        {/* Main content here */}
        <Outlet />
      </div>
    </div>
  );
};

export default CustomLayout;
