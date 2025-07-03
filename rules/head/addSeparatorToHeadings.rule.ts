import { FormatterRule } from "../../formatter.types";
import { RuleCategory } from "../../services/categories";

export const addSeparatorToHeadingsRule: FormatterRule = {
    id: "add-separator-to-headings",
    enabled: true,
    category: RuleCategory.HEAD,
    apply: (text: string): string => {
        const lines = text.split('\n');
        const result: string[] = [];
        let firstHeadingFound = false;
        let inCodeBlock = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // コードブロックの開始・終了を検出
            if (line.match(/^```/)) {
                inCodeBlock = !inCodeBlock;
                result.push(line);
                continue;
            }

            // コードブロック内は処理をスキップ
            if (inCodeBlock) {
                result.push(line);
                continue;
            }

            // 見出し（> で始まる行）を検出
            if (line.match(/^>\s/)) {
                if (!firstHeadingFound) {
                    // 1番目の見出し：見出しの後に---を追加
                    result.push(line);
                    // 次の非空行がセパレーターでないかチェック
                    let shouldAddSeparator = true;
                    for (let j = i + 1; j < lines.length; j++) {
                        const nextLine = lines[j];
                        if (nextLine.trim() !== '') {
                            if (nextLine.match(/^\s*---\s*$/)) {
                                shouldAddSeparator = false;
                            }
                            break;
                        }
                    }
                    if (shouldAddSeparator) {
                        result.push('---');
                    }
                    firstHeadingFound = true;
                } else {
                    // 2番目以降の見出し：見出しの前に---を追加
                    // 直前の非空行がセパレーターでないかチェック
                    let shouldAddSeparator = true;
                    for (let j = result.length - 1; j >= 0; j--) {
                        const prevLine = result[j];
                        if (prevLine.trim() !== '') {
                            if (prevLine.match(/^\s*---\s*$/)) {
                                shouldAddSeparator = false;
                            }
                            break;
                        }
                    }
                    if (shouldAddSeparator) {
                        result.push('---');
                    }
                    result.push(line);
                }
            } else {
                result.push(line);
            }
        }

        return result.join('\n');
    }
};
