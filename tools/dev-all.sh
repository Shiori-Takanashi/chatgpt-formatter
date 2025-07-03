#!/bin/bash

# スクリプトが配置されているディレクトリを基準にする
BASE_DIR=$(dirname "$0")

echo ">>>>>>Running dev-gen-index.sh..."
bash "$BASE_DIR/dev-gen-index.sh"

echo ">>>>>>Running dev-npm-run-build.sh..."
bash "$BASE_DIR/dev-npm-run-build.sh"

echo ">>>>>>Running dev-cp-arch.sh..."
bash "$BASE_DIR/dev-cp-arch.sh"

echo "COMPLETE!!!"
