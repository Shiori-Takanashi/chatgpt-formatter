import { FormatterRule } from "../formatter.types";
import { RuleCategory } from "./categories";
import { ALL_EMOJIS } from "../services/all-emoji";

function escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const emojiPatternPart = ALL_EMOJIS.map(escapeRegExp).join('|');
const linePattern = new RegExp(`^(#{1,6})(\\s)(${emojiPatternPart})(\\s)(.*)$`);
const emptyLinePattern = /^$/;

export const removeEmojiUnderEmojiRule: FormatterRule = {
    id: "remove-emoji-from-specific-pattern",
    name: "特定パターンの3行目から絵文字とスペースを削除",
    description: "# 絵文字、空行、# 絵文字の行が続く場合の処理。",
    enabled: false,
    order: 6,
    category: RuleCategory.CONTENT,
    apply: (text) => {
        const lines = text.split('\n');
        const newLines: string[] = [];
        let i = 0;
        while (i < lines.length) {
            if (i + 2 < lines.length) {
                const line1 = lines[i];
                const line2 = lines[i + 1];
                const line3 = lines[i + 2];

                const match1 = line1.match(linePattern);
                const matchEmpty = line2.match(emptyLinePattern);
                const match3 = line3.match(linePattern);

                if (match1 && matchEmpty && match3) {
                    // 1行目と2行目はそのまま
                    newLines.push(line1);
                    newLines.push(line2);
                    // 3行目は絵文字とスペースを除去した上で > を付与
                    const modifiedLine3 = `${match3[1]}${match3[2]}${match3[5]}`;
                    newLines.push(`${modifiedLine3}`);
                    i += 3;
                    // 3行目以降、空行が出るまで > を付与
                    while (i < lines.length && !lines[i].match(emptyLinePattern)) {
                        newLines.push(`${lines[i]}`);
                        i++;
                    }
                    // 空行が出た場合はそのまま追加
                    if (i < lines.length && lines[i].match(emptyLinePattern)) {
                        newLines.push(lines[i]);
                        i++;
                    }
                    continue;
                }
            }
            newLines.push(lines[i]);
            i++;
        }
        return newLines.join('\n');
    }
};
