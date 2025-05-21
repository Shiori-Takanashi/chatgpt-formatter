import { FormatterRule } from "../formatter.types";
import { RuleCategory } from "./categories";
import { ALL_EMOJIS } from "../services/all-emoji";

function escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const emojiPatternPart = ALL_EMOJIS.map(escapeRegExp).join('|');
const linePattern = new RegExp(`^(#{1,6})(\\s)(${emojiPatternPart})(\\s)(.*)$`);

export const quoteHeadWithEmojiRule: FormatterRule = {
    id: "quote-head-with-emoji",
    name: "絵文字付きの見出しライン/ブロックを引用形式に",
    description: "",
    enabled: false,
    order: 500, // 絵文字付き見出しブロックを引用
    category: RuleCategory.FORMAT,
    apply: (text) => {
        // ブロックごとに分割（空行2つで区切る）
        const blocks = text.split(/\n{2,}/);
        for (let b = 0; b < blocks.length; b++) {
            const lines = blocks[b].split('\n');
            // ブロックのすべての行が絵文字付き見出しなら引用化
            if (lines.length > 0 && lines.some(line => line.match(linePattern) && line.startsWith('#'))) {
                for (let l = 0; l < lines.length; l++) {
                    lines[l] = '> ' + lines[l];
                }
                blocks[b] = lines.join('\n');
            }
        }
        return blocks.join('\n\n');
    }
};
