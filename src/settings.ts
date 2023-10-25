import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user'
import { t } from "logseq-l10n"

/* user setting */
// https://logseq.github.io/plugins/types/SettingSchemaDesc.html
export const settingsTemplate = (): SettingSchemaDesc[] => [

    {// ブロッククリアの箇条書きメニューと、コマンドパレットメニュー
        key: "headingClearBlocks",
        title: t("Clear block feature > From the bullet menu item or command pallet menu item"),
        type: "heading",
        default: "",
        description:
        //どこかのブロックにカーソルがある状態でEscキーを押すと、そのブロックが選択される。ShiftキーやCtrl(Cmd)キーを押しながら、カーソルキーやマウスでその他のブロックを選択する。ショートカット🖱️"Ctrl(Cmd)+Del"を押すと、ブロックの内容が消去される。
        t("Any block is selected by pressing the Esc key while the cursor is on a block. Select other blocks with the cursor key or mouse while pressing the Shift or Ctrl (Cmd) key. Press the shortcut 🖱️`Ctrl(Cmd)+Del` to clear the contents of the block."),
    },
    {
        key: "loadClearBlocks",
        title: t("Enable"),
        type: "boolean",
        default: true,
        description: t("(⚠️need to turn off this plugin or restart Logseq to take effect)"),
    },

    {// heading
        key: "headingBlankLine",
        title: t("Blank line feature"),
        type: "heading",
        default: "",
        description: ""
    },
    {
        key: "blankOneLine",
        title: t("Add a blank line"),
        type: "enum",
        enumChoices: ["1"],
        default: "1",
        description: t("Shortcut key") + ": `Alt`+ `Enter`",
    },
    {
        key: "previousLineBlank",
        title: t("Number of inserting blank lines (previous)"),
        type: "enum",
        default: "3",
        enumChoices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "15", "20",],
        description: t("Shortcut key") + ": `Ctrl` or `Mod` + `Pg-Up`",
    },
    {
        key: "nextLineBlank",
        title: t("Number of inserting blank lines (next)"),
        type: "enum",
        default: "3",
        enumChoices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "15", "20",],
        description: t("Shortcut key") + ": `Ctrl` or `Mod` + `Pg-Down`",
    },
    {
        key: "nextLineBlankFromPageMenu",
        title: t("Number of inserting blank lines (from the page menu)"),
        type: "enum",
        default: "10",
        enumChoices: ["1", "2", "3", "5", "7", "10", "15", "20", "30",],
        description: t("Page title menu > `🦢 Add Blank Lines to Page Top ⏫` / `🦢 Add Blank Lines to Page Bottom ⏬`"),
    },
    {
        key: "bulletContextMenuItem",
        type: "boolean",
        title: t("Blank line > Enable bullet context menu item"),
        description: `default: \`false\`
    ${t("(⚠️need to turn off this plugin or restart Logseq to take effect)")}`,
        default: false,
    },

]
