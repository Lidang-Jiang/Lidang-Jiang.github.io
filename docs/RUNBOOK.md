# 发布与回滚

最后更新：2026-11-13。

生产站点为 [lidang-jiang.pages.dev](https://lidang-jiang.pages.dev/)。配置来源是 [.github/workflows/deploy.yml](../.github/workflows/deploy.yml) 和 [wrangler.json](../wrangler.json)。本地验证命令见 [CONTRIB.md](CONTRIB.md)。

## 发布流程

1. 在独立功能分支完成变更、代码审查、测试、类型检查、覆盖率检查、静态构建和浏览器验证。
2. 精确暂存本次修改，提交后安全同步至远端 `main`，保护工作区已有修改。仅推送功能分支不会触发生产发布。
3. 推送 `main` 后，GitHub Actions 的 **Deploy to Cloudflare Pages** 工作流使用 Node.js 20、pnpm 9，依次执行冻结锁文件安装、类型检查、测试及覆盖率检查、静态构建和 `pages deploy dist --project-name=lidang-jiang`。也可从 Actions 手动触发该工作流。
4. 等待工作流成功，核对本次运行和 Cloudflare 部署对应的提交 SHA，再检查生产页面。

类型检查与核心逻辑的 80% 覆盖率要求已加入发布门禁；浏览器验收在发布前完成。部署凭证由仓库 Actions secrets 管理。

## 上线检查

直接打开并刷新以下页面，确认页面内容与本次提交一致：

- [首页](https://lidang-jiang.pages.dev/)：人物、主要入口及正文完整可见。
- [项目时间线](https://lidang-jiang.pages.dev/projects)：默认显示时间线，进行中置顶，已结束项目按结束时间倒序。
- [分类总览](https://lidang-jiang.pages.dev/projects/categories)：显示四个分类入口，可切换回时间线。
- [系统工程分类](https://lidang-jiang.pages.dev/projects/systems-engineering)：既有分类直链、项目内容及详情展开正常。

在手机与桌面上抽查中英文、明暗主题、导航和项目详情。HTTP 成功响应只能证明页面可访问，还需确认静态首屏和交互内容正确。

## 微信验证

验证文件 `public/f2d512139db34f256cb94797c2d8264b.txt` 通过已有的 Vite `public` → `dist` → GitHub Actions 流程发布。

1. 发布后，对[生产验证 URL](https://lidang-jiang.pages.dev/f2d512139db34f256cb94797c2d8264b.txt) 发起 GET 请求，禁止自动跟随跳转；响应应为 `200`，`Content-Type` 应为 `text/plain`，正文仅为 `3bc8822430afca54781eacf4b93ad679f2ecf6b6`（UTF-8、无 BOM、无末尾换行）。不能只看状态码 `200`，SPA fallback 可能返回首页 HTML，必须同时核对响应类型和完整正文。
2. 确认响应符合要求后，回到原微信页面点击“已部署，开始验证”，并继续提交申诉。文件上线不等于微信审核通过或域名解封，仍需以微信审核结果为准。
3. 保留验证文件；微信验证材料变化时，同步更新文件及对应的单元测试与 HTTP 回归测试。

## 期刊影响因子

论文与简历页仅将 JCR 影响因子作为正式 IF 展示，不使用实时估算值覆盖。2026-11-13 核验的出版社官方数值为 [Energy：10.1](https://shop.elsevier.com/journals/energy/0360-5442) 和 [Applied Energy：12.2](https://shop.elsevier.com/journals/applied-energy/0306-2619)。官方页面未标明指标统计年度，因此 `jcrYear` 保留为 `null`，以 `verifiedAt` 记录核验日期，不将论文发表年份当作指标年份。

每周自动任务重新抓取出版社官方页面，校验期刊 ISSN、普通影响因子字段和数值后更新数据；新值上升或下降均可正常更新，不固定为此次核验值。页面回归读取同一份正式指标数据，不将当前数值写死为永久期望值。抓取失败或页面结构异常时，保留上次成功的正式指标及核验日期并输出警告；没有有效缓存时任务失败，不用实时估算、五年影响因子或 CiteScore 顶替正式 IF。

数据有变化时，自动任务提交并推送指标数据，再调用既有发布工作流部署对应的新提交；没有变化时不空提交。自动提交不会依赖另一个 `push` 事件触发发布。可在 Actions 中手动运行 **Update Impact Factors** 验证整条更新与发布链路。

## 常见问题

| 现象 | 检查方式 |
| --- | --- |
| 冻结锁文件安装失败 | 确认使用 pnpm 9，且 `package.json` 与 `pnpm-lock.yaml` 一起提交；本机全局禁用锁文件时，在安装命令添加 `--lockfile=true` |
| 浏览器测试缺少可执行文件 | 确认 Windows 已安装 Google Chrome，并使用 Windows 的 Node.js 与 Playwright 运行浏览器测试；WSL 预览服务通过 `PLAYWRIGHT_BASE_URL` 连接，不额外下载 Linux 浏览器 |
| 本地测试仍显示旧页面 | 重新运行 `pnpm build`；确认 4173 端口没有遗留的其他预览服务 |
| 新页面刷新异常或缺少静态内容 | 检查路由与 SSG 路径配置，以及对应 `dist/` 产物；确认 sitemap 已同步 |
| 生产页面没有更新 | 对照远端 `main`、Actions 运行和 Cloudflare 部署的提交 SHA，并检查构建与发布日志 |

## 回滚

定位造成问题的提交，在独立分支创建对应的 `git revert` 提交。按开发文档重新运行验证后，将回滚提交安全同步至远端 `main`，由同一工作流重新部署。回滚完成后再次核对部署 SHA 和上述页面；使用新增提交保留发布历史，不通过强制推送改写历史。
