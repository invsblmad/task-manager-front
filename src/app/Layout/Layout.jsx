import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu } from "@modules/Menu/Menu";
import styles from "./Layout.module.scss";

export const Layout = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className={styles.appContainer}>
            <Menu />
            <Outlet />
        </div>
    );
};
