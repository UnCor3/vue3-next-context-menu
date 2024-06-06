import { ContextApiHandler } from "@/utils/api";
import { defaultOptions } from "@/constants";
import type { CtxState } from "@/types";
import { ref } from "vue";

export const instances: Record<
  string,
  {
    api: ContextApiHandler;
    state: ReturnType<typeof ref<CtxState>>;
  }
> = {};

export const setInstance = (id: string) => {
  const state = ref<CtxState>(defaultOptions);
  const api = new ContextApiHandler(state);

  instances[id] = {
    api,
    state,
  };
};

export function useContextMenu(id = "default") {
  return instances[id];
}
