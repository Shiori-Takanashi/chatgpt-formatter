import { FormatterRule } from "../../formatter.types";
import { RuleCategory } from "..../../services/categories";

// このルールは単なるマーカーで、実際の処理はプラグインのコマンドで行われます
export const selectAllRule: FormatterRule = {
    id: "select-all",
    enabled: true,
    category: RuleCategory.SETUP,
    apply: (text) => {
        // このルールはUI上でのみ意味を持ち、実際のテキスト変換は行いません
        // 実際の処理はObsidianのエディターコマンドで実行されます
        return text;
    }
};
