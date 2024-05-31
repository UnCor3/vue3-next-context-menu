// import ContextOption from "@/components/ContextOption.dev.vue";
// import ContextGroup from "@/components/ContextGroup.dev.vue";
// import ContextMenu from "./ContextMenu.vue";

const isDev = process.env.NODE_ENV === "development";

let ContextGroup: typeof import("@/components/ContextGroup.dev.vue").default;
let ContextOption: typeof import("@/components/ContextOption.dev.vue").default;
let ContextMenu: typeof import("./ContextMenu.vue").default;
if (!isDev) {
  // @ts-ignore
  ContextOption = import("@/components/ContextOption.dev.vue");
  // @ts-ignore
  ContextGroup = import("@/components/ContextGroup.dev.vue");
  // @ts-ignore
  ContextMenu = import("./ContextMenu.vue");
} else {
  // @ts-ignore
  ContextOption = import("@/components/ContextOption.dev.vue");
  // @ts-ignore
  ContextGroup = import("@/components/ContextGroup.dev.vue");
  // @ts-ignore
  ContextMenu = import("./ContextMenu.vue");
}

export { ContextGroup, ContextOption, ContextMenu };
