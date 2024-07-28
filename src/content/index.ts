import { PCBridge } from "@/bridge/popup-content";
import { onReceiveReloadMsg } from "@/utils/reload";
import { onPopupMessage } from "./channel/popup";
import { LOG_LEVEL, logger } from "@/utils/logger";
import { implantScript } from "./runtime/script";

(() => {
  if (__DEV__) {
    onReceiveReloadMsg();
    logger.setLevel(LOG_LEVEL.INFO);
  }
  logger.info("Content Script Loaded");
  implantScript();
  PCBridge.onPopupMessage(onPopupMessage);
})();
