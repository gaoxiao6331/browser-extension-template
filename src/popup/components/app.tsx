import type { FC } from "react";
import { useEffect, useState } from "react";
import { Switch, Grid, Space } from "@arco-design/web-react";
import { IconRefresh } from "@arco-design/web-react/icon";
import { PCBridge } from "@/bridge/popup-content";
import { I18n } from "../i18n";
import { cross } from "@/utils/global";
import { POPUP_TO_CONTENT_REQUEST } from "@/bridge/popup-content/request";
import { LocalStorage } from "@/utils/storage";

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
    <div className="w-[300px] h-[200px] p-[20px] overflow-auto">
      <Grid.Row>
        <Space>
          Hello World
          <Switch
            checked={checked}
            checkedText="ON"
            uncheckedText="OFF"
            onChange={(e) => {
              setChecked(e);
            }}
          />
        </Space>
      </Grid.Row>
      {__DEV__ && (
        <div className="fixed bottom-0 text-gray-500">
          <Grid.Row>
            <a onClick={() => cross.runtime.reload()}>
              <IconRefresh />
              {i18n.t("Information.Reload")}
            </a>
          </Grid.Row>
        </div>
      )}
    </div>
  );
};
