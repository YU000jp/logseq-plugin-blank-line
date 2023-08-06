import '@logseq/libs'; //https://plugins-doc.logseq.com/
import { BlockEntity, PageEntity, SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user';
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
  if (logseq.settings!.bulletContextMenuItem === true) {
    logseq.Editor.registerBlockContextMenuItem('🦢Add blank lines ⤵️', async ({ uuid }) => {
      createBlankLine(uuid, Number(logseq.settings?.nextLineBlank) || 1);
    });
    logseq.Editor.registerBlockContextMenuItem('🦢Add blank line (Only one line) ⤵️', async ({ uuid }) => {
      createBlankLine(uuid, 1);
    });
  }

  logseq.App.registerCommandPalette({ key: "createBlankLines", label: "🦢Add blank lines ⤵️", keybinding: { binding: "Mod+Shift+b" } }, async ({ uuid }) => {
    if (!logseq.settings?.nextLineBlank) return;
    if (uuid) createBlankLine(uuid, Number(logseq.settings?.nextLineBlank));
    //ブロックが選択されていない場合
    else logseq.UI.showMsg("Please select a block.", "warning");
  });

  logseq.App.registerCommandPalette({ key: "createBlank1LineOnly", label: "🦢Add blank line (Only one line) ⤵️", keybinding: { binding: "Alt+Enter" } }, async ({ uuid }) => {
    if (uuid) createBlankLine(uuid, 1);
    //ブロックが選択されていない場合
    else logseq.UI.showMsg("Please select a block.", "warning");
  });

  //ページの先頭に追加する🦢Blank line (prepend)
  logseq.App.registerPageMenuItem("🦢Add blank lines (prepend⏫)", async ({ page }) => {
    if (!page || !logseq.settings?.nextLineBlankFromPageMenu) return;

    const thisPage = await logseq.Editor.getPage(page) as PageEntity || null;
    if (thisPage === null) return;
    const newBlock = await logseq.Editor.prependBlockInPage(page, "",) as BlockEntity | null;
    if (!newBlock) return;
    if (thisPage['journal?'] === true) {//ジャーナルの場合は先頭行にprependBlockInPageが使えない
      const pageBlockTree = await logseq.Editor.getPageBlocksTree(page) as BlockEntity[];
      await logseq.Editor.moveBlock(newBlock.uuid, pageBlockTree[0].uuid, { before: true, });
    }
    let numberBlankLine = Number(logseq.settings?.nextLineBlankFromPageMenu) - 1;
    if (numberBlankLine >= 1) createBlankLine(newBlock.uuid, numberBlankLine);
  });

  //ページの最後に追加する
  logseq.App.registerPageMenuItem("🦢Blank line (append⏬)", async ({ page }) => {
    if (!page) return;
    const newBlock = await logseq.Editor.appendBlockInPage(page, "",) as BlockEntity | null;
    if (!newBlock) return;
    let numberBlankLine = Number(logseq.settings?.nextLineBlankFromPageMenu) || 1;
    if (numberBlankLine - 1 >= 1) createBlankLine(newBlock.uuid, numberBlankLine - 1);
  });

};/* end_main */



function createBlankLine(uuid: string, numberOfBlankLine: number) {
  for (let i = 0; i < numberOfBlankLine; i++) {
    logseq.Editor.insertBlock(uuid, "", { focus: true, sibling: true });
  }
  logseq.UI.showMsg("Done! (🦢)", "info");
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
    title: "Enable bullet context menu `🦢Add blank lines` and `🦢Add blank line (Only one line)`",
    description: "default: `false` (⚠️need to turn off this plugin or restart Logseq to take effect)",
    default: false,
  },
];


logseq.ready(main).catch(console.error);