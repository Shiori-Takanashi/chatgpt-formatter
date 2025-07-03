import { RuleCategory } from "./services/categories";

export interface FormatterRule {
    id: string;          // 一意の識別子
    name?: string;       // 表示名（rule-metadataで管理）
    description?: string; // ルールの説明（rule-metadataで管理）
    enabled: boolean;    // 有効/無効フラグ
    order?: number;      // 実行順序（rule-metadataで管理）
    category: RuleCategory; // ルールのカテゴリ
    apply: (text: string) => string; // 適用関数

    // オプションの設定（必要に応じて）
    options?: Record<string, any>;
}
