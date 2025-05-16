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
