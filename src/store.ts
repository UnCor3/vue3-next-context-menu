import { ref } from "vue";
import type { CtxState } from "@/types";
import { defaultOptions } from "@/constants";
// import { handleContextApi } from "@/utils/api";

const state = ref<CtxState>(defaultOptions);

export const useContextMenu = () => ({
  state,
  // api: handleContextApi(state),
});
