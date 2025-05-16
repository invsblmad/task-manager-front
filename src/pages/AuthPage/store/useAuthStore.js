import { create } from "zustand";

export const useAuthStore = create((set) => ({
    accessToken: null,

    login: async (email, password) => {
        const res = await fetch("http://localhost:8080/trusted/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Login failed");
        }

        const data = await res.json();
        set({ accessToken: data.accessToken });
        localStorage.setItem("refreshToken", data.refreshToken);

        return data.user;
    },

    initializeToken: () => {
        const refreshToken = localStorage.getItem("refreshToken");
    },
}));
