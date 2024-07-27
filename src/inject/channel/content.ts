import type { WebSite } from "../types/website";
import { CONTEXT_MENU_TYPE, COPY_TYPE, KEYBOARD_TYPE } from "@/utils/constant";
import { logger } from "@/utils/logger";
import { DOM_STAGE } from "@/utils/constant";
import type { CIRequestType } from "@/bridge/content-inject/request";
import {
  CI_EXECUTION_ENUM,
  CONTENT_TO_INJECT_REQUEST,
} from "@/bridge/content-inject/request";
import React from "react";
import ReactDOM from "react-dom";

let HELLO_WORLD_CONTAINER: HTMLDivElement | null;

export const onContentMessage = (handler: WebSite) => {
  return (data: CIRequestType) => {
    logger.info("Inject Receive Content Message", location.host, data);
    switch (data.type) {
      case CONTENT_TO_INJECT_REQUEST.HELLO_WORLD: {
        if (data.payload.enable) {
          if (!HELLO_WORLD_CONTAINER) {
            HELLO_WORLD_CONTAINER = document.createElement("div");
            HELLO_WORLD_CONTAINER.id = HELLO_WORLD_CONTAINER_ID;
            document.body.appendChild(HELLO_WORLD_CONTAINER);
            ReactDOM.render(
              React.createElement(
                "div",
                {
                  style: {
                    position: "fixed",
                    zIndex: 2147483647,
                    top: 0,
                    width: "100vw",
                    height: "100vh",
                    backdropFilter: "blur(4px)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 100,
                    pointerEvents: "none",
                  },
                },
                "HELLO WORLD",
              ),
              HELLO_WORLD_CONTAINER,
            );
          }
        } else {
          if (!HELLO_WORLD_CONTAINER) {
            console.error(
              "don't have the container node, maybe something unexpected happened",
            );
            return;
          }

          document.body.removeChild(HELLO_WORLD_CONTAINER);
          HELLO_WORLD_CONTAINER = null;
        }
        break;
      }
      case CONTENT_TO_INJECT_REQUEST.COPY_TYPE: {
        data.payload === CI_EXECUTION_ENUM.START
          ? handler.start(COPY_TYPE, DOM_STAGE.END)
          : handler.close(COPY_TYPE);
        break;
      }
      case CONTENT_TO_INJECT_REQUEST.KEYBOARD_TYPE: {
        data.payload === CI_EXECUTION_ENUM.START
          ? handler.start(KEYBOARD_TYPE, DOM_STAGE.END)
          : handler.close(KEYBOARD_TYPE);
        break;
      }
      case CONTENT_TO_INJECT_REQUEST.CONTEXT_MENU_TYPE: {
        data.payload === CI_EXECUTION_ENUM.START
          ? handler.start(CONTEXT_MENU_TYPE, DOM_STAGE.END)
          : handler.close(CONTEXT_MENU_TYPE);
        break;
      }
    }
  };
};
