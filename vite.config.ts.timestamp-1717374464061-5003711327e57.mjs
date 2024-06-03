// vite.config.ts
import { defineConfig } from "file:///D:/JavaScript/vue3-context-menu/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/JavaScript/vue3-context-menu/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vitePluginRequire from "file:///D:/JavaScript/vue3-context-menu/node_modules/vite-plugin-require/dist/index.js";
import dts from "file:///D:/JavaScript/vue3-context-menu/node_modules/vite-plugin-dts/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "D:\\JavaScript\\vue3-context-menu";
var vite_config_default = defineConfig({
  base: "./",
  build: {
    // target: "esnext",
    lib: {
      entry: [
        path.resolve(__vite_injected_original_dirname, "src/index.ts"),
        path.resolve(__vite_injected_original_dirname, "src/Components.ts")
      ],
      formats: ["es"],
      fileName: (format, name) => {
        return `${name}.${format}.js`;
      }
    },
    rollupOptions: {
      external: ["vue", "@popperjs/core", "@popperjs/core/lib/modifiers"],
      output: {
        globals: {
          vue: "Vue",
          "@popperjs/core": "@popperjs/core",
          "@popperjs/core/lib/modifiers": "@popperjs/core/lib/modifiers"
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src")
    }
  },
  plugins: [
    vue(),
    dts({}),
    //@ts-ignore
    vitePluginRequire.default()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxKYXZhU2NyaXB0XFxcXHZ1ZTMtY29udGV4dC1tZW51XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxKYXZhU2NyaXB0XFxcXHZ1ZTMtY29udGV4dC1tZW51XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9KYXZhU2NyaXB0L3Z1ZTMtY29udGV4dC1tZW51L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IHZpdGVQbHVnaW5SZXF1aXJlIGZyb20gXCJ2aXRlLXBsdWdpbi1yZXF1aXJlXCI7XG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBiYXNlOiBcIi4vXCIsXG4gIGJ1aWxkOiB7XG4gICAgLy8gdGFyZ2V0OiBcImVzbmV4dFwiLFxuICAgIGxpYjoge1xuICAgICAgZW50cnk6IFtcbiAgICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvaW5kZXgudHNcIiksXG4gICAgICAgIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL0NvbXBvbmVudHMudHNcIiksXG4gICAgICBdLFxuICAgICAgZm9ybWF0czogW1wiZXNcIl0sXG4gICAgICBmaWxlTmFtZTogKGZvcm1hdCwgbmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gYCR7bmFtZX0uJHtmb3JtYXR9LmpzYDtcbiAgICAgIH0sXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1widnVlXCIsIFwiQHBvcHBlcmpzL2NvcmVcIiwgXCJAcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzXCJdLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICB2dWU6IFwiVnVlXCIsXG4gICAgICAgICAgXCJAcG9wcGVyanMvY29yZVwiOiBcIkBwb3BwZXJqcy9jb3JlXCIsXG4gICAgICAgICAgXCJAcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzXCI6IFwiQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVyc1wiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgZHRzKHt9KSwgLy9AdHMtaWdub3JlXG4gICAgdml0ZVBsdWdpblJlcXVpcmUuZGVmYXVsdCgpLFxuICBdLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFSLFNBQVMsb0JBQW9CO0FBQ2xULE9BQU8sU0FBUztBQUNoQixPQUFPLHVCQUF1QjtBQUM5QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBSmpCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQTtBQUFBLElBRUwsS0FBSztBQUFBLE1BQ0gsT0FBTztBQUFBLFFBQ0wsS0FBSyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxRQUN0QyxLQUFLLFFBQVEsa0NBQVcsbUJBQW1CO0FBQUEsTUFDN0M7QUFBQSxNQUNBLFNBQVMsQ0FBQyxJQUFJO0FBQUEsTUFDZCxVQUFVLENBQUMsUUFBUSxTQUFTO0FBQzFCLGVBQU8sR0FBRyxJQUFJLElBQUksTUFBTTtBQUFBLE1BQzFCO0FBQUEsSUFDRjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLE9BQU8sa0JBQWtCLDhCQUE4QjtBQUFBLE1BQ2xFLFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLEtBQUs7QUFBQSxVQUNMLGtCQUFrQjtBQUFBLFVBQ2xCLGdDQUFnQztBQUFBLFFBQ2xDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDcEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixJQUFJLENBQUMsQ0FBQztBQUFBO0FBQUEsSUFDTixrQkFBa0IsUUFBUTtBQUFBLEVBQzVCO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
