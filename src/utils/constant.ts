export const COPY_TYPE = "__COPY__";
export const KEYBOARD_TYPE = "__KEYBOARD_TYPE__";
export const CONTEXT_MENU_TYPE = "__CONTEXT_MENU_TYPE__";
export const HELLO_WORLD = "__HELLO_WORLD";
export type ALL_ACTION_TYPE =
  | typeof COPY_TYPE
  | typeof KEYBOARD_TYPE
  | typeof CONTEXT_MENU_TYPE
  | typeof HELLO_WORLD;
export const URL_MATCH = ["https://*/*", "http://*/*", "file://*/*"];

export const DOM_STAGE = {
  START: "document-start" as const,
  END: "document-end" as const,
};
export const DOM_READY = "DOMContentLoaded";
export const DOM_LOADED = DOM_READY;
export const PAGE_LOADED = "load";
export const MOUSE_UP = "mouseup";
export const MOUSE_DOWN = "mousedown";
export const MOUSE_MOVE = "mousemove";
export const COPY = "copy";
export const SELECT_START = "selectstart";
export const CONTEXT_MENU = "contextmenu";
export const KEY_DOWN = "keydown";
export const TOUCH_START = "touchstart";
