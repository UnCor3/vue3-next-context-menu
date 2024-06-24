import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import vitePluginRequire from "vite-plugin-require";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  build: {
    outDir: "web",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    vue(),
    //@ts-ignore
    vitePluginRequire.default(),
  ],
});
