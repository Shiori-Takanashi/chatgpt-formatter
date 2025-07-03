import { FormatterRule } from "../../formatter.types";
import { RuleCategory } from "..../../services/categories";

export const quoteAnswerBlockRule: FormatterRule = {
    id: "quote-answer-block",
    enabled: true,
    category: RuleCategory.QUOTE,
    apply: (text) => {
        const blocks = text.split('\n\n');
        const LinesInFirstBlock = blocks[1].split('\n');
        const quotedRestLines = LinesInFirstBlock.slice(1).map(line => `> ${line}`);
        const newSecondBlock = [LinesInFirstBlock[0], ...quotedRestLines].join('\n');
        const re_text = [blocks[0], newSecondBlock, ...blocks.slice(2)].join('\n\n');
        return re_text;
    }
};
