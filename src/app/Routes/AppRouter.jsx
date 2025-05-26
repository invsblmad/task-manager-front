import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PATH } from "@utils/Constants/Constants";
import { Layout } from "@app/Layout/Layout";
import { HomePage } from "@pages/HomePage/HomePage";
import { AuthPage } from "@pages/AuthPage/components/AuthPage";
import { ProtectedRoute } from "@components/ProtectedRoute";
import { TaskPage } from "@pages/TaskPage/TaskPage";
import { TaskDetailPage } from "@pages/TaskDetailPage/TaskDetailPage";
import { initialColumns } from "@utils/Constants/Constants";

export const AppRouter = () => {
    const [tasks, setTasks] = useState(initialColumns);

    const router = createBrowserRouter([
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
                    path: PATH.tasks,
                    element: <Layout />,
                    children: [
                        {
                            index: true,
                            element: <TaskPage />,
                        },
                        {
                            path: `${PATH.tasks}/:taskId`,
                            element: (
                                <TaskDetailPage
                                    tasks={tasks}
                                    setTasks={setTasks}
                                />
                            ),
                        },
                    ],
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
};
