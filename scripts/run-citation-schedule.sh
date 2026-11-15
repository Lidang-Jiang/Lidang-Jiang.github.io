#!/usr/bin/env bash
set -euo pipefail

export CITATIONS_STATE_DIR="${CITATIONS_STATE_DIR:-$HOME/.cache/lidang-website-citations}"
mkdir -p "$CITATIONS_STATE_DIR"

# 将调度日志留在运行目录，退出码沿用实际同步任务。
exec /bin/bash "$CITATIONS_STATE_DIR/sync-citations.sh" >> "$CITATIONS_STATE_DIR/scheduler.log" 2>&1
