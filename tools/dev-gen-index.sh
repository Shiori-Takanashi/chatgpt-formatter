#!/bin/bash

# スクリプトが配置されているディレクトリを取得
SCRIPT_DIR=$(dirname "$0")

# 実行するNode.jsファイルのパスをスクリプトの場所からの相対パスで指定
NODE_FILE="$SCRIPT_DIR/gen-index.cjs"

# Node.jsファイルを実行
node "$NODE_FILE"
