import type { ExplorerOptions } from "@/types";
import type { Options } from "@popperjs/core";
import { defaultOptions } from "@/constants";
import { preventOverflow, flip } from "@popperjs/core/lib/modifiers";
import { remToPx } from "@/helpers";

const isElm = (elm: any) =>
  elm instanceof HTMLElement || elm instanceof Element;

export function normalizeOptions(options: ExplorerOptions) {
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
  };

  // const defaultPopperOptions = await getDefaultPopperOptions();
  const actions = [...options.actions];
  // state.value.popperOptions = options.popperOptions || defaultPopperOptions;
  return Object.assign(defaultOptions, {
    actions,
    popperOptions,
  });
}

export async function normalizeArea(options: ExplorerOptions) {
  let elm;
  if (typeof options.area === "string") {
    elm = document.querySelector(options.area) as HTMLElement;
    if (!isElm(elm)) throw new Error("Given area is not a valid HTMLElement");
  } else if (isElm(options.area)) {
    elm = options.area;
  } else {
    throw new Error("Given area is not a valid HTMLElement");
  }

  return {
    area: elm,
  };
}

const getDefaultPopperOptions = async (): Promise<Options> => {
  const { remToPx } = await import("../helpers");
  const { default: preventOverflow } = await import(
    "@popperjs/core/lib/modifiers/preventOverflow.js"
  );
  const { default: flip } = await import(
    "@popperjs/core/lib/modifiers/flip.js"
  );
  const offsetModifier = {
    name: "offset",
    options: {
      offset: [0, remToPx(0.5)],
    },
  };

  return {
    modifiers: [offsetModifier, preventOverflow, flip],
    strategy: "absolute",
    placement: "right-start",
  };
};
