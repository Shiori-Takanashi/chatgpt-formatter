import { FormatterRule } from "../formatter.types";
import { RuleCategory } from "./categories";

export const quoteAnswerBlockRule: FormatterRule = {
    id: "quote-answer-block",
    name: "回答ブロックを引用形式にする",
    description: "'# 回答' を含むブロック全体を引用符で囲みます。",
    enabled: true,
    order: 5, // 「回答を追加」ルールの後に実行されるように調整
    category: RuleCategory.FORMAT,
    apply: (text) => {
        const blocks = text.split('\n\n');
        const LinesInFirstBlock = blocks[1].split('\n');
        const quotedRestLines = LinesInFirstBlock.slice(1).map(line => `> ${line}`);
        const newSecondBlock = [LinesInFirstBlock[0], ...quotedRestLines].join('\n');
        const re_text = [blocks[0], newSecondBlock, ...blocks.slice(2)].join('\n\n');
        return re_text;
    }
};
