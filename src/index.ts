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

  //Shortcut keyの変更を通知する
if(!logseq.settings!.trashMessageChangeShortcut20230808){
  logseq.UI.showMsg(`
  🦢 Blank line plugin :
  Shortcut key has been changed. (2023/08/08)
  
  Add blank lines (previous) : Ctrl/Mod+Shift+↑Up
  Add blank lines (next) : Ctrl/Mod+Shift+↓Down
  `, "info",{timeout:5500});
  logseq.updateSettings({ trashMessageChangeShortcut20230808: true });

}

  /* ContextMenuItem `Make to next line blank`  */
  if (logseq.settings!.bulletContextMenuItem === true) {
    logseq.Editor.registerBlockContextMenuItem('🦢Add blank lines (next line) ⤵️', async ({ uuid }) => {
      if (!logseq.settings?.nextLineBlank) return;
      createBlankLine(uuid, Number(logseq.settings?.nextLineBlank) || 1);
    });
    logseq.Editor.registerBlockContextMenuItem('🦢Add blank line (Only one line) ⤵️', async ({ uuid }) => {
      createBlankLine(uuid, 1);
    });
  }

  //前に空行を追加
  logseq.App.registerCommandPalette({ key: "createBlankLinesPrevious", label: "🦢Add blank lines (previous) ⤴️", keybinding: { binding: "Mod+Shift+Up" } }, async ({ uuid }) => {
    if (!logseq.settings?.previousLineBlank || !uuid) return;
    const block = await logseq.Editor.insertBlock(uuid, "", { focus: true, sibling: true, before: true, });
    const numberBlankLine = Number(logseq.settings?.previousLineBlank) - 1;
    if (block && numberBlankLine >= 1) createBlankLine(block.uuid, numberBlankLine);
    //ブロックが選択されていない場合
    else logseq.UI.showMsg("Please select a block.", "warning");
  });

  //後ろに空行を追加
  logseq.App.registerCommandPalette({ key: "createBlankLinesNext", label: "🦢Add blank lines (next) ⤵️", keybinding: { binding: "Mod+Shift+Down" } }, async ({ uuid }) => {
    if (!logseq.settings?.nextLineBlank) return;
    if (uuid) createBlankLine(uuid, Number(logseq.settings?.nextLineBlank));
    //ブロックが選択されていない場合
    else logseq.UI.showMsg("Please select a block.", "warning");
  });

  logseq.App.registerCommandPalette({ key: "createBlankNext1LineOnly", label: "🦢Add blank line (Only one line) ⤵️", keybinding: { binding: "Alt+Enter" } }, async ({ uuid }) => {
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
    key: "blank1lineOnly",
    title: "Add blank line (Only one line)",
    type: "heading",
    default: "",
    description: "Shortcut key: `Alt+Enter`",
  },
  {
    key: "previousLineBlank",
    title: "Number of inserting blank lines (previous)",
    type: "enum",
    default: "3",
    enumChoices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "15", "20",],
    description: "Shortcut key: `Ctrl/Mod+Shift+↑Up`",
  },
  {
    key: "nextLineBlank",
    title: "Number of inserting blank lines (next)",
    type: "enum",
    default: "3",
    enumChoices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "15", "20",],
    description: "Shortcut key: `Ctrl/Mod+Shift+↓Down`",
  },
  {
    key: "nextLineBlankFromPageMenu",
    title: "Number of inserting blank lines (from the page menu)",
    type: "enum",
    default: "10",
    enumChoices: ["1", "2", "3", "5", "7", "10", "15", "20", "30",],
    description: "Page title menu: `🦢Add blank lines (prepend⏫)` and `🦢Blank line (append⏬)`",
  },
  {
    key: "bulletContextMenuItem",
    type: "boolean",
    title: "Enable bullet context menu",
    description: `default: \`false\`
    \`🦢Add blank lines (next line) ⤵️\` and \`🦢Add blank line (Only one line) ⤵️\`
    (⚠️need to turn off this plugin or restart Logseq to take effect)`,
    default: false,
  },
];


logseq.ready(main).catch(console.error);