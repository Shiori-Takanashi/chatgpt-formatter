import { FormatterRule } from "../../formatter.types";
import { RuleCategory } from "..../../services/categories";

export const addQuestionToStartRule: FormatterRule = {
    id: "add-question-to-start",
    enabled: true,
    category: RuleCategory.HEAD,
    apply: (text: string): string => {
        const questionHead = "# ❓質問";
        return questionHead + '\n' + text;
    }
};
