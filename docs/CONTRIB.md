# 开发与验证

项目固定使用 `pnpm@9.15.9`，依赖版本以 `pnpm-lock.yaml` 为准。

最后更新：2026-11-13。

本项目使用 Vue 3、TypeScript、Tailwind CSS 和 Vite SSG，构建产物位于 `dist/`。视觉规范见 [DESIGN.md](../DESIGN.md)，发布流程见 [RUNBOOK.md](RUNBOOK.md)。

## 环境与启动

部署工作流使用 Node.js 20 和 pnpm 9。安装依赖时以 `pnpm-lock.yaml` 为准：

```sh
corepack pnpm@9.15.9 install --frozen-lockfile
corepack pnpm@9.15.9 dev
```

下文的 `pnpm` 命令应使用 pnpm 9；也可以逐条使用 `corepack pnpm@9.15.9` 替代。如果本机全局配置了 `lockfile=false`，安装时显式添加 `--lockfile=true`，确保仍按仓库锁文件安装。

| 命令 | 用途 |
| --- | --- |
| `pnpm dev` | 启动 Vite 开发服务 |
| `pnpm test` | 运行 `src/` 中的 Vitest 单元与 SSR 测试 |
| `pnpm typecheck` | 按应用 TypeScript 配置检查 `.ts` 和 `.vue` 文件 |
| `pnpm test:coverage` | 运行测试并生成 V8 覆盖率报告 |
| `pnpm build` | 静态生成所有发布页面 |
| `pnpm preview` | 预览已有的 `dist/` 构建产物 |
| `pnpm test:e2e` | 使用已安装的 Google Chrome 验证构建后的页面与交互 |

## 验证顺序

```sh
pnpm test
pnpm typecheck
pnpm test:coverage
pnpm build
pnpm test:e2e
```

Playwright 默认启动 `http://127.0.0.1:4173` 的预览服务；运行前必须重新构建，避免测试旧产物。需要检查已有站点时，可通过 `PLAYWRIGHT_BASE_URL` 指定地址，此时测试不会启动本地服务。失败追踪保存在 `test-results/`。

浏览器默认使用系统已有的 Google Chrome，不下载 Playwright 附带的 Chromium。Windows + WSL 环境中，构建与预览服务可以在 WSL 运行，浏览器测试使用 Windows 的 Node.js、Playwright 和 Chrome，并通过 `PLAYWRIGHT_BASE_URL` 连接预览服务；不要额外启动 Linux 图形浏览器。`PLAYWRIGHT_BROWSER_CHANNEL` 可显式选择其他已安装的浏览器通道。仅运行 `e2e/site-verification.spec.ts` 的 HTTP 验证不需要浏览器。

覆盖率门槛为语句、分支、函数和行各 80%，统计范围是 `src/utils/project-*.ts`、`useDisclosure.ts` 与 `useScrollReveal.ts` 的核心可测逻辑。该门槛不代表整个 Vue 应用的覆盖率。报告输出到 `coverage/`。

浏览器回归覆盖项目视图切换、分类直链与刷新、前进后退、详情键盘展开、移动菜单、跳至内容和禁用 JavaScript 的静态首屏。布局检查包含 375、768、1024、1440px，并在手机和桌面尺寸检查中英文、明暗主题与减少动态效果模式。视觉修改还应人工查看截图，确认文字层级、换行和留白符合设计规范。

## 项目内容维护

项目数据位于 `src/data/projects/`，由 `src/data/projects.ts` 汇总。每个项目的 `id` 必须在全量数据中唯一；它同时用于列表标识和详情区域的无障碍关联。

`period` 是唯一日期来源，支持 `YYYY.MM.DD`、年月／日期区间，以及 `2026.10 — Present` 这样的进行中周期。中文页面将 `Present` 显示为“至今”。时间线规则如下：

- 进行中项目单独置顶，组内按开始日期倒序。
- 已结束项目按结束日期倒序，再按开始日期倒序；日期相同时保留来源顺序，并按结束年份分组。
- 月份精度的开始日期按月首、结束日期按月末比较；展示保留原始精度。跨年项目仅出现一次。
- 无法解析的周期位于末尾“日期待补充”组；真实数据测试要求当前项目全部可解析。
- 时间线排序生成独立结果，分类列表保留原有内容顺序。

| 路由 | 内容 |
| --- | --- |
| `/projects` | 默认时间线 |
| `/projects/categories` | 分类总览 |
| `/projects/ai-infra` | AI 基础设施、模型服务与训练优化 |
| `/projects/embodied-ai` | 具身智能、机器人与强化学习 |
| `/projects/systems-engineering` | 系统工程、开发工具与工业集成 |
| `/projects/web-development` | Web、政务与行业数字化应用 |

增加分类或页面时，同时更新路由、静态生成路径和 `public/sitemap.xml`，并补充直链及静态首屏测试。修改项目数据后运行完整测试，检查排序、唯一性与内容回归。
