import { FormatterRule } from "../../formatter.types";
import { RuleCategory } from "../../services/categories";

export const addSeparatorToHeadingsRule: FormatterRule = {
    id: "add-separator-to-headings",
    name: "見出しにセパレーターを追加",
    description: "1番目の見出しの下に---を、それ以外の見出しの上に---を追加します",
    enabled: false,
    order: 1, // 早めに実行
    category: RuleCategory.HEAD,
    apply: (text: string): string => {
        const lines = text.split('\n');
        const result: string[] = [];
        let firstHeadingFound = false;
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

            // 見出し（> で始まる行）を検出
            if (line.match(/^>\s/)) {
                if (!firstHeadingFound) {
                    // 1番目の見出し：見出しの後に---を追加
                    result.push(line);
                    result.push('---');
                    firstHeadingFound = true;
                } else {
                    // 2番目以降の見出し：見出しの前に---を追加
                    result.push('---');
                    result.push(line);
                }
            } else {
                result.push(line);
            }
        }

        return result.join('\n');
    }
};
