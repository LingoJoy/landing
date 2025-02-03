import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";
import viteCompression from 'vite-plugin-compression';
import svgr from "vite-plugin-svgr";
export default defineConfig({
    plugins: [
        react(),
        svgr({
            svgrOptions: {
                exportType: "default",
                ref: true,
                svgo: false,
                titleProp: true,
            },
            include: "**/*.svg",
        }),
        viteCompression(),
    ],
    resolve: {
        alias: {
            "@styles": path.resolve(__dirname, "src/styles"),
            "@": path.resolve(__dirname, "./src")
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@styles/variables.scss";`,
            },
        },
    },
});
