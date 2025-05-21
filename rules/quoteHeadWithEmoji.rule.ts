import { FormatterRule } from "../formatter.types";
import { RuleCategory } from "./categories";

export const quoteHeadWithEmojiRule: FormatterRule = {
    id: "quote-head-with-emoji",
    name: "絵文字付きの見出しライン/ブロックを引用形式に",
    description: "",
    enabled: true,
    order: 6,
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
