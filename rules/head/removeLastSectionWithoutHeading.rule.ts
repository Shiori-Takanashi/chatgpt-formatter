import { FormatterRule } from "../../formatter.types";
import { RuleCategory } from "../../services/categories";

export const removeLastSectionWithoutHeadingRule: FormatterRule = {
    id: "remove-last-section-without-heading",
    enabled: false,
    category: RuleCategory.HEAD,
    apply: (text: string): string => {
        const lines = text.split('\n');
        const separatorIndices: number[] = [];
        let inCodeBlock = false;

        // すべての---の位置を記録
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

            // セパレーター（---）を検出
            if (line.match(/^\s*---\s*$/)) {
                separatorIndices.push(i);
            }
        }

        // セパレーターが2個未満の場合は処理しない
        if (separatorIndices.length < 2) {
            return text;
        }

        // 最後の2つのセパレーターを取得
        const lastSeparatorIndex = separatorIndices[separatorIndices.length - 1];
        const secondLastSeparatorIndex = separatorIndices[separatorIndices.length - 2];

        // 最後のセクション（2つの---の間）の内容を確認
        const lastSectionLines = lines.slice(secondLastSeparatorIndex + 1, lastSeparatorIndex);

        // 最後のセクションに見出し行があるかチェック
        let hasHeading = false;
        inCodeBlock = false;

        for (const line of lastSectionLines) {
            // コードブロックの開始・終了を検出
            if (line.match(/^```/)) {
                inCodeBlock = !inCodeBlock;
                continue;
            }

            // コードブロック内はスキップ
            if (inCodeBlock) {
                continue;
            }

            // 見出し行（> で始まる行）を検出
            if (line.match(/^>\s/)) {
                hasHeading = true;
                break;
            }
        }

        // 見出し行がない場合、上側の---と最後のセクションを削除
        if (!hasHeading) {
            const result = lines.slice(0, secondLastSeparatorIndex).concat(lines.slice(lastSeparatorIndex));
            return result.join('\n');
        }

        return text;
    }
};
