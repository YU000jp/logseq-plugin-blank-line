import { BlockEntity, PageEntity } from '@logseq/libs/dist/LSPlugin.user'
import { t } from "logseq-l10n"

export const commandItem = () => {
  if (logseq.settings!.bulletContextMenuItem === true) {
    logseq.Editor.registerBlockContextMenuItem(t("🦢 Blank lines ⤵️"), async ({ uuid }) => {
      if (!logseq.settings?.nextLineBlank) return
      createBlankLine(uuid, Number(logseq.settings?.nextLineBlank) || 1)
    })
    logseq.Editor.registerBlockContextMenuItem(t("🦢 A blank line ⤵️"), async ({ uuid }) => {
      createBlankLine(uuid, 1)
    })
  }

  //前に空行を追加
  logseq.App.registerCommandPalette({ key: "createBlankLinesPrevious", label: t("🦢 Blank lines (previous) ⤴️"), keybinding: { binding: 'mod+pg-up' } }, async ({ uuid }) => {
    if (!logseq.settings?.previousLineBlank || !uuid) return
    const block = await logseq.Editor.insertBlock(uuid, "", { focus: true, sibling: true, before: true, })
    const numberBlankLine = Number(logseq.settings?.previousLineBlank) - 1
    if (block && numberBlankLine >= 1) createBlankLine(block.uuid, numberBlankLine);


    //ブロックが選択されていない場合
    else logseq.UI.showMsg("Please select a block.", "warning")
  })

  //後ろに空行を追加
  logseq.App.registerCommandPalette({ key: "createBlankLinesNext", label: t("🦢 Blank lines ⤵️"), keybinding: { binding: 'mod+pg-down' } }, async ({ uuid }) => {
    if (!logseq.settings?.nextLineBlank) return
    if (uuid) createBlankLine(uuid, Number(logseq.settings?.nextLineBlank));


    //ブロックが選択されていない場合
    else logseq.UI.showMsg("Please select a block.", "warning")
  })

  logseq.App.registerCommandPalette({ key: "createBlankNext1LineOnly", label: t("🦢 A blank line ⤵️"), keybinding: { binding: 'alt+enter' } }, async ({ uuid }) => {
    if (uuid) createBlankLine(uuid, 1);


    //ブロックが選択されていない場合
    else logseq.UI.showMsg("Please select a block.", "warning")
  })

  //ページの先頭に追加する
  logseq.App.registerPageMenuItem(t("🦢 Blank Lines to Top ⏫"), async ({ page }) => {
    if (!page || !logseq.settings?.nextLineBlankFromPageMenu) return

    const thisPage = await logseq.Editor.getPage(page) as PageEntity || null
    if (thisPage === null) return
    const newBlock = await logseq.Editor.prependBlockInPage(page, "") as BlockEntity | null
    if (!newBlock) return
    if (thisPage['journal?'] === true) { //日誌の場合は先頭行にprependBlockInPageが使えない
      const pageBlockTree = await logseq.Editor.getPageBlocksTree(page) as BlockEntity[]
      await logseq.Editor.moveBlock(newBlock.uuid, pageBlockTree[0].uuid, { before: true, })
    }
    let numberBlankLine = Number(logseq.settings?.nextLineBlankFromPageMenu) - 1
    if (numberBlankLine >= 1) createBlankLine(newBlock.uuid, numberBlankLine)
  })

  //ページの最後に追加する
  logseq.App.registerPageMenuItem(t("🦢 Blank Lines to Bottom ⏬"), async ({ page }) => {
    if (!page) return
    const newBlock = await logseq.Editor.appendBlockInPage(page, "") as BlockEntity | null
    if (!newBlock) return
    let numberBlankLine = Number(logseq.settings?.nextLineBlankFromPageMenu) || 1
    if (numberBlankLine - 1 >= 1) createBlankLine(newBlock.uuid, numberBlankLine - 1)
  })
}


export const createBlankLine = (uuid: string, numberOfBlankLine: number) => {
  for (let i = 0; i < numberOfBlankLine; i++) {
    logseq.Editor.insertBlock(uuid, "", { focus: true, sibling: true })
  }
  logseq.UI.showMsg(t(" 🦢 Done!"), "info")
}
