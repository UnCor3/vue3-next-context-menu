import { type App } from "vue";

export const ContextOptionReg = {
  install: (app: App) => {
    app.component(
      "ContextOption",
      () => import("./components/ContextOption.vue")
    );
  },
};

export const ContextGroupReg = {
  install: (app: App) => {
    app.component(
      "ContextGroup",
      () => import("./components/ContextGroup.vue")
    );
  },
};

// const state = ref<CtxState>({
//   isOpen: false,
//   x: 0,
//   y: 0,
//   actions: [],
//   //initializing as null to prevent errors in server side
//   popperOptions: null,
//   currentAction: null,
//   options: null,
//   normalized: false,
// });

// export const useContextMenu = () => ({
//   state,
// });

// watch(
//   state,
//   (newState) => {
//     console.log(newState);
//   },
//   { immediate: true }
// );
