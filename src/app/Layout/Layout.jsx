import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

export const Layout = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    );
};
