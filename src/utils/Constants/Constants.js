export const BASE_URL = import.meta.env.VITE_API_URL;

export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};

export const PATH = {
    notFound: "*",
    home: "/",
    login: "/login",
    tasks: "/tasks",
    taskDetail: "/tasks/:id",
    team: "/team",
};

export const initialColumns = {
    todo: {
        title: "Нужно сделать",
        items: [
            {
                id: "1",
                issueKey: "PRJ-1",
                title: "Fix login bug and correct style from grey to bright Fix login bug and correct style from grey to bright Fix login bug and correct style from grey to bright",
                content: "Fix login bug and correct style from grey to bright",
                type: "bug",
                priority: "high",
                user: {
                    name: "Eldana",
                    avatar: "https://i.pravatar.cc/150?img=1",
                },
            },
            {
                id: "2",
                issueKey: "PRJ-2",
                title: "Design homepage",
                content: "Design homepage",
                type: "epic",
                priority: "lowest",
                user: {
                    name: "Sam",
                    avatar: "https://i.pravatar.cc/150?img=2",
                },
            },
        ],
    },
    inProgress: {
        title: "В процессе",
        items: [
            {
                id: "3",
                issueKey: "PRJ-3",
                title: "Create auth API",
                content: "Create auth API",
                type: "subtask",
                priority: "low",
                user: {
                    name: "Lina",
                    avatar: "https://i.pravatar.cc/150?img=3",
                },
            },
        ],
    },
    done: {
        title: "Выполнено",
        items: [],
    },
};
