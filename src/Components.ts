const isDev = process.env.NODE_ENV === "development";

let ContextGroup: typeof import("@/components/ContextGroup.vue").default;
let ContextOption: typeof import("@/components/ContextOption.vue").default;
let ContextMenu: typeof import("@/components/ContextMenu.vue").default;

if (isDev) {
  ContextGroup = require("@/components/ContextGroup.dev.vue");
  ContextOption = require("@/components/ContextOption.dev.vue");
  ContextMenu = require("@/components/ContextMenu.dev.vue");
} else {
  ContextGroup = require("@/components/ContextGroup.vue");
  ContextOption = require("@/components/ContextOption.vue");
  ContextMenu = require("@/components/ContextMenu.vue");
}

export { ContextGroup, ContextOption, ContextMenu };
