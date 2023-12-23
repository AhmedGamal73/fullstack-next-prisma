import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <div className="pl-0 pr-2rem">{props.children}</div>
  </div>
);

export default Layout;
