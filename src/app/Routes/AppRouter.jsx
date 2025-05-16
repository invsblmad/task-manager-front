import { createBrowserRouter } from "react-router-dom";
import { PATH } from "@utils/Constants/Constants";
import { Layout } from "@app/Layout/Layout";
import { HomePage } from "@pages/HomePage/HomePage";
import { AuthPage } from "@pages/AuthPage/components/AuthPage";
import { ProtectedRoute } from "@components/ProtectedRoute";
import { BoardPage } from "../../pages/BoardPage/BoardPage";

export const AppRouter = createBrowserRouter([
    {
        path: PATH.login,
        element: <AuthPage />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: PATH.home,
                element: <Layout />,
                children: [
                    {
                        index: true,
                        element: <HomePage />,
                    },
                ],
            },
            {
                path: PATH.board,
                element: <Layout />,
                children: [
                    {
                        index: true,
                        element: <BoardPage />,
                    },
                ],
            },
        ],
    },
]);
