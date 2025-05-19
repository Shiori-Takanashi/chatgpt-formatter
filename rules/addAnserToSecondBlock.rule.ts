import { FormatterRule } from "../formatter.types";
import { RuleCategory } from "./categories";

export const addAnswerToSecondBlockRule: FormatterRule = { // Renamed from addQuestion
    id: "add-answer-to-second-block", // Changed from "add-question"
    name: "h1=回答を2番目のブロックに追加", // Changed from "h1=質問を追加"
    description: "2番目のブロックの先頭に「# 回答」を追加します", // Changed description
    enabled: true,
    order: 4, // This order might need adjustment depending on other rules
    category: RuleCategory.CONTENT,
    apply: (text: string): string => { // Ensure string is always returned
        console.log("addAnswerToSecondBlockRule: apply method called. Input text:", text);

        const blocks = text.split('\n\n');

        if (blocks.length < 2) {
            // 2番目のブロックが存在しない場合は何も変更しない
            console.log("addAnswerToSecondBlockRule: Less than 2 blocks, no changes made.");
            return text;
        }

        const firstBlock = blocks[0];
        let secondBlock = blocks[1];
        const restOfBlocks = blocks.slice(2);
        const answerHead = "# 回答";

        // 2番目のブロックの先頭に回答見出しを追加
        // すでに # 回答 で始まっている場合は追加しない
        if (secondBlock.trimStart().startsWith(answerHead)) {
            console.log("addAnswerToSecondBlockRule: Second block already starts with # 回答.");
        } else if (secondBlock.trim() === "") {
            // 2番目のブロックが空（スペースのみも含む）の場合
            secondBlock = answerHead;
            console.log("addAnswerToSecondBlockRule: Second block was empty, added # 回答.");
        } else {
            secondBlock = answerHead + "\n" + secondBlock;
            console.log("addAnswerToSecondBlockRule: Added # 回答 to the beginning of the second block.");
        }

        const newBlocks = [firstBlock, secondBlock, ...restOfBlocks];
        const result = newBlocks.join('\n\n');
        console.log("addAnswerToSecondBlockRule: Result:", result);
        return result;
    }
};
