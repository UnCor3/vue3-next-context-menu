import { inject } from "vue";

const isCtxMenu = inject("isCtxMenu");
console.log(isCtxMenu);
if (!isCtxMenu) throw new Error("ContextGroup must be a child of ContextMenu");
