import type { Reflex } from "@/utils/types";
import { MARK } from "./constant";

const PC_REQUEST_TYPE = ["HELLO_WORLD"] as const;
export const POPUP_TO_CONTENT_REQUEST = PC_REQUEST_TYPE.reduce(
  (acc, cur) => ({ ...acc, [cur]: `__${cur}__${MARK}__` }),
  {},
) as { [K in (typeof PC_REQUEST_TYPE)[number]]: `__${K}__${typeof MARK}__` };

type EventMap = {
  [POPUP_TO_CONTENT_REQUEST.HELLO_WORLD]: { enable: boolean };
};

export type PCRequestType = Reflex.Tuple<EventMap>;
