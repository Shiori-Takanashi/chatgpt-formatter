import { FormatterRule } from "../formatter.types";
import { RuleCategory } from "./categories";

export const quoteQuestionBlockRule: FormatterRule = {
    id: "quote-question-block",
    name: "質問ブロックを引用形式にする",
    description: "'# 質問' を含むブロック全体を引用符で囲みます。",
    enabled: true,
    order: 3, // 質問ブロックを引用
    category: RuleCategory.FORMAT,
    apply: (text) => {
        console.log("quoteQuestionBlockRule: apply method called.");
        const blocks = text.split('\n\n'); // ダブル改行でブロックに分割
        const newBlocks = blocks.map(block => {
            if (block.includes('# ❓ 質問')) {
                console.log("quoteQuestionBlockRule: Found block with '# 質問'. Block content:", block);
                const lines = block.split('\n');
                const quotedLines = lines.map(line => `> ${line}`);
                const newBlock = quotedLines.join('\n');
                console.log("quoteQuestionBlockRule: Quoted block content:", newBlock);
                return newBlock;
            }
            return block;
        });
        const result = newBlocks.join('\n\n');
        console.log("quoteQuestionBlockRule: Final result:", result);
        return result;
    }
};
