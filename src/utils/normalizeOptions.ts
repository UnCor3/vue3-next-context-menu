import type { Options as PopperOptions } from "@popperjs/core";
import { preventOverflow, flip } from "@popperjs/core/lib/modifiers";
import type { Options } from "@/types";
import { remToPx } from "@/helpers";
import { defaultTheme } from "@/constants";
import { useContextMenu } from "@/store";
import { logError } from "@/helpers";

const isElm = (elm: any) =>
  elm instanceof HTMLElement || elm instanceof Element;

export function normalizeOptions(options: Options) {
  const { state } = useContextMenu();
  const offsetModifier = {
    name: "offset",
    options: {
      offset: [0, remToPx(0.5)],
    },
  };

  const popperOptions = {
    modifiers: [offsetModifier, preventOverflow, flip],
    strategy: "absolute",
    placement: "right-start",
  } as PopperOptions;

  state.value.options = {
    area: options.area,
    theme: options.theme || defaultTheme,
    popperOptions: options.popperOptions
      ? options.popperOptions(popperOptions)
      : popperOptions,
  };
}

export function normalizeArea(options: Options) {
  let elm;
  if (typeof options.area === "string") {
    const _elm = document.querySelector(options.area) as HTMLElement;
    if (!isElm(_elm)) return logError("Given area is not a valid HTMLElement");
    elm = _elm;
  } else if (options.area) {
    if (!isElm(options.area)) {
      return logError("Given area is not a valid HTMLElement");
    }
    elm = options.area;
  } else {
    elm = document.body;
  }

  return {
    area: elm,
  } as {
    area: HTMLElement;
  };
}
