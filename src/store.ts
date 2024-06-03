import { ref } from "vue";
import type { CtxState } from "@/types";
import { defaultOptions } from "@/constants";
import { ContextApiHandler } from "@/utils/api";

const state = ref<CtxState>(defaultOptions);
const api = new ContextApiHandler(state);
export function useContextMenu() {
  return {
    state,
    api,
  };
}
