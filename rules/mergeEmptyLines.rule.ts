import { FormatterRule } from "../formatter.types";
import { RuleCategory } from "./categories";

export const mergeEmptyLines: FormatterRule = {
    id: "merge-empty-lines", // Changed from "add-answer"
    name: "連続する空行を1つにまとめる", // Changed from "h1=回答を追加"
    description: "連続する空行を1つにまとめる処理。", // Changed description
    enabled: true,
    order: 5, // 最後に実行
    category: RuleCategory.CONTENT,
    apply: (text) => {
        if (text === "") return ""; // Handle empty string input explicitly

        const lines = text.split('\n');
        const newLines: string[] = [];
        for (let i = 0; i < lines.length; i++) {
            const currentLine = lines[i];
            // 現在の行が空行で、かつ newLines の最後の行も空行の場合は追加しない
            if (currentLine === '' && newLines.length > 0 && newLines[newLines.length - 1] === '') {
                continue;
            }
            newLines.push(currentLine);
        }

        let result = newLines.join('\n');

        // 元のテキストが改行のみで構成されていて、かつ結果が空文字列になった場合、
        // 単一の改行を返す。
        if (result === '' && /^\n+$/.test(text)) {
            return '\n';
        }
        return result;
    }
};
