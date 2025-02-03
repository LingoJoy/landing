import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";
import CdnImport from 'vite-plugin-cdn-import';
import svgr from "vite-plugin-svgr";
export default defineConfig({
    plugins: [
        react(),
        svgr({
            svgrOptions: {
                exportType: "default",
                ref: true,
                svgo: true,
                titleProp: true
            },
            include: "**/*.svg"
        }),
        CdnImport({
            modules: [
                {
                    name: 'react',
                    var: 'React',
                    path: 'https://unpkg.com/react@18/umd/react.production.min.js'
                },
                {
                    name: 'react-dom',
                    var: 'ReactDOM',
                    path: 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js'
                }
            ]
        })
    ],
    resolve: {
        alias: {
            "@styles": path.resolve(__dirname, "src/styles"),
            "@": path.resolve(__dirname, "./src"),
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
                pure_getters: true,
                unsafe: true,
                passes: 3,
            },
            mangle: {
                properties: {
                    regex: /^_/,
                },
            },
        },
        chunkSizeWarningLimit: 500,
        rollupOptions: {
            external: ['react', 'react-dom'], // Исключаем react и react-dom из бандла
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        if (id.includes("react"))
                            return "react"; // React будет на CDN
                        if (id.includes("@mui/material"))
                            return "mui";
                        if (id.includes("@reduxjs/toolkit") || id.includes("react-redux"))
                            return "redux";
                        if (id.includes("i18next") || id.includes("react-i18next"))
                            return "i18n";
                        return "vendor";
                    }
                },
            },
        },
    },
});
