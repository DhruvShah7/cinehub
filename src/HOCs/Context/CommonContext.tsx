import { createContext } from "react";

interface CommonContextType {
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CommonContext = createContext<CommonContextType>({
  isDrawerOpen: false,
  openDrawer: () => null,
  closeDrawer: () => null,
});

export default CommonContext;
