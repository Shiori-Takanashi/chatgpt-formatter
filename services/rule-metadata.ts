export interface RuleMetadata {
    name: string;
    description: string;
    order: number;
}

export const ruleMetadata: { [id: string]: RuleMetadata } = {
    // order: 0
    "move-cursor-to-start": {
        name: "カーソルを文頭に移動",
        description: "Alt+C実行時にカーソルを文頭の先頭に移動させます（UI表示用）",
        order: 0
    },

    // order: 1
    "select-all": {
        name: "Alt+Cでフォーマット処理を実行",
        description: "Alt+Cホットキーで全テキストに対してフォーマット処理を実行します（UI表示用）",
        order: 1
    },

    // order: 2
    "remove-text-before-first-heading": {
        name: "最初の見出し前のテキストを削除",
        description: "最も上の見出しより上にある全ての文字を削除します",
        order: 2
    },

    // order: 3
    "add-separator-to-headings": {
        name: "見出しにセパレーターを追加",
        description: "1番目の見出しの下に---を、それ以外の見出しの上に---を追加します",
        order: 3
    },

    // order: 4
    "remove-quote-lines": {
        name: "引用文を削除",
        description: "単なる引用文（>で始まる行）を削除します",
        order: 4
    },

    // order: 5
    "convert-headings-to-quotes": {
        name: "見出しを引用スタイルに変換",
        description: "#, ## で始まる行のみを > #, > ## で始まるように変換します（###以上は対象外）",
        order: 5
    },

    // order: 50
    "add-end-separator": {
        name: "テキスト終了時にセパレーターを追加",
        description: "全てのテキストが終了したら改行2つと---を追加します",
        order: 50
    },

    // order: 51
    "remove-last-section-without-heading": {
        name: "見出しのない最後のセクションを削除",
        description: "---と---に囲まれた最後の文字に見出し行が含まれていない場合、上側の---とその文字を全て削除します",
        order: 51
    }
};
