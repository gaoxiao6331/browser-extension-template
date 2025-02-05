import type { CIRequestType } from "./request";
import { CONTENT_TO_INJECT_REQUEST } from "./request";
import { EVENT_TYPE, MARK } from "./constant";

export class CIBridge {
  public static readonly REQUEST = CONTENT_TO_INJECT_REQUEST;

  static postToInject(data: CIRequestType) {
    window.dispatchEvent(
      new CustomEvent(EVENT_TYPE, { detail: JSON.stringify(data) }),
    );
  }

  static onContentMessage(cb: (data: CIRequestType) => void) {
    const handler = (event: CustomEvent<string>) => {
      const data = JSON.parse(event.detail) as CIRequestType;
      if (data && data.type && data.payload) {
        cb(data);
      }
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.addEventListener(EVENT_TYPE, handler);
    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.removeEventListener(EVENT_TYPE, handler);
    };
  }

  static isCIRequestType(data: CIRequestType): data is CIRequestType {
    return data && data.type && data.type.endsWith(`__${MARK}__`);
  }
}
