import { FormatterRule } from "../../formatter.types";
import { RuleCategory } from "..../../services/categories";

export const moveCursorToStartRule: FormatterRule = {
    id: "move-cursor-to-start",
    enabled: true,
    category: RuleCategory.SETUP,
    apply: (text) => {
        // 実際のカーソル操作はmain.tsのeditorCallbackで行われます
        // このルールはUI上の説明用で、テキスト変換は行いません
        return text;
    }
};
