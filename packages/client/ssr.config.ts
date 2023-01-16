import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: path.resolve(__dirname, "ssr.tsx"),
            name: "client-ssr",
            formats: ["cjs"],
        },
        rollupOptions: {
            output: {
                dir: "dist-ssr",
            },
        },
        ssr: true,
    },
    ssr: {
        format: "cjs",
    },
    resolve: {
        alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
});
