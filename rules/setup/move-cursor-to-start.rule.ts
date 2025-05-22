import { FormatterRule } from "../../../formatter.types";
import { RuleCategory } from "..../../services/categories";

export const moveCursorToStartRule: FormatterRule = {
    id: "move-cursor-to-start",
    name: "カーソルを文頭に移動",
    description: "Alt+C実行時にカーソルを文章の先頭に移動させます（UI表示用）",
    enabled: true,
    order: 0, // 最初に実行されるように0に設定
    category: RuleCategory.STRUCTURE,
    apply: (text) => {
        // 実際のカーソル操作はmain.tsのeditorCallbackで行われます
        // このルールはUI上の説明用で、テキスト変換は行いません
        return text;
    }
};
