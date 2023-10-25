import '@logseq/libs'; //https://plugins-doc.logseq.com/
import { BlockEntity, PageEntity } from '@logseq/libs/dist/LSPlugin.user'
import { setup as l10nSetup, t } from "logseq-l10n"; //https://github.com/sethyuan/logseq-l10n
import { loadClearBlocks } from "./clearBlocks"
import { settingsTemplate } from './settings'
import ja from "./translations/ja.json"

/* main */
const main = async () => {
  await l10nSetup({ builtinTranslations: { ja } });
  /* user settings */
  logseq.useSettingsSchema(settingsTemplate());
  if (!logseq.settings) setTimeout(() => logseq.showSettingsUI(), 300);

  //前に空行を追加
  if (logseq.settings!.bulletContextMenuItem === true) {
    logseq.Editor.registerBlockContextMenuItem(t("🦢 Add blank lines ⤵️"), async ({ uuid }) => {
      if (!logseq.settings?.nextLineBlank) return;
      createBlankLine(uuid, Number(logseq.settings?.nextLineBlank) || 1);
    });
    logseq.Editor.registerBlockContextMenuItem(t("🦢 Add a blank line ⤵️"), async ({ uuid }) => {
      createBlankLine(uuid, 1);
    });
  }

  //前に空行を追加
  logseq.App.registerCommandPalette({ key: "createBlankLinesPrevious", label: t("🦢 Add blank lines (previous) ⤴️"), keybinding: { binding: 'mod+pg-up' } }, async ({ uuid }) => {
    if (!logseq.settings?.previousLineBlank || !uuid) return;
    const block = await logseq.Editor.insertBlock(uuid, "", { focus: true, sibling: true, before: true, });
    const numberBlankLine = Number(logseq.settings?.previousLineBlank) - 1;
    if (block && numberBlankLine >= 1) createBlankLine(block.uuid, numberBlankLine);
    //ブロックが選択されていない場合
    else logseq.UI.showMsg("Please select a block.", "warning");
  });

  //後ろに空行を追加
  logseq.App.registerCommandPalette({ key: "createBlankLinesNext", label: t("🦢 Add blank lines ⤵️"), keybinding: { binding: 'mod+pg-down' } }, async ({ uuid }) => {
    if (!logseq.settings?.nextLineBlank) return;
    if (uuid) createBlankLine(uuid, Number(logseq.settings?.nextLineBlank));
    //ブロックが選択されていない場合
    else logseq.UI.showMsg("Please select a block.", "warning");
  });

  logseq.App.registerCommandPalette({ key: "createBlankNext1LineOnly", label: t("🦢 Add a blank line ⤵️"), keybinding: { binding: 'alt+enter' } }, async ({ uuid }) => {
    if (uuid) createBlankLine(uuid, 1);
    //ブロックが選択されていない場合
    else logseq.UI.showMsg("Please select a block.", "warning");
  });

  //ページの先頭に追加する
  logseq.App.registerPageMenuItem(t("🦢 Add Blank Lines to Page Top ⏫"), async ({ page }) => {
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
  logseq.App.registerPageMenuItem(t("🦢 Add Blank Lines to Page Bottom ⏬"), async ({ page }) => {
    if (!page) return;
    const newBlock = await logseq.Editor.appendBlockInPage(page, "",) as BlockEntity | null;
    if (!newBlock) return;
    let numberBlankLine = Number(logseq.settings?.nextLineBlankFromPageMenu) || 1;
    if (numberBlankLine - 1 >= 1) createBlankLine(newBlock.uuid, numberBlankLine - 1);
  });


    // ブロッククリアの箇条書きメニューと、コマンドパレットメニュー
  if (logseq.settings!.loadClearBlocks === true) loadClearBlocks();
  
};/* end_main */



const createBlankLine = (uuid: string, numberOfBlankLine: number) => {
  for (let i = 0; i < numberOfBlankLine; i++) {
    logseq.Editor.insertBlock(uuid, "", { focus: true, sibling: true });
  }
  logseq.UI.showMsg(t(" 🦢 Done!"), "info");
}


logseq.ready(main).catch(console.error);