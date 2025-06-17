import { FormatterRule } from "../../formatter.types";
import { RuleCategory } from "../../services/categories";

export const addEndSeparatorRule: FormatterRule = {
    id: "add-end-separator",
    name: "テキスト終了時にセパレーターを追加",
    description: "全てのテキストが終了したら改行2つと---を追加します",
    enabled: false,
    order: 100, // 最後に実行
    category: RuleCategory.HEAD,
    apply: (text: string): string => {
        // 末尾の空白行を削除
        const trimmedText = text.trimEnd();

        // テキストが空でない場合のみセパレーターを追加
        if (trimmedText.length > 0) {
            return trimmedText + '\n\n---';
        }

        return text;
    }
};
