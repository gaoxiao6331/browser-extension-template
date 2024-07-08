import { CONTEXT_MENU_TYPE, COPY_TYPE, KEYBOARD_TYPE } from "@/utils/constant";
import type { WebSite } from "../types/website";
import { EVENTS_ENUM, EventBus } from "../utils/bus";
import { copyKeyboardHandler, stopNativePropagation } from "../utils/events";
import { STYLE_ID, AUTO_USER_SELECT } from "../utils/styles";

export const Basic: WebSite = {
  regexp: /.*/,
  start(type) {
    console.log(type)
  },
  close(type) {
    console.log(type)
  },
};
