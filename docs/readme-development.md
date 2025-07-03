# 開発者向けドキュメント

## 開発環境のセットアップ

### 必要な環境
- Node.js (v14以上)
- npm または yarn
- TypeScript
- Git

### セットアップ手順
```bash
# リポジトリをクローン
git clone https://github.com/[username]/chatgpt-formatter.git
cd chatgpt-formatter

# 依存関係をインストール
npm install

# 開発用ビルド
npm run dev

# プロダクション用ビルド
npm run build
```

## プロジェクト構造

```
chatgpt-formatter/
├── main.ts                 # メインプラグインファイル
├── manifest.json          # プラグインマニフェスト
├── package.json           # NPM設定
├── tsconfig.json          # TypeScript設定
├── esbuild.config.mjs     # ビルド設定
├── styles.css             # プラグインスタイル
├── formatter.ts           # フォーマッター本体
├── formatter.types.ts     # 型定義
├── rules-config.json      # ルール初期設定
├── versions.json          # バージョン履歴
├── services/              # サービスクラス
│   ├── categories.ts      # カテゴリ定義
│   ├── config-manager.ts  # 設定管理
│   └── rule-manager.ts    # ルール管理
├── rules/                 # フォーマットルール
│   ├── index.ts          # ルールエクスポート
│   ├── setup/            # 準備系ルール
│   ├── head/             # 見出し系ルール
│   ├── quote/            # 引用系ルール
│   └── _exclude/         # 除外ルール
├── tools/                # 開発ツール
│   ├── dev-all.sh        # 全開発タスク実行
│   ├── dev-gen-index.sh  # インデックス生成
│   ├── dev-npm-run-build.sh # ビルド実行
│   ├── dev-cp-arch.sh    # アーカイブコピー
│   └── gen-index.cjs     # インデックス生成スクリプト
└── docs/                 # ドキュメント
    ├── readme-main.md
    ├── readme-installation.md
    ├── readme-usage.md
    ├── readme-settings.md
    ├── readme-development.md
    └── readme-rules.md
```

## 新しいルールの追加

### 1. ルールファイルの作成
```typescript
// rules/[category]/newRule.rule.ts
import { FormatterRule } from "../../formatter.types";
import { RuleCategory } from "../../services/categories";

export const newRule: FormatterRule = {
    id: "new-rule",
    name: "新しいルール",
    description: "ルールの説明",
    enabled: false,
    order: 10,
    category: RuleCategory.HEAD,
    apply: (text: string): string => {
        // ルールのロジックを実装
        return text;
    }
};
```

### 2. インデックスファイルの更新
```bash
# 自動生成
bash tools/dev-gen-index.sh
```

### 3. テストの実行
```bash
npm test
```

## ビルドプロセス

### 開発用ビルド
```bash
npm run dev
# または
bash tools/dev-npm-run-build.sh
```

### 全開発タスクの実行
```bash
bash tools/dev-all.sh
```

このスクリプトは以下を順次実行：
1. インデックスファイル生成
2. TypeScriptビルド
3. プラグインファイルのコピー

## デバッグ方法

### コンソールでのデバッグ
```typescript
console.log("Debug info:", data);
```

### Obsidian Developer Consoleの使用
1. `Ctrl+Shift+I` でDeveloper Toolsを開く
2. Consoleタブでログを確認

### プラグインの再読み込み
1. Community pluginsでプラグインを無効化
2. 再度有効化

## テストの追加

```typescript
// tests/rules/newRule.test.ts
import { newRule } from "../../rules/[category]/newRule.rule";

describe("newRule", () => {
    test("should format text correctly", () => {
        const input = "test input";
        const expected = "expected output";
        const result = newRule.apply(input);
        expect(result).toBe(expected);
    });
});
```

## リリースプロセス

### 1. バージョンの更新
```bash
# package.jsonとmanifest.jsonのバージョンを更新
npm version patch|minor|major
```

### 2. ビルドとテスト
```bash
npm run build
npm test
```

### 3. リリースファイルの準備
- `main.js`
- `manifest.json`
- `styles.css`

### 4. GitHubでリリース作成
1. タグを作成
2. リリースノートを記述
3. アセットファイルをアップロード

## コントリビューション

### Pull Requestの作成
1. フォークを作成
2. フィーチャーブランチを作成
3. 変更を実装
4. テストを追加/更新
5. Pull Requestを作成

### コーディング規約
- TypeScriptの厳密モードを使用
- ESLintルールに従う
- 関数とクラスにはJSDocコメントを追加
- テストカバレッジを維持
