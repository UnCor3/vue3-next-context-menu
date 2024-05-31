export const defaultOptions = {
  isOpen: false,
  x: 0,
  y: 0,
  actions: [],
  //initializing as null to prevent errors in server side
  popperOptions: null,
  currentAction: null,
  options: null,
  normalized: false,
};

export const unusableSlotNames = ["Icon", "Label", "Hotkey", "Check"];

export const defaultTheme = "dark";
