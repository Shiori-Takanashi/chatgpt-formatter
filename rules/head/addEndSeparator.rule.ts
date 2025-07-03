import { FormatterRule } from "../../formatter.types";
import { RuleCategory } from "../../services/categories";

export const addEndSeparatorRule: FormatterRule = {
    id: "add-end-separator",
    enabled: true,
    category: RuleCategory.HEAD,
    apply: (text: string): string => {
        // テキストが空でない場合のみチェック
        if (text.trim().length > 0) {
            // 末尾から逆順に非空行を探してセパレーターかどうかチェック
            const lines = text.split('\n');
            for (let i = lines.length - 1; i >= 0; i--) {
                const line = lines[i];
                if (line.trim() !== '') {
                    // 最後の非空行がセパレーターの場合は追加しない
                    if (line.match(/^\s*---\s*$/)) {
                        return text;
                    }
                    break;
                }
            }

            // セパレーターがない場合は追加
            const trimmedText = text.trimEnd();
            return trimmedText + '\n\n---';
        }

        return text;
    }
};
