import { Options } from "@popperjs/core";

export type ActionChild = {
  /**
   * The label of the action must be unique, will be used as a key and to display in the context menu
   * @example "Copy"
   */
  label: string;
  /**
   * The type of the action, if it's a slot or an action
   * @default "action"
   */
  type?: "action";
  /**
   * The function to be called when the action is clicked
   * @example () => console.log("Copy")
   */
  init: (label: string) => void;
  /**
   * Action will be greyed out if disabled is true
   */
  disabled?: boolean;
  /**
   * The shotcut to be used for the action use mac property for mac shortcut icons
   */
  hotkey?: {
    mac?: "command" | "alt";
    combination: string;
  };
  /**
   * The icon to be displayed in the context menu
   * you can either make an raw import of an svg or pass the svg as string it'll be parsed to html
   * @example import Svg from "@/assets/icon.svg?raw"
   */
  icon?: string;
  children?: ActionChild[] | Slotname[];
};
export type ActionGroup = {
  label: string;
  children?: Action[];
  //ts todo
  type: "group";
};
export type Slotname = {
  /**
   * The label of the action must be unique, will be used as a key and to display in the context menu
   * @example "Copy"
   */
  label: string;
  /**
   * The type of the action, if it's a slot or an action
   * @default "action"
   */
  type: "slot";
  /**
   * Action will be greyed out if disabled is true
   */
  disabled?: boolean;
  parentSlot?: string;
  childSlot?: string;
  /**
   * The shotcut to be used for the action, use mac property for mac shortcut icons
   */
  hotkey?: {
    mac?: "command" | "alt";
    combination: string;
  };
};
export type Action = ActionChild | ActionGroup | Slotname;
export type NavigationType = "click" | "hover";
export type CtxState = {
  /**
   * Access all the actions in the context menu, any kind of manipulation can be done here
   */
  actions: Action[];
  /**
   * The x position of the context menu
   */
  x: number;
  /**
   * The y position of the context menu
   */
  y: number;
  /**
   * The slot to be used for the context menu
   */
  slot?: string;
  /**
   * Is the context menu open or not
   */
  isOpen: boolean;
  popperOptions: Options | null;
  /**
   * The current action that is being hovered on can be helpful for analytics etc
   */
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
