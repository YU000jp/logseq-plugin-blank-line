import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user'
import { t } from "logseq-l10n"

/* user setting */
// https://logseq.github.io/plugins/types/SettingSchemaDesc.html
export const settingsTemplate = (): SettingSchemaDesc[] => [
    {
        key: "previousLineBlank",
        title: t("Number of inserting lines (previous)"),
        type: "enum",
        default: "3",
        enumChoices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "15", "20",],
        description: "",
    },
    {
        key: "nextLineBlank",
        title: t("Number of inserting lines (next)"),
        type: "enum",
        default: "3",
        enumChoices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "15", "20",],
        description: "",
    },
    {
        key: "nextLineBlankFromPageMenu",
        title: t("Number of inserting lines (from the page menu)"),
        type: "enum",
        default: "10",
        enumChoices: ["1", "2", "3", "5", "7", "10", "15", "20", "30",],
        description: "",
    },
]
