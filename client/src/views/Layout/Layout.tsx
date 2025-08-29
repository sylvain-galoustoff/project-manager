import React from "react";
import styles from "./Layout.module.css";
import Header from "../../components/Header/Header";
import { Outlet, useLocation } from "react-router";

const Layout: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className={`layout ${styles.layout}`}>
      <Header arrowBack={pathname.includes("dashboard") ? false : true} />
      <Outlet />
    </div>
  );
};

export default Layout;
