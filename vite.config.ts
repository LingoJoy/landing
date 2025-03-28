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
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/@reduxjs/toolkit') || id.includes('node_modules/react-redux')) {
            return 'redux-vendor';
          }
          
          if(id.includes('node_modules/@paddle/paddle-js')) {
            return 'paddle-vendor';
          }

          if(id.includes('node_modules/@socket.io/component-emitter')) {
            return 'socket-vendor';
          }
        }
      }
    }
  }
});
