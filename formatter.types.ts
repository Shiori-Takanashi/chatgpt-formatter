import { RuleCategory } from "./rules/categories";

export interface FormatterRule {
    id: string;          // 一意の識別子
    name: string;        // 表示名
    description?: string; // ルールの説明
    enabled: boolean;    // 有効/無効フラグ
    order: number;       // 実行順序
    category: RuleCategory; // ルールのカテゴリ
    apply: (text: string) => string; // 適用関数

    // オプションの設定（必要に応じて）
    options?: Record<string, any>;
}
