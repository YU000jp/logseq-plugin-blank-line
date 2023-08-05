import '@logseq/libs'; //https://plugins-doc.logseq.com/
import { BlockEntity, SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user';
//import { setup as l10nSetup, t } from "logseq-l10n"; //https://github.com/sethyuan/logseq-l10n
//import ja from "./translations/ja.json";


/* main */
const main = () => {
  // (async () => {
  //   try {
  //     await l10nSetup({ builtinTranslations: { ja } });
  //   } finally {
  /* user settings */
  logseq.useSettingsSchema(settingsTemplate);
  if (!logseq.settings) setTimeout(() => logseq.showSettingsUI(), 300);
  //   }
  // })();

  /* ContextMenuItem `Make to next line blank`  */
  if (logseq.settings!.bulletContextMenuItem === true) logseq.Editor.registerBlockContextMenuItem('🔘Make to next line blank', async ({ uuid }) => {
    createBlankLine(uuid, logseq.settings?.nextLineBlank || "1");
  });

  logseq.App.registerCommandPalette({ key: "createBlankLine", label: "🔘Make to next line blank", keybinding: { binding: "Mod+Shift+b" } }, async ({ uuid }) => {
    if (uuid) createBlankLine(uuid, logseq.settings?.nextLineBlank || "1");
    //ブロックが選択されていない場合
    else logseq.UI.showMsg("Please select a block.", "warning");
  });

  //ページの最後に追加する🔘Blank line (prepend)
  logseq.App.registerPageMenuItem("🔘Make to next line blank", async ({ page }) => {
    if (!page) return;
    const newBlock = await logseq.Editor.prependBlockInPage(page, "",) as BlockEntity | null;
    if (!newBlock) return;
    let numberBlankLine = Number(logseq.settings?.nextLineBlankFromPageMenu) || 1;
    if (numberBlankLine - 1 >= 1) createBlankLine(newBlock.uuid, numberBlankLine - 1);
  });


  //TODO: appendがうまくいかない

  // //ページの先頭に追加する
  // logseq.App.registerPageMenuItem("🔘Blank line (append)", async ({ page }) => {
  //   if (!page) return;
  //   const newBlock = await logseq.Editor.appendBlockInPage(page, "",) as BlockEntity | null;
  //   if (!newBlock) return;
  //   let numberBlankLine = Number(logseq.settings?.nextLineBlankFromPageMenu) || 1;
  //   if (numberBlankLine - 1 >= 1) createBlankLine(newBlock.uuid, numberBlankLine - 1);
  // });


};/* end_main */



function createBlankLine(uuid: string, numberOfBlankLine: number) {
  for (let i = 0; i < numberOfBlankLine; i++) {
    logseq.Editor.insertBlock(uuid, "", { focus: true, sibling: true });
  }
  logseq.UI.showMsg("Done! (🔘Make to next line blank)", "info");
}


/* user setting */
// https://logseq.github.io/plugins/types/SettingSchemaDesc.html
const settingsTemplate: SettingSchemaDesc[] = [
  {
    key: "nextLineBlank",
    title: "Number of inserting blank lines",
    type: "enum",
    default: "3",
    enumChoices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "15", "20",],
    description: "",
  },
  {
    key: "nextLineBlankFromPageMenu",
    title: "Number of inserting blank lines (from the page menu)",
    type: "enum",
    default: "10",
    enumChoices: ["1", "2", "3", "5", "7", "10", "15", "20", "30",],
    description: "",
  },
  {
    key: "bulletContextMenuItem",
    type: "boolean",
    title: "Enable bullet context menu `🔘Make to next line blank",
    description: "default: `false` (⚠️need to turn off this plugin or restart Logseq to take effect)",
    default: false,
  },
];


logseq.ready(main).catch(console.error);