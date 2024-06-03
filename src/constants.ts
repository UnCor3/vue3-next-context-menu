import type { CtxState } from "@/types";

export const defaultOptions = {
  isOpen: false,
  x: 0,
  y: 0,
  currentAction: null,
  options: {},
  ctxRef: null,
  __destroyed: false,
  __ignoreBlur: false,
} as CtxState;

export const unusableSlotNames = ["Icon", "Label", "Hotkey", "Check"];

export const defaultTheme = "dark";
