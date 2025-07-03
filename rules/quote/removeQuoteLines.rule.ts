import { FormatterRule } from "../../formatter.types";
import { RuleCategory } from "../../services/categories";

export const removeQuoteLinesRule: FormatterRule = {
    id: "remove-quote-lines",
    enabled: true,
    category: RuleCategory.QUOTE,
    apply: (text: string): string => {
        const lines = text.split('\n');
        const result: string[] = [];
        let inCodeBlock = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // コードブロックの開始・終了を検出
            if (line.match(/^```/)) {
                inCodeBlock = !inCodeBlock;
                result.push(line);
                continue;
            }

            // コードブロック内は処理をスキップ
            if (inCodeBlock) {
                result.push(line);
                continue;
            }

            // 引用文（>で始まる行）を検出して削除
            if (line.match(/^>/)) {
                // この行をスキップ（削除）
                continue;
            }

            result.push(line);
        }

        return result.join('\n');
    }
};
