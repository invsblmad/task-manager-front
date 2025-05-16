import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu } from "@modules/Menu/Menu";
import styles from "./Layout.module.scss";

export const Layout = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className={styles.appContainer}>
            <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <main
                className={
                    menuOpen ? styles.contentShifted : styles.contentFull
                }
            >
                <Outlet />
            </main>
        </div>
    );
};
