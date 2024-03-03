import { BlockEntity, PageEntity } from '@logseq/libs/dist/LSPlugin.user'
import { t } from "logseq-l10n"

export const commandItem = () => {

  //前の行に追加する
  logseq.App.registerCommandPalette({
    key: "createBlankPrevious1LineOnly",
    label: "🦢 " + t("Create the previous line ⤴️"),
    keybinding: { binding: 'shift+alt+enter' }
  }, async ({ uuid }) => {
    if (uuid) {
      logseq.Editor.insertBlock(uuid, "", { before: true, focus: true, sibling: true })
      addedMessage()
    } else//ブロックが選択されていない場合
      warningMessage()
  })
  logseq.App.registerCommandPalette({
    key: "createBlankLinesPrevious",
    label: "🦢 " + t("Create new lines at the previous line ⤴️"),
    keybinding: { binding: 'mod+pg-up' }
  }, async ({ uuid }) => {
    if (!logseq.settings?.previousLineBlank
      || !uuid) return
    const block = await logseq.Editor.insertBlock(uuid, "", { focus: true, sibling: true, before: true, })
    const numberBlankLine = Number(logseq.settings?.previousLineBlank) - 1
    if (block
      && numberBlankLine >= 1)
      createBlankLine(block.uuid, numberBlankLine)
    else//ブロックが選択されていない場合
      warningMessage()
  })

  //次の行に追加する
  logseq.App.registerCommandPalette({
    key: "createBlankNext1LineOnly",
    label: "🦢 " + t("Create the next line ⤵️"),
    keybinding: { binding: 'alt+enter' }
  }, async ({ uuid }) => {
    if (uuid)
      createBlankLine(uuid, 1)
    else//ブロックが選択されていない場合
      warningMessage()
  })
  logseq.App.registerCommandPalette({
    key: "createBlankLinesNext",
    label: "🦢 " + t("Create new lines at the next line ⤵️"),
    keybinding: { binding: 'mod+pg-down' }
  }, async ({ uuid }) => {
    if (!logseq.settings?.nextLineBlank) return
    if (uuid)
      createBlankLine(uuid, Number(logseq.settings?.nextLineBlank))
    else//ブロックが選択されていない場合
      warningMessage()
  })

  //ページの先頭に追加する
  logseq.App.registerPageMenuItem(
    "🦢 " + t("Create new lines at top of the page ⏫"),
    async ({ page }) => {
      if (!page
        || !logseq.settings?.nextLineBlankFromPageMenu) return
      const thisPage = await logseq.Editor.getPage(page) as { "journal?": PageEntity["journal?"] } || null
      if (thisPage === null) return
      const newBlock = await logseq.Editor.prependBlockInPage(page, "") as { uuid: BlockEntity["uuid"] } | null
      if (!newBlock) return
      if (thisPage['journal?'] === true) { //日誌の場合は先頭行にprependBlockInPageが使えない
        const pageBlockTreeFirst = (await logseq.Editor.getPageBlocksTree(page) as { uuid: BlockEntity["uuid"] }[])[0]
        await logseq.Editor.moveBlock(newBlock.uuid, pageBlockTreeFirst.uuid, { before: true })
      }
      let numberBlankLine = Number(logseq.settings?.nextLineBlankFromPageMenu) - 1
      if (numberBlankLine >= 1)
        createBlankLine(newBlock.uuid, numberBlankLine)
    })

  //ページの最後に追加する
  logseq.App.registerPageMenuItem(
    "🦢 " + t("Create new lines at bottom of the page ⏬"),
    async ({ page }) => {
      if (!page) return
      const newBlock = await logseq.Editor.appendBlockInPage(page, "") as { uuid: BlockEntity["uuid"] } | null
      if (!newBlock) return
      let numberBlankLine = Number(logseq.settings?.nextLineBlankFromPageMenu) || 1
      if (numberBlankLine - 1 >= 1)
        createBlankLine(newBlock.uuid, numberBlankLine - 1)
    })

  // ブロックのクリア
  logseq.App.registerCommandPalette({
    key: "clearBlocks",
    label: "🦢 " + t("Clear block contents"),
    keybinding: { binding: 'shift+delete' }
  }, async () => {
    const blocks = await logseq.Editor.getSelectedBlocks() as BlockEntity[] | null
    if (!blocks) return
    for (let block of blocks)
      logseq.Editor.updateBlock(block.uuid, "")
    logseq.UI.showMsg("🦢 " + t("Cleared block contents"), "info")
  })

}


const createBlankLine = (uuid: string, numberOfBlankLine: number) => {
  for (let i = 0; i < numberOfBlankLine; i++)
    logseq.Editor.insertBlock(uuid, "", { focus: true, sibling: true })
  addedMessage()
}

const addedMessage = () => logseq.UI.showMsg("🦢 " + t("Created New Line"), "info")
const warningMessage = () => logseq.UI.showMsg("🦢 " + t("Please select a block."), "warning")

