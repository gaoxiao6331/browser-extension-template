import { logger } from "@/utils/logger";
import type { CIRequestType } from "@/bridge/content-inject/request";
import { CONTENT_TO_INJECT_REQUEST } from "@/bridge/content-inject/request";
import React from "react";
import ReactDOM from "react-dom";

let HELLO_WORLD_CONTAINER: HTMLDivElement | null;

export const onContentMessage = () => {
  return (data: CIRequestType) => {
    logger.info("Inject Receive Content Message", location.host, data);
    switch (data.type) {
      case CONTENT_TO_INJECT_REQUEST.HELLO_WORLD: {
        if (data.payload.enable) {
          if (!HELLO_WORLD_CONTAINER) {
            HELLO_WORLD_CONTAINER = document.createElement("div");
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
    }
  };
};
