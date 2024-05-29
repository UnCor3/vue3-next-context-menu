import ContextOption from "@/components/ContextOption.dev.vue";
import ContextGroup from "@/components/ContextGroup.dev.vue";
import ContextMenu from "./ContextMenu.dev.vue";

//@ts-ignore
const isDev = process.env.NODE_ENV === "development";

// if (!isDev) {
//   //@ts-ignore
//   ContextOption = import("@/components/ContextOption.vue");
//   //@ts-ignore
//   ContextGroup = import("@/components/ContextGroup.vue");
//   //@ts-ignore
//   ContextMenu = import("./ContextMenu.vue");
// } else {
//   //@ts-ignore
//   ContextOption = import("@/components/ContextOption.dev.vue");
//   //@ts-ignore
//   ContextGroup = import("@/components/ContextGroup.dev.vue");
//   //@ts-ignore
//   ContextMenu = import("./ContextMenu.dev.vue");
// }

export { ContextGroup, ContextOption, ContextMenu };
