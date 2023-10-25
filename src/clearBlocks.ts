import { BlockEntity } from "@logseq/libs/dist/LSPlugin.user"
import { t } from "logseq-l10n"

// ブロッククリアの箇条書きメニューと、コマンドパレットメニュー

// 選択したブロックの内容をクリアする

export const loadClearBlocks = () => {
    // ブロックをひとつクリアする
    logseq.Editor.registerBlockContextMenuItem(`🧹 ${t("Clear the block")}`, async ({ uuid }) => logseq.Editor.updateBlock(uuid, "", {}))

    // ブロックを複数クリアする
    logseq.App.registerCommandPalette({
        key: "clearBlocks",
        label: `🧹 ${t("Clear blocks (selected)")}`,
        keybinding: {
            mode: "non-editing",
            binding: "mod+delete",
        },
    }, async () => {
        // 選択したブロックを取得
        const blocks = await logseq.Editor.getSelectedBlocks() as BlockEntity[] | null
        if (!blocks) return logseq.UI.showMsg(t("No blocks selected"))
        for (const block of blocks) await logseq.Editor.updateBlock(block.uuid, "", {})
        logseq.UI.showMsg(t("Cleared the blocks"), "success", { timeout: 2000 })
    })

} /* end_loadClearBlocks */
