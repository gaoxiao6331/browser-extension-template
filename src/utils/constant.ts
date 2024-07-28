export const HELLO_WORLD = "__HELLO_WORLD";
export type ALL_ACTION_TYPE = typeof HELLO_WORLD;
export const URL_MATCH = ["https://*/*", "http://*/*", "file://*/*"];

export const DOM_STAGE = {
  START: "document-start" as const,
  END: "document-end" as const,
};
