import type { FC } from "react";
import { useEffect, useLayoutEffect, useState } from "react";
import { Switch, Grid } from "@arco-design/web-react";
import {
  IconGithub,
  IconQuestionCircle,
  IconRefresh,
} from "@arco-design/web-react/icon";
import { cs } from "laser-utils";
import { PCBridge } from "@/bridge/popup-content";
import { I18n } from "../i18n";
import { cross } from "@/utils/global";
import { cipherBadgeNumber } from "../utils/badge";
import { POPUP_TO_CONTENT_REQUEST } from "@/bridge/popup-content/request";
import { LocalStorage } from "@/utils/storage";

const Row = Grid.Row;
const Col = Grid.Col;

const i18n = new I18n(cross.i18n.getUILanguage());

interface AppState {
  checked: boolean;
}

const appLocalStorage = new LocalStorage<AppState>(
  "___private_app_local_storage_states___",
);

const initStates = appLocalStorage.read();

export const App: FC = () => {
  const [checked, setChecked] = useState(initStates?.checked ?? false);

  useEffect(() => {
    appLocalStorage.write({ checked });
    PCBridge.postToContent({
      type: POPUP_TO_CONTENT_REQUEST.HELLO_WORLD,
      payload: {
        enable: checked,
      },
    });
  }, [checked]);

  return (
    <div className="w-[500px] h-[300px]">
      <Switch
        checked={checked}
        checkedText="ON"
        uncheckedText="OFF"
        onChange={(e) => {
          setChecked(e);
        }}
      />
      {__DEV__ && (
        <a onClick={() => cross.runtime.reload()}>
          <IconRefresh />
          {i18n.t("Information.Reload")}
        </a>
      )}
    </div>
  );
};
