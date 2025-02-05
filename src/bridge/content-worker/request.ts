import type { Reflex } from "@/utils/types";
import { MARK } from "./constant";

const CW_REQUEST_TYPE = ["RELOAD"] as const;
export const CONTENT_TO_WORKER_REQUEST = CW_REQUEST_TYPE.reduce(
  (acc, cur) => ({ ...acc, [cur]: `__${cur}__${MARK}__` }),
  {},
) as { [K in (typeof CW_REQUEST_TYPE)[number]]: `__${K}__${typeof MARK}__` };

type EventMap = {
  [CONTENT_TO_WORKER_REQUEST.RELOAD]: null;
};

export type CWRequestType = Reflex.Tuple<EventMap>;
