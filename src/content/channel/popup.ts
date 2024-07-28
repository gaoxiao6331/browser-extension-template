import { CONTEXT_MENU_TYPE, COPY_TYPE, KEYBOARD_TYPE } from "@/utils/constant";
import { isInIframe } from "@/utils/is";
import { logger } from "@/utils/logger";
import { storage } from "laser-utils";
import type { PCRequestType } from "@/bridge/popup-content/request";
import { POPUP_TO_CONTENT_REQUEST } from "@/bridge/popup-content/request";
import { CIBridge } from "@/bridge/content-inject";
import { CONTENT_TO_INJECT_REQUEST } from "@/bridge/content-inject/request";
import { PC_QUERY_STATE_ENUM } from "@/bridge/popup-content/response";

export const onPopupMessage = (data: PCRequestType) => {
  logger.info("Content Receive Popup Message", location.host, data);
  switch (data.type) {
    case POPUP_TO_CONTENT_REQUEST.HELLO_WORLD: {
      CIBridge.postToInject({
        type: CONTENT_TO_INJECT_REQUEST.HELLO_WORLD,
        payload: data.payload,
      });
      break;
    }
  }
};
