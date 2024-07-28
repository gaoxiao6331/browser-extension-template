import { cross } from "@/utils/global";
import { logger } from "@/utils/logger";
import { URL_MATCH } from "@/utils/constant";
import type { PCRequestType } from "./request";
import { POPUP_TO_CONTENT_REQUEST } from "./request";
import { MARK } from "./constant";

export class PCBridge {
  public static readonly REQUEST = POPUP_TO_CONTENT_REQUEST;

  static async postToContent(data: PCRequestType) {
    return new Promise((resolve) => {
      cross.tabs
        .query({ active: true, currentWindow: true })
        .then((tabs) => {
          const tab = tabs[0];
          const tabId = tab && tab.id;
          const tabURL = tab && tab.url;
          if (
            tabURL &&
            !URL_MATCH.some((match) => new RegExp(match).test(tabURL))
          ) {
            resolve(null);
            return void 0;
          }
          if (tabId !== undefined) {
            cross.tabs.sendMessage(tabId, data).then(resolve);
          } else {
            resolve(null);
          }
        })
        .catch((error) => {
          logger.warning("Send Message Error", error);
        });
    });
  }

  static onPopupMessage(cb: (data: PCRequestType) => void) {
    const handler = (request: PCRequestType) => {
      cb(request);
    };
    cross.runtime.onMessage.addListener(handler);
    return () => {
      cross.runtime.onMessage.removeListener(handler);
    };
  }

  static isPCRequestType(data: PCRequestType): data is PCRequestType {
    return data && data.type && data.type.endsWith(`__${MARK}__`);
  }
}
