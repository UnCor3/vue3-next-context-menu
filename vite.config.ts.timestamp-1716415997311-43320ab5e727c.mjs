// vite.config.ts
import { defineConfig } from "file:///D:/JavaScript/vue3-context-menu/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/JavaScript/vue3-context-menu/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import dts from "file:///D:/JavaScript/vue3-context-menu/node_modules/vite-plugin-dts/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "D:\\JavaScript\\vue3-context-menu";
var vite_config_default = defineConfig({
  base: "./",
  build: {
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
  plugins: [vue(), dts({})]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxKYXZhU2NyaXB0XFxcXHZ1ZTMtY29udGV4dC1tZW51XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxKYXZhU2NyaXB0XFxcXHZ1ZTMtY29udGV4dC1tZW51XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9KYXZhU2NyaXB0L3Z1ZTMtY29udGV4dC1tZW51L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IGR0cyBmcm9tIFwidml0ZS1wbHVnaW4tZHRzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYmFzZTogXCIuL1wiLFxuICBidWlsZDoge1xuICAgIGxpYjoge1xuICAgICAgZW50cnk6IFtcbiAgICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvaW5kZXgudHNcIiksXG4gICAgICAgIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL0NvbXBvbmVudHMudHNcIiksXG4gICAgICBdLFxuICAgICAgZm9ybWF0czogW1wiZXNcIl0sXG4gICAgICBmaWxlTmFtZTogKGZvcm1hdCwgbmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gYCR7bmFtZX0uJHtmb3JtYXR9LmpzYDtcbiAgICAgIH0sXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1widnVlXCIsIFwiQHBvcHBlcmpzL2NvcmVcIiwgXCJAcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzXCJdLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICB2dWU6IFwiVnVlXCIsXG4gICAgICAgICAgXCJAcG9wcGVyanMvY29yZVwiOiBcIkBwb3BwZXJqcy9jb3JlXCIsXG4gICAgICAgICAgXCJAcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzXCI6IFwiQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVyc1wiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbdnVlKCksIGR0cyh7fSldLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFSLFNBQVMsb0JBQW9CO0FBQ2xULE9BQU8sU0FBUztBQUNoQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBSGpCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQSxNQUNILE9BQU87QUFBQSxRQUNMLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsUUFDdEMsS0FBSyxRQUFRLGtDQUFXLG1CQUFtQjtBQUFBLE1BQzdDO0FBQUEsTUFDQSxTQUFTLENBQUMsSUFBSTtBQUFBLE1BQ2QsVUFBVSxDQUFDLFFBQVEsU0FBUztBQUMxQixlQUFPLEdBQUcsSUFBSSxJQUFJLE1BQU07QUFBQSxNQUMxQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxPQUFPLGtCQUFrQiw4QkFBOEI7QUFBQSxNQUNsRSxRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDUCxLQUFLO0FBQUEsVUFDTCxrQkFBa0I7QUFBQSxVQUNsQixnQ0FBZ0M7QUFBQSxRQUNsQztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLElBQ3BDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzFCLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
