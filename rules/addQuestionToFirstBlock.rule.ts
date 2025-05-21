import { FormatterRule } from "../formatter.types";
import { RuleCategory } from "./categories";

export const addQuestionToStartRule: FormatterRule = {
    id: "add-question-to-start",
    name: "h1=質問を先頭に追加",
    description: "テキスト全体の先頭に「# ❓質問」を追加します",
    enabled: true,
    order: 2,
    category: RuleCategory.CONTENT,
    apply: (text: string): string => {
        const questionHead = "# ❓質問";
        return questionHead + '\n' + text;
    }
};
