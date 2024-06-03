import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vitePluginRequire from "vite-plugin-require";
import dts from "vite-plugin-dts";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  build: {
    // target: "esnext",
    lib: {
      entry: [
        path.resolve(__dirname, "src/index.ts"),
        path.resolve(__dirname, "src/Components.ts"),
      ],
      formats: ["es"],
      fileName: (format, name) => {
        return `${name}.${format}.js`;
      },
    },
    rollupOptions: {
      external: ["vue", "@popperjs/core", "@popperjs/core/lib/modifiers"],
      output: {
        globals: {
          vue: "Vue",
          "@popperjs/core": "@popperjs/core",
          "@popperjs/core/lib/modifiers": "@popperjs/core/lib/modifiers",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    vue(),
    dts({}), //@ts-ignore
    vitePluginRequire.default(),
  ],
});
