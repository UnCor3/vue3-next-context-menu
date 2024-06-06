import { Options as PopperOptions } from "@popperjs/core";
import { ref } from "vue";

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
   * The function to be called when the action is clicked, you will get the passed props as params, return truthy to keep the context menu open
   * @example () => {
   *  console.log("Copy")
   *  return true // does not close the context menu
   * }
   */
  init: (props: Action) => Boolean | void;
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
   * you can either make an raw import of an svg or pass the svg as string it'll be parsed to html or just pass a slot for Icon check the docs for more info
   * @example import Svg from "@/assets/icon.svg?raw"
   */
  icon?: string;
  /**
   * If true icon space will be preserved even if there is no icon passed
   */
  preserveIconSpace?: boolean;
  /**
   * If passed it can't accept any children it will just be a switch, you will get the state of the switch in the init function with a property called isActive
   * @example
   * function init (props)  {
   * console.log(props.isActive) // true or false
   * }
   */
  switch?: {
    isActive: boolean;
  };
  openHoverMenuWhenDisabled?: boolean;
};
export type ActionGroup = {
  label: string;
  type?: "group";
  showLabel?: boolean;
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
  /**
   * The slot name to be used as parent in the context menu
   */
  parentSlot?: string;
  /**
   * The slot name to be used as child in the context menu
   */
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
   * The x position of the context menu
   */
  x: number;
  /**
   * The y position of the context menu
   */
  y: number;
  /**
   * Is the context menu open or not
   */
  isOpen: boolean;
  /**
   * Passed options
   */
  options: InternalOptions | {};
  /**
   * Ref to the context menu element will be defined once mounted
   */
  ctxRef: HTMLElement | null;
  overflowProtection?: boolean;
  /**
   * Internal property do not set it to something else
   */
  readonly __ignoreBlur: boolean;
  /**
   * Internal property do not set it to something else
   */

  readonly __destroyed: boolean;
  /**
   * Internal property do not set it to something else
   */
  readonly currentAction: Action | null;
  /**
   *
   *
   */
  readonly instanceId: string;
};

export type InternalOptions = {
  area: HTMLElement;
  popperOptions: PopperOptions;
  theme: "light" | "dark";
};

export type Options = {
  /**
   * The area to which the context menu will be attached
   * meaning it will only work in this area
   * can be a string for querySelector or an HTMLElement
   * @default document.body
   */
  area?: HTMLElement | ReturnType<typeof ref<HTMLElement>> | string;
  /**
   * Popper.js options can be adjusted here, you will also get the current config so you can write on top
   * Without any config this package uses
   * {
   *   modifiers: [
   *     {
   *       name: "offset",
   *       options: {
   *         offset: [0, remToPx(0.5)],
   *       },
   *     },
   *     preventOverflow,
   *     flip,
   *   ],
   *   strategy: "absolute",
   *   placement: "right-start",
   * }
   */
  popperOptions?: (defaultOptions: PopperOptions) => PopperOptions;
  /**
   * The theme of the context menu
   * @default "dark"
   */
  theme?: "light" | "dark";
  /**
   * If enabled you can only use go 1 level deep in the context menu
   * @default true
   */
  overflowProtection?: boolean;
  id?: string;
};

export type CtxRef = ReturnType<typeof ref<CtxState>>;
