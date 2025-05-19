import { FormatterRule } from "../formatter.types";
import { RuleCategory } from "./categories";

export const addQuestionToStartRule: FormatterRule = { // Renamed from addQuestion
    id: "add-question-to-start", // Changed from "add-answer"
    name: "h1=質問を先頭に追加", // Changed from "h1=回答を追加"
    description: "テキスト全体の先頭に「# 質問」を追加します", // Changed description
    enabled: true,
    order: 2, // カーソル移動と全選択の後に実行
    category: RuleCategory.CONTENT,
    apply: (text) => {
        console.log("addQuestionToStartRule: apply method called. Input text:", text); // Updated console log
        // すでに「# 質問」で始まっている場合は何もしない
        if (text.trimStart().startsWith('# 質問')) {
            return text;
        }

        // 改行で分割
        const lines = text.split('\\n');

        // 先頭が空行の場合は2行目に追加
        if (lines[0].trim() === '') {
            lines.splice(1, 0, '# 質問');
        } else {
            // そうでなければ先頭に追加
            lines.unshift('# 質問');
        }

        return lines.join('\n');
    }
};
