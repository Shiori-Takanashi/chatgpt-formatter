// テスト用ファイル - 見出しセパレーターのルールをテスト
import { addSeparatorToHeadingsRule } from './rules/head/addSeparatorToHeadings.rule';

const testText = `# 質問
これは質問です。

## サブ見出し1
内容1

### さらに詳細な見出し
詳細内容

## サブ見出し2
内容2`;

console.log('元のテキスト:');
console.log(testText);
console.log('\n変換後のテキスト:');
console.log(addSeparatorToHeadingsRule.apply(testText));
