#!/bin/bash
SCRIPT_DIR=$(dirname "$0")
PLUGIN_DIR_1="/mnt/c/Users/ns69a/Documents/Obsidians/development/.obsidian/plugins/chatgpt-formatter/"
PLUGIN_DIR_2="/mnt/c/Users/ns69a/Documents/Obsidians/tech/.obsidian/plugins/chatgpt-formatter/"

# 基本プラグインファイルのコピー
cp "$SCRIPT_DIR/../main.js" "$PLUGIN_DIR_1"
cp "$SCRIPT_DIR/../main.js" "$PLUGIN_DIR_2"
cp "$SCRIPT_DIR/../manifest.json" "$PLUGIN_DIR_1"
cp "$SCRIPT_DIR/../manifest.json" "$PLUGIN_DIR_2"

# スタイルシートのコピー
cp "$SCRIPT_DIR/../styles.css" "$PLUGIN_DIR_1"
cp "$SCRIPT_DIR/../styles.css" "$PLUGIN_DIR_2"

# 設定ファイルのコピー
cp "$SCRIPT_DIR/../rules-config.json" "$PLUGIN_DIR_1"
cp "$SCRIPT_DIR/../rules-config.json" "$PLUGIN_DIR_2"
cp "$SCRIPT_DIR/../versions.json" "$PLUGIN_DIR_1"
cp "$SCRIPT_DIR/../versions.json" "$PLUGIN_DIR_2"

# data.jsonファイル（ユーザー設定）のコピー
# data.jsonが存在する場合のみコピー
if [ -f "$SCRIPT_DIR/../data.json" ]; then
  cp "$SCRIPT_DIR/../data.json" "$PLUGIN_DIR_1"
  cp "$SCRIPT_DIR/../data.json" "$PLUGIN_DIR_2"
fi
