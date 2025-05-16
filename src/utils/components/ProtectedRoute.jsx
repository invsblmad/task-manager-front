import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "@utils/Constants/Constants";

export const ProtectedRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};
