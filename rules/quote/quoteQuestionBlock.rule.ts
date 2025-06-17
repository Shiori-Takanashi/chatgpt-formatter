import { FormatterRule } from "../../formatter.types";
import { RuleCategory } from "..../../services/categories";

export const quoteQuestionBlockRule: FormatterRule = {
    id: "quote-question-block",
    name: "質問ブロックを引用形式にする",
    description: "'# 質問' を含むブロック全体を引用符で囲みます。",
    enabled: true,
    order: 3,
    category: RuleCategory.QUOTE,
    apply: (text: string): string => {
        const blocks = text.split('\n\n');
        const firstBlock = blocks[0];
        const lines = firstBlock.split('\n');
        const firstLine = lines[0];
        const restLines = lines.slice(1);
        const quotedRestLines = restLines.map(line => `> ${line}`);
        const newFirstBlock = [firstLine, ...quotedRestLines].join('\n');
        const newBlocks = [newFirstBlock, ...blocks.slice(1)];
        const re_text = newBlocks.join('\n\n');
        return re_text;
    }
};
