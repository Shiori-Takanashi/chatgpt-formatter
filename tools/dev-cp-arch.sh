#!/bin/bash
SCRIPT_DIR=$(dirname "$0")
PLUGIN_DIR="/mnt/c/Users/ns69a/Documents/Obsidians/development/.obsidian/plugins/chatgpt-formatter/"

# 基本プラグインファイルのコピー
cp "$SCRIPT_DIR/../main.js" "$PLUGIN_DIR"
cp "$SCRIPT_DIR/../manifest.json" "$PLUGIN_DIR"

# スタイルシートのコピー
cp "$SCRIPT_DIR/../styles.css" "$PLUGIN_DIR"

# 設定ファイルのコピー
cp "$SCRIPT_DIR/../rules-config.json" "$PLUGIN_DIR"
cp "$SCRIPT_DIR/../versions.json" "$PLUGIN_DIR"

# data.jsonファイル（ユーザー設定）のコピー
# data.jsonが存在する場合のみコピー
if [ -f "$SCRIPT_DIR/../data.json" ]; then
  cp "$SCRIPT_DIR/../data.json" "$PLUGIN_DIR"
else
  echo "Warning: data.json file not found, user settings will not be copied"
fi
