import { FormatterRule } from "../../formatter.types";
import { RuleCategory } from "../../services/categories";

export const removeTextBeforeFirstHeadingRule: FormatterRule = {
    id: "remove-text-before-first-heading",
    enabled: false,
    category: RuleCategory.HEAD,
    apply: (text: string): string => {
        const lines = text.split('\n');
        let firstHeadingIndex = -1;
        let inCodeBlock = false;

        // 最初の見出しを探す
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // コードブロックの開始・終了を検出
            if (line.match(/^```/)) {
                inCodeBlock = !inCodeBlock;
                continue;
            }

            // コードブロック内はスキップ
            if (inCodeBlock) {
                continue;
            }

            // 見出し（> で始まる行）を検出
            if (line.match(/^>\s/)) {
                firstHeadingIndex = i;
                break;
            }
        }

        // 最初の見出しが見つからない場合は元のテキストを返す
        if (firstHeadingIndex === -1) {
            return text;
        }

        // 最初の見出し以降の行のみを返す
        return lines.slice(firstHeadingIndex).join('\n');
    }
};
