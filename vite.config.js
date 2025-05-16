import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@assets": "/src/assets",
            "@pages": "/src/pages",
            "@utils": "/src/utils",
            "@modules": "/src/modules",
            "@ui": "/src/ui",
            "@app": "/src/app",
            "@Mixins": "/src/app/Style/mixins.scss",
            "@components": "/src/utils/components",
        },
    },
    build: {
        sourcemap: true,
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler",
            },
        },
    },
});
