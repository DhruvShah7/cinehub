import { ReactNode, useState } from "react";
import CommonContext from "./CommonContext";

const CommonContextProvider = ({ children }: { children: ReactNode }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <CommonContext.Provider value={{ isDrawerOpen, openDrawer, closeDrawer }}>
      {children}
    </CommonContext.Provider>
  );
};

export default CommonContextProvider;
