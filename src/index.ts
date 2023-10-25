import '@logseq/libs'; //https://plugins-doc.logseq.com/
import { setup as l10nSetup, t } from "logseq-l10n"; //https://github.com/sethyuan/logseq-l10n
import { loadClearBlocks } from "./clearBlocks"
import { settingsTemplate } from './settings'
import ja from "./translations/ja.json"
import { commandItem } from './commandItem'

/* main */
const main = async () => {
  await l10nSetup({ builtinTranslations: { ja } });
  /* user settings */
  logseq.useSettingsSchema(settingsTemplate());
  if (!logseq.settings) setTimeout(() => logseq.showSettingsUI(), 300);

  //前に空行を追加
  commandItem();

    // ブロッククリアの箇条書きメニューと、コマンドパレットメニュー
  if (logseq.settings!.loadClearBlocks === true) loadClearBlocks();
  
};/* end_main */



export const createBlankLine = (uuid: string, numberOfBlankLine: number) => {
  for (let i = 0; i < numberOfBlankLine; i++) {
    logseq.Editor.insertBlock(uuid, "", { focus: true, sibling: true });
  }
  logseq.UI.showMsg(t(" 🦢 Done!"), "info");
}


logseq.ready(main).catch(console.error)
