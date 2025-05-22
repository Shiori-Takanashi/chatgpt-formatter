import { FormatterRule } from "../formatter.types";
import { RuleCategory } from "../services/categories";

export const addAnswerToSecondBlockRule: FormatterRule = {
    id: "add-answer-to-second-block",
    name: "h1=回答を2番目のブロックに追加",
    description: "2番目のブロックの先頭に「# ❗回答」を追加します",
    enabled: true,
    order: 4,
    category: RuleCategory.CONTENT,
    apply: (text: string): string => {
        const blocks = text.split('\n\n');
        const answerHead = "# ❗回答";
        blocks[1] = answerHead + '\n' + blocks[1];
        return blocks.join('\n\n');
    }
};
