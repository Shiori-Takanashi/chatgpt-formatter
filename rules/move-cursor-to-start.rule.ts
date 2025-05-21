import { FormatterRule } from "../formatter.types";
import { RuleCategory } from "./categories";

export const moveCursorToStartRule: FormatterRule = {
    id: "move-cursor-to-start",
    name: "カーソルを文頭に移動",
    description: "Alt+C実行時にカーソルを文章の先頭に移動させます（UI表示用）",
    enabled: true,
    order: 0, // カーソル移動が最初
    category: RuleCategory.STRUCTURE,
    apply: (text) => {
        // 実際のカーソル操作はmain.tsのeditorCallbackで行われます
        // このルールはUI上の説明用で、テキスト変換は行いません
        return text;
    }
};
