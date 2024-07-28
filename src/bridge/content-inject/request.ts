import type { Reflex } from "@/utils/types";
import { MARK } from "./constant";

// content to inject message type
const CI_REQUEST_ENUM = ["HELLO_WORLD"] as const;

export const CONTENT_TO_INJECT_REQUEST = CI_REQUEST_ENUM.reduce(
  (acc, cur) => ({ ...acc, [cur]: `__${cur}__${MARK}__` }),
  {},
) as { [K in (typeof CI_REQUEST_ENUM)[number]]: `__${K}__${typeof MARK}__` };

export type EventMap = {
  [CONTENT_TO_INJECT_REQUEST.HELLO_WORLD]: { enable: boolean };
};

export type CIRequestType = Reflex.Tuple<EventMap>;
