import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";
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
        target: "es2015", // Оптимизация для современных браузеров
        minify: "terser", // Минификация с использованием Terser
        terserOptions: {
            compress: {
                drop_console: true, // Удаление console.log
                drop_debugger: true, // Удаление debugger
            },
        },
        chunkSizeWarningLimit: 500, // Лимит предупреждения для больших чанков (можно настроить)
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        return id.toString().split("node_modules/")[1].split("/")[0]; // Разделение внешних библиотек
                    }
                },
            },
        },
    },
});
