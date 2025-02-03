import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";
import viteCompression from 'vite-plugin-compression';
import svgr from "vite-plugin-svgr";
export default defineConfig({
    plugins: [
        react(),
        svgr({ svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true }, include: "**/*.svg" }),
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
    build: {
        target: "es2015",
        minify: "terser",
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        chunkSizeWarningLimit: 500,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        return id.toString().split("node_modules/")[1].split("/")[0];
                    }
                },
            },
        },
    },
});
