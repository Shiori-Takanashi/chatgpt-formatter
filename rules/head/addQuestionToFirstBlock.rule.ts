import { FormatterRule } from "../../formatter.types";
import { RuleCategory } from "..../../services/categories";

export const addQuestionToStartRule: FormatterRule = {
    id: "add-question-to-start",
    name: "h1=質問を先頭に追加",
    description: "テキスト全体の先頭に「# ❓質問」を追加します",
    enabled: false,
    order: 2,
    category: RuleCategory.HEAD,
    apply: (text: string): string => {
        const questionHead = "# ❓質問";
        return questionHead + '\n' + text;
    }
};
