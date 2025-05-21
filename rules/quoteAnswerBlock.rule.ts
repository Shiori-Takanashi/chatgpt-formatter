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
        console.log("quoteAnswerBlockRule: apply method called.");
        const blocks = text.split('\n\n'); // ダブル改行でブロックに分割
        const newBlocks = blocks.map(block => {
            if (block.includes('# 🤖 回答')) {
                console.log("quoteQuestionBlockRule: Found block with '# 回答'. Block content:", block);
                const lines = block.split('\n');
                const quotedLines = lines.map(line => `> ${line}`);
                const newBlock = quotedLines.join('\n');
                console.log("quoteQuestionBlockRule: Quoted block content:", newBlock);
                return newBlock;
            }
            return block;
        });
        const result = newBlocks.join('\n\n');
        console.log("quoteAnswerBlockRule: Final result:", result);
        return result;
    }
};
