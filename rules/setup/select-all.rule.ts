import { FormatterRule } from "../formatter.types";
import { RuleCategory } from "../services/categories";

// このルールは単なるマーカーで、実際の処理はプラグインのコマンドで行われます
export const selectAllRule: FormatterRule = {
    id: "select-all",
    name: "Alt+Cでフォーマット処理を実行",
    description: "Alt+Cホットキーで全テキストに対してフォーマット処理を実行します（UI表示用）",
    enabled: true,
    order: 1, // カーソル移動の次に実行
    category: RuleCategory.STRUCTURE,
    apply: (text) => {
        // このルールはUI上でのみ意味を持ち、実際のテキスト変換は行いません
        // 実際の処理はObsidianのエディターコマンドで実行されます
        return text;
    }
};
