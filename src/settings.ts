import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user';
import { t } from "logseq-l10n";

/* user setting */
// https://logseq.github.io/plugins/types/SettingSchemaDesc.html
export const settingsTemplate = (): SettingSchemaDesc[] => [
    {
        key: "blank1lineOnly",
        title: t("Add blank line (Only one line)"),
        type: "heading",
        default: "",
        description: "Shortcut key: `Alt+Enter`",
    },
    {
        key: "previousLineBlank",
        title: t("Number of inserting blank lines (previous)"),
        type: "enum",
        default: "3",
        enumChoices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "15", "20",],
        description: "Shortcut key: `Ctrl/Mod+Pg-Up`",
    },
    {
        key: "nextLineBlank",
        title: t("Number of inserting blank lines (next)"),
        type: "enum",
        default: "3",
        enumChoices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "15", "20",],
        description: "Shortcut key: `Ctrl/Mod+Pg-Down`",
    },
    {
        key: "nextLineBlankFromPageMenu",
        title: t("Number of inserting blank lines (from the page menu)"),
        type: "enum",
        default: "10",
        enumChoices: ["1", "2", "3", "5", "7", "10", "15", "20", "30",],
        description: "Page title menu: `🦢Add blank lines (prepend⏫)` and `🦢Blank line (append⏬)`",
    },
    {
        key: "bulletContextMenuItem",
        type: "boolean",
        title: t("Enable bullet context menu"),
        description: `default: \`false\`
    \`🦢Add blank lines (next line) ⤵️\` and \`🦢Add blank line (Only one line) ⤵️\`
    (⚠️need to turn off this plugin or restart Logseq to take effect)`,
        default: false,
    },
];
