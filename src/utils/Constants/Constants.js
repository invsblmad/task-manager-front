export const BASE_URL = import.meta.env.VITE_API_URL;

export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};

export const PATH = {
    notFound: "*",
    home: "/",
    login: "/login",
    board: "/board",
};

export const initialColumns = {
    todo: {
        title: "Нужно сделать",
        items: [
            { id: "1", content: "Task 1" },
            { id: "2", content: "Task 2" },
        ],
    },
    inProgress: {
        title: "В процессе",
        items: [{ id: "3", content: "Task 3" }],
    },
    done: {
        title: "Готово",
        items: [],
    },
};
