import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user'
import { t } from "logseq-l10n"

/* user setting */
// https://logseq.github.io/plugins/types/SettingSchemaDesc.html
export const settingsTemplate = (): SettingSchemaDesc[] => [

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
        title: t("Number of inserting New lines (previous)"),
        type: "enum",
        default: "3",
        enumChoices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "15", "20",],
        description: t("Shortcut key") + ": `Ctrl` or `Mod` + `Pg-Up`",
    },
    {
        key: "nextLineBlank",
        title: t("Number of inserting New lines (next)"),
        type: "enum",
        default: "3",
        enumChoices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "15", "20",],
        description: t("Shortcut key") + ": `Ctrl` or `Mod` + `Pg-Down`",
    },
    {
        key: "nextLineBlankFromPageMenu",
        title: t("Number of inserting New lines (from the page menu)"),
        type: "enum",
        default: "10",
        enumChoices: ["1", "2", "3", "5", "7", "10", "15", "20", "30",],
        description: t("Page title menu > `🦢 New lines to Top ⏫` / `🦢 New lines to Bottom ⏬`"),
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
