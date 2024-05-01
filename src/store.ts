import { ref } from "vue";
import type { CtxState } from "@/types";
import { defaultOptions } from "@/constants";

const state = ref<CtxState>(defaultOptions);

export const useContextMenu = () => ({
  state,
});
