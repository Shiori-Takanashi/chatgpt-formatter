import { FormatterRule } from "../../formatter.types";
import { RuleCategory } from "..../../services/categories";

export const addAnswerToSecondBlockRule: FormatterRule = {
    id: "add-answer-to-second-block",
    enabled: true,
    category: RuleCategory.HEAD,
    apply: (text: string): string => {
        const blocks = text.split('\n\n');
        const answerHead = "# ❗回答";
        blocks[1] = answerHead + '\n' + blocks[1];
        return blocks.join('\n\n');
    }
};
