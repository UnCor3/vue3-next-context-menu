import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  plugins: [
    vue(),
    nodePolyfills({
      overrides: {
        fs: "memfs",
      },
    }),
  ],
});
