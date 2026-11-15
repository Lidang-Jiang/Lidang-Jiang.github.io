#!/usr/bin/env bash
set -euo pipefail

# 使用专用克隆，避免定时任务修改正在开发的工作区。
state_dir="${CITATIONS_STATE_DIR:-$HOME/.cache/lidang-website-citations}"
repo_url="${CITATIONS_REPO_URL:-https://github.com/Lidang-Jiang/Lidang-Jiang.github.io}"
checkout="$state_dir/checkout"
data_path='src/data/citation-counts.json'
export GIT_TERMINAL_PROMPT=0

fail() {
  printf '%s\n' "$1" >&2
  exit 1
}

git_checked() {
  if ! git -C "$checkout" "$@" >/dev/null 2>&1; then
    fail 'Git 同步失败；已保留专用克隆现场，请检查后重试。'
  fi
}

mkdir -p "$state_dir"
exec 9>"$state_dir/sync.lock"
if ! flock -n 9; then
  printf '已有引用更新任务运行，本次跳过。\n'
  exit 0
fi

if ! command -v node >/dev/null 2>&1; then
  nvm_script="${NVM_DIR:-$HOME/.nvm}/nvm.sh"
  [[ -r "$nvm_script" ]] || fail '未找到 Node.js 或 NVM。'
  # NVM 初始化需要兼容未设置的可选变量。
  set +u
  # shellcheck source=/dev/null
  source "$nvm_script" --no-use
  nvm use default >/dev/null
  set -u
fi
command -v node >/dev/null 2>&1 || fail 'Node.js 初始化失败。'

[[ ! -L "$checkout" ]] || fail '专用克隆路径不能是符号链接。'
if [[ ! -e "$checkout" ]]; then
  if ! git clone --quiet --branch main --single-branch -- "$repo_url" "$checkout" >/dev/null 2>&1; then
    fail '无法建立引用数据专用克隆；请检查网络与 Git 认证。'
  fi
fi
[[ -d "$checkout/.git" ]] || fail '专用目录不是独立 Git 克隆。'
[[ "$(git -C "$checkout" remote get-url --all origin)" == "$repo_url" ]] || fail '专用克隆 origin 不匹配。'
[[ "$(git -C "$checkout" remote get-url --push --all origin)" == "$repo_url" ]] || fail '专用克隆推送地址不匹配。'
[[ "$(git -C "$checkout" branch --show-current)" == 'main' ]] || fail '专用克隆不在 main 分支。'
[[ -z "$(git -C "$checkout" status --porcelain=v1 --untracked-files=all)" ]] \
  || fail '专用克隆已有未提交变更，停止以保护现场。'

git_checked fetch origin main
[[ "$(git -C "$checkout" rev-list --count origin/main..HEAD)" == '0' ]] \
  || fail '专用克隆已有未推送提交，停止以保护现场。'
git_checked pull --ff-only origin main

printf '开始刷新 Google Scholar 引用数据。\n'
(
  cd "$checkout"
  node scripts/fetch-citations.mjs --require-fresh
)

changes="$(git -C "$checkout" status --porcelain=v1 --untracked-files=all)"
if [[ -z "$changes" ]]; then
  printf '引用数据没有变化，无需提交。\n'
  exit 0
fi
[[ "$changes" == " M $data_path" || "$changes" == "M  $data_path" || "$changes" == "MM $data_path" ]] \
  || fail '刷新产生了引用缓存之外的变更，停止以保护现场。'
[[ -f "$checkout/$data_path" && ! -L "$checkout/$data_path" ]] \
  || fail '引用缓存不是普通文件。'

if [[ "$repo_url" == *github.com* ]]; then
  author="$(git -C "$checkout" var GIT_AUTHOR_IDENT)"
  committer="$(git -C "$checkout" var GIT_COMMITTER_IDENT)"
  [[ "$author" == *'<lidangjiang@gmail.com>'* && "$committer" == *'<lidangjiang@gmail.com>'* ]] \
    || fail 'GitHub 提交邮箱不符合用户配置，停止提交。'
  [[ "${author%% <*}" == "${committer%% <*}" ]] || fail 'Git 作者与提交者姓名不一致，停止提交。'
fi

git_checked add -- "$data_path"
git_checked diff --cached --check
git_checked commit -m 'chore: update Google Scholar citation counts' -- "$data_path"
git_checked pull --rebase origin main
git_checked push origin HEAD:refs/heads/main
printf 'Google Scholar 引用数据已提交并推送。\n'
