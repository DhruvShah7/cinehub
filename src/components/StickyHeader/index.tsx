import { ReactNode } from "react";
import "./sticky-header.css";

type StickyHeaderPropsType = { children: ReactNode };

const StickyHeader = ({ children }: StickyHeaderPropsType) => {
  return <header className="sticky-header">{children}</header>;
};

export default StickyHeader;
