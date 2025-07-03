# インストール方法

## 自動インストール（推奨）

### Community Plugins経由
1. Obsidianを開く
2. 設定 → Community plugins
3. Browse → "ChatGPT Formatter"を検索
4. Install → Enable

## 手動インストール

### GitHub Releasesから
1. [Releases](https://github.com/[username]/chatgpt-formatter/releases)から最新版をダウンロード
2. `main.js`, `manifest.json`, `styles.css`をダウンロード
3. Obsidianのプラグインフォルダにコピー

### プラグインフォルダの場所
- **Windows**: `%APPDATA%\Obsidian\plugins\chatgpt-formatter\`
- **macOS**: `~/Library/Application Support/obsidian/plugins/chatgpt-formatter/`
- **Linux**: `~/.config/obsidian/plugins/chatgpt-formatter/`

### 開発版のインストール
```bash
# リポジトリをクローン
git clone https://github.com/[username]/chatgpt-formatter.git

# 依存関係をインストール
cd chatgpt-formatter
npm install

# ビルド
npm run build

# プラグインフォルダにコピー
cp main.js manifest.json styles.css [YOUR_OBSIDIAN_PLUGINS_FOLDER]/chatgpt-formatter/
```

## インストール後の確認

1. Obsidianを再起動
2. 設定 → Community plugins
3. "ChatGPT Formatter"がEnabled状態になっていることを確認
4. コマンドパレット（Ctrl+P）で"ChatGPT"と入力してコマンドが表示されることを確認

## トラブルシューティング

### プラグインが表示されない場合
- Obsidianを完全に再起動
- プラグインフォルダのパスが正しいか確認
- manifest.jsonの形式が正しいか確認

### エラーが発生する場合
- Developer Console（Ctrl+Shift+I）でエラーログを確認
- プラグインを無効化→有効化を試す
- 他のプラグインとの競合がないか確認
