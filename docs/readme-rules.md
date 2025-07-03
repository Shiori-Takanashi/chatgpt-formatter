# ルール詳細

## ルールシステムの概要

ChatGPT Formatterは、モジュラー式のルールシステムを採用しています。各ルールは独立して動作し、カテゴリ別に整理されています。

## ルールの実行順序

ルールは`order`プロパティに基づいて順次実行されます：

| Order | ルール名 | カテゴリ | 説明 |
|-------|----------|----------|------|
| 1 | addSeparatorToHeadingsRule | 見出し | 見出しにセパレーターを追加 |
| 2 | removeQuoteLinesRule | 引用 | 引用文を削除 |
| 4 | addAnswerToSecondBlockRule | 見出し | h1=回答を2番目のブロックに追加 |
| 5 | quoteAnswerBlockRule | 引用 | 回答ブロックを引用形式にする |
| 100 | addEndSeparatorRule | 見出し | テキスト終了時にセパレーターを追加 |

## カテゴリ別ルール詳細

### 見出し (HEAD)

#### addSeparatorToHeadingsRule
```typescript
// 処理対象: > で始まる行
// 実行順序: 1 (最初に実行)

入力:
> 見出し1
内容1

> 見出し2
内容2

出力:
> 見出し1
---
内容1

---
> 見出し2
内容2
```

**特徴:**
- 1番目の見出しの下に`---`を追加
- 2番目以降の見出しの上に`---`を追加
- コードブロック内は処理をスキップ
- 既存のセパレーターがある場合は追加しない

#### addEndSeparatorRule
```typescript
// 実行順序: 100 (最後に実行)

入力:
テキスト内容

出力:
テキスト内容

---
```

**特徴:**
- テキストの最後に`\n\n---`を追加
- 既にセパレーターで終わっている場合は追加しない
- 空白行を挟んでセパレーターがある場合も検出

### 引用 (QUOTE)

#### removeQuoteLinesRule
```typescript
// 処理対象: >で始まる行
// 実行順序: 2

入力:
> 引用文1
通常のテキスト
> 引用文2

出力:
通常のテキスト
```

**特徴:**
- `>`で始まる行を削除
- コードブロック内は処理をスキップ
- 見出し以外の引用文を除去

#### quoteAnswerBlockRule
```typescript
// 処理対象: # 回答を含むブロック
// 実行順序: 5

入力:
# 回答
回答内容1
回答内容2

出力:
# 回答
> 回答内容1
> 回答内容2
```

**特徴:**
- 回答ブロック全体を引用形式に変換
- 見出し行は引用符を付けない

### 準備 (SETUP)

#### moveCursorToStartRule
- UI表示用のルール
- カーソルを文頭に移動

#### selectAllRule
- UI表示用のルール
- 全テキストを選択

## ルールの詳細仕様

### コードブロック保護

全てのルールは以下のパターンでコードブロックを保護します：

```typescript
// コードブロックの検出
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
```

### 重複防止機能

#### セパレーター重複防止
```typescript
// 既存セパレーターのチェック
if (prevLine.match(/^\s*---\s*$/)) {
    shouldAddSeparator = false;
}
```

#### 空白行考慮
```typescript
// 直前の非空行を探す
for (let j = result.length - 1; j >= 0; j--) {
    const prevLine = result[j];
    if (prevLine.trim() !== '') {
        // 非空行が見つかったら処理
        break;
    }
}
```

## カスタムルールの作成

### 基本構造
```typescript
import { FormatterRule } from "../../formatter.types";
import { RuleCategory } from "../../services/categories";

export const customRule: FormatterRule = {
    id: "custom-rule",
    name: "カスタムルール名",
    description: "ルールの説明",
    enabled: false,
    order: 10,
    category: RuleCategory.HEAD,
    apply: (text: string): string => {
        // ルールのロジックを実装
        const lines = text.split('\n');
        const result: string[] = [];

        // 処理ロジック

        return result.join('\n');
    }
};
```

### 必須プロパティ
- `id`: 一意識別子
- `name`: 表示名
- `description`: 説明文
- `enabled`: デフォルト有効/無効
- `order`: 実行順序
- `category`: カテゴリ
- `apply`: 処理関数

### ベストプラクティス
1. **コードブロック保護**: 必ず実装
2. **重複防止**: 既存要素の確認
3. **空白行考慮**: trim()の適切な使用
4. **テスト**: 各パターンのテストケース作成

## トラブルシューティング

### ルールが動作しない
- `enabled: true`になっているか確認
- `order`の値が適切か確認
- `apply`関数でエラーが発生していないか確認

### 予期しない結果
- 他のルールとの実行順序を確認
- コードブロック保護が正しく動作しているか確認
- 正規表現パターンが正確か確認
