import type { Options } from "@popperjs/core";

export type ActionChild = {
  label: string;
  type?: "action";
  init: (label: string) => void;
  icon?: string;
  disabled?: boolean;
  children?: ActionChild[] | Slotname[];
  loading?: boolean;
  enabled?: boolean;
  hotkey?: {
    mac?: "command" | "alt";
    combination: string;
  };
};
export type ActionGroup = {
  label: string;
  type: "group";
  children: ActionChild[];
};

export type Slotname = string;

export type Action = ActionChild | ActionGroup | Slotname;

export type NavigationType = "click" | "hover";

export type CtxState = {
  actions: Action[];
  x: number;
  y: number;
  slot?: string;
  isOpen: boolean;
  popperOptions: Options | null;
  currentAction: Action | null;
  options: ExplorerOptions | null;
  normalized: boolean;
};

export type ExplorerOptions = {
  /**
   * The area to which the context menu will be attached
   * meaning it will only work in this area
   * can be a string for querySelector or an HTMLElement
   * @default document.body
   */
  area?: HTMLElement | string;
  /**
   * The main actions to be displayed in the context menu all the time
   */
  actions?: Action[];
  /**
   * Popper.js options can be adjusted here, you will also get the current config so you can write on top
   * Without any config this package uses
   * {
   *   modifiers: [
   *     {
   *       name: "offset",
   *       options: {
   *         offset: [0, 8],
   *       },
   *     },
   *     preventOverflow,
   *     flip,
   *   ],
   *   strategy: "absolute",
   *   placement: "right-start",
   * }
   */
  popperOptions?: Options;
};
