// カテゴリの定義
export enum RuleCategory {
    STRUCTURE = "構造",     // 文書構造を変更するルール
    CONTENT = "内容",       // 文書内容を追加/変更するルール
    FORMAT = "書式",        // フォーマットに関するルール
    SPACING = "空白処理",   // 空白や改行に関するルール
    CLEANUP = "クリーンアップ" // 不要部分の削除などを行うルール
}
