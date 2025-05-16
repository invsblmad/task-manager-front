import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "@utils/Constants/Constants";

// export const ProtectedRoute = () => {
//     return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
// };

//for a while, in production will be the code above
export const ProtectedRoute = () => {
    return <Outlet />;
};
