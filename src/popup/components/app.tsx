import type { FC } from "react";
import { useLayoutEffect, useState } from "react";
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
import { PC_QUERY_STATE_ENUM } from "@/bridge/popup-content/response";

const Row = Grid.Row;
const Col = Grid.Col;

const i18n = new I18n(cross.i18n.getUILanguage());

export const App: FC = () => {
  const a = "111";
  const b = "2222";

  return (
    <div className="w-[1000px] bg-red-600">
      <Switch checkedText="ON" uncheckedText="OFF" />
      <div>
        <div>fjdakfjs</div>
      </div>
      {__DEV__ && 1234 && (
        <a onClick={() => cross.runtime.reload()}>
          <IconRefresh />
          {i18n.t("Information.Reload")}
        </a>
      )}
    </div>
  );
};
