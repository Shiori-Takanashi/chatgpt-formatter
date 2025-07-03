import { FormatterRule } from "../../formatter.types";
import { RuleCategory } from "../../services/categories";

export const convertHeadingsToQuotesRule: FormatterRule = {
    id: "convert-headings-to-quotes",
    enabled: false,
    category: RuleCategory.QUOTE,
    apply: (text: string): string => {
        const lines = text.split('\n');
        const result: string[] = [];
        let inCodeBlock = false;

        for (const line of lines) {
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

            // 見出し（# または ## で始まる行のみ）を引用形式に変換
            if (line.match(/^#{1,2}\s/)) {
                result.push(`> ${line}`);
            } else {
                result.push(line);
            }
        }

        return result.join('\n');
    }
};
