import type { Project } from '@/types/project'
import { pullRequests } from '@/data/project-prs'
import { PROJECT_CATEGORIES } from '@/utils/project-groups'

export const systemsEngineeringProjects: Project[] = [
  {
    id: 40,
    title: {
      en: 'RP3 Lightweight Intelligence Requirements Delivery',
      zh: 'RP3轻智能需求交付',
    },
    period: '2026.10 — Present',
    category: PROJECT_CATEGORIES.systemsEngineering,
    projectType: {
      en: 'Embedded Product Development and Delivery',
      zh: '嵌入式产品开发与交付',
    },
    role: {
      en: 'OpenHarmony Graphics and Performance Developer',
      zh: 'OpenHarmony 图形渲染与性能优化开发',
    },
    module: {
      en: 'GPU component optimization, font-performance evaluation, full-screen copy benchmarks, and drawing-behavior analysis',
      zh: 'GPU 组件性能优化、字体性能评估、全屏拷贝基准与绘制行为分析',
    },
    background: {
      en: 'Graphics performance work for lightweight smart devices based on the OpenHarmony small system, covering existing GPU UI paths, CPU/GPU font-composition evaluation, reproducible on-device copy benchmarks, and drawing-behavior analysis to inform implementation choices.',
      zh: '面向基于 OpenHarmony small 系统的轻智能设备，优化既有 GPU UI 绘制路径，评估 CPU/GPU 字体合成性能，建立可复现的板端拷贝基准，并通过绘制行为与性能分析支持方案选型。',
    },
    techStack: [
      'C++',
      'OpenHarmony',
      'OpenGL ES',
      'GPU Rendering',
      'Embedded Systems',
    ],
    contributions: {
      en: [
        'Optimized existing GPU paths for rounded solid-color and gradient progress bars by combining draw submissions and reusing gradient resources. In a same-board Mali-T820 microbenchmark with a 1024×600 offscreen FBO and a 300×30 solid-color rounded bar, all 300 samples after 30 warm-up iterations showed a mean OnDraw return time of 0.293 ms versus 1.520 ms at baseline, an 80.7% reduction in CPU-side function elapsed time.',
        'Conducted staged GPU performance research and optimization for existing image-sequence animation, including per-stage timing, texture-upload overhead analysis, and validation of existing final-frame cache behavior; consistent overall performance gains remain unconfirmed.',
        'Completed CPU/GPU font-composition analysis and an atlas batching prototype with cache-correctness fixes and an 8bpp sampling fast path. Timed the production DrawLetter call directly and separately measured batch completion. Tested on Mali-T820 with Chinese glyphs at font size 40 and 8bpp and a 1024×600 RGB565 target, using a steady-state working set of at most 16 distinct glyphs, 100 warm-up batches, and 1,000 measured batches × 5 rounds; passed 23 Mesa pixel regressions and 8 on-device pixel checks.',
        'Measured batch-completion speedups of 1.42× and 2.12× for 64 and 256 glyphs. For 16 glyphs, CPU/GPU completion took 1.067 ms / 1.908 ms, so the CPU remained faster. Used these results to defer product integration for the current few-glyph workload, retaining the experimental code in a local backup branch and documenting the findings.',
        'Developed an independent memcpy_s benchmark modeled on FlushWithModeCopy, using a gralloc dma_buf source and a write-combine DRM dumb buffer destination. Compared per-line and bulk copies and memcpy_s versus memcpy with correctness checks. At 1024×600 ARGB8888, three rounds of 20 warm-up iterations and 1,000 measurements each established a 14.426 ms mean full-screen per-line copy baseline; delivered the test report and code patch.',
        'Completed static analysis of UI_ROOT_VIEW / UI_VIEW_GROUP drawing and the effects of skipping background fills, comparing the default L0 path in the same-source baseline. Submitted a report explaining how GLES full-window redraw affects the drawing start point and container calls, and assessing transparent-background handling and partial-refresh risks.',
      ],
      zh: [
        '优化既有圆头纯色与渐变进度条的 GPU 绘制路径，合并绘制提交并复用渐变资源。在同板 Mali-T820、1024×600 离屏 FBO、300×30 圆头纯色条的组件微基准中，预热 30 次后统计全部 300 个样本，OnDraw 平均耗时由 1.520 ms 降至 0.293 ms，降低约 80.7%（CPU 侧函数返回耗时）。',
        '开展既有序列帧动画的 GPU 性能研究与阶段优化，完成分段耗时、纹理上传开销分析及既有末帧缓存场景验证；稳定的整体性能收益尚未确认。',
        '完成 CPU/GPU 字体合成性能分析及 atlas 合批原型，修复字形缓存正确性并实现 8bpp 采样快路径；直接在生产 DrawLetter 调用点计时，另行测量批次实际完成耗时。在 Mali-T820、40 号 8bpp 中文、1024×600 RGB565 条件下，使用最多 16 个不同字形的稳态工作集，预热 100 批、正式测量 1,000 批 × 5 轮，通过 23 项 Mesa 像素回归与 8 组板端像素校验。',
        '验证 64、256 字形负载的整批完成加速比分别为 1.42×、2.12×；16 字形负载 CPU/GPU 完成耗时为 1.067 ms / 1.908 ms，CPU 仍更快。依据实测结果，对当前少字场景暂缓产品接入，实验代码保留在本地备份分支，并形成性能分析结论。',
        '仿照 FlushWithModeCopy 编写独立 memcpy_s 基准，复现 gralloc dma_buf 源到 write-combine DRM dumb buffer 目标的内存条件，完成逐行与整块拷贝、memcpy_s 与 memcpy 对照及正确性检查。在 1024×600 ARGB8888、三轮各预热 20 次并测量 1,000 次的条件下，全屏逐行拷贝平均耗时为 14.426 ms，形成后续优化基线并交付测试报告与代码补丁。',
        '完成 UI_ROOT_VIEW / UI_VIEW_GROUP 绘制行为及跳过背景填充影响的静态分析，对照同源 L0 默认路径，明确 GLES 全窗口重绘对绘制起点和容器调用的影响，评估透明背景处理与局部刷新风险，并提交分析报告。',
      ],
    },
    achievements: {
      en: 'Completed existing progress-bar GPU optimization and on-device comparisons; delivered the full-screen copy benchmark, test report, code patch, and UI_ROOT_VIEW / UI_VIEW_GROUP static-analysis report. Completed font-performance evaluation and informed the workload-based integration decision; the font prototype is backed up locally and not merged into the product. Image-sequence optimization remains staged research.',
      zh: '完成既有进度条 GPU 性能优化与板端对照，交付全屏拷贝测试基准、报告和代码补丁，以及 UI_ROOT_VIEW / UI_VIEW_GROUP 静态分析报告；完成字体性能评估并支持场景选型，字体原型仅在本地备份、未合入产品；序列帧优化保留阶段研发状态。',
    },
  },
  {
    id: 41,
    title: {
      en: 'OpenHarmony Ability Lite: CMSIS-RTOS2 Migration and LTS Backport',
      zh: 'OpenHarmony Ability Lite：CMSIS-RTOS2 适配与 LTS 回移',
    },
    period: '2026.08 — 2026.10',
    category: PROJECT_CATEGORIES.systemsEngineering,
    projectType: {
      en: 'Open-Source Contribution and Product Delivery',
      zh: '开源贡献与产品交付',
    },
    role: {
      en: 'RP2 Delivery Developer and Open-Source Contributor',
      zh: 'RP2 需求交付开发与开源贡献者',
    },
    module: {
      en: 'Ability Lite thread abstraction and lifecycle compatibility',
      zh: 'Ability Lite 线程抽象与生命周期兼容',
    },
    background: {
      en: 'Delivered the LiteOS-M task-interface migration for OpenHarmony Ability Lite as part of the RP2 framework-service abstraction effort, then backported the implementation to OpenHarmony-6.1-LTS.',
      zh: '在 RP2 框架服务子系统统一抽象层适配中，承接 OpenHarmony Ability Lite 的 LiteOS-M 任务接口迁移，并将同一实现回移至 OpenHarmony-6.1-LTS。',
    },
    techStack: [
      'C++',
      'OpenHarmony',
      'LiteOS-M',
      'CMSIS-RTOS2',
      'OS Abstraction',
      'Embedded Systems',
    ],
    contributions: {
      en: [
        'Migrated LiteOS-M task creation, deletion, scheduler locking, and current-thread queries to CMSIS-RTOS2; propagated opaque osThreadId_t handles across the framework and service layers and standardized thread entry signatures.',
        'Preserved per-instance JS threads and queues and shared Native threads and queues, while handling scheduler-lock state restoration and resource cleanup on creation failures.',
        'Completed community review and the relevant code-check, compilation, and board-test gates; coordinated target-board integration validation and backported the same implementation to the LTS branch.',
      ],
      zh: [
        '将 LiteOS-M 任务创建、删除、调度锁及当前线程查询迁移至 CMSIS-RTOS2，贯通 framework 与 service 的 osThreadId_t 句柄传递，并统一线程入口签名。',
        '保持 JS 每实例线程与队列、Native 共享线程与队列的既有模型，处理调度锁状态恢复及创建失败时的资源回收。',
        '完成社区评审及相关代码检查、编译和板测门禁，配合目标板集成验证，并将同一实现回移至 LTS 分支。',
      ],
    },
    achievements: {
      en: 'Merged 2 PRs: the mainline migration into master on September 17, 2026, and the same implementation backported to OpenHarmony-6.1-LTS on October 15, 2026.',
      zh: '已合并 2 个 PR，完成主线适配与同一实现的 LTS 回移：分别于 2026 年 9 月 17 日合入 master、10 月 15 日合入 OpenHarmony-6.1-LTS。',
    },
    pullRequests: pullRequests(
      'https://gitcode.com/openharmony/ability_ability_lite',
      [402, 404],
    ),
  },
  {
    id: 39,
    title: {
      en: 'Kubernetes',
      zh: 'Kubernetes',
    },
    period: '2026.06.15 — 2026.07.01',
    category: PROJECT_CATEGORIES.systemsEngineering,
    projectType: {
      en: 'Open-Source Contribution',
      zh: '开源贡献',
    },
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'Production-grade container orchestration system.',
      zh: '生产级容器编排系统。',
    },
    techStack: [
      'Go',
      'Kubernetes',
      'Node API',
      'StatefulSet',
      'HPA',
      'Declarative Validation',
    ],
    contributions: {
      en: [
        'Landed 3 merged PRs migrating Node.Spec.ProviderID set-once constraints, StatefulSet immutable-field validation, and HPA CrossVersionObjectReference Kind/Name validation to the declarative validation path, with equivalence coverage and generated validation updates.',
      ],
      zh: [
        '已合并 3 个 PR，将 Node.Spec.ProviderID 的 set-once 约束、StatefulSet 核心不可变字段，以及 HPA 引用对象的 Kind/Name 校验迁移到 declarative validation，并补充等价验证和生成代码。',
      ],
    },
    github: 'https://github.com/kubernetes/kubernetes',
    githubStars: '124,377',
    pullRequests: pullRequests('https://github.com/kubernetes/kubernetes', [
      138080,
      138077,
      138082,
    ]),
  },
  {
    id: 33,
    title: {
      en: 'crawlee-python',
      zh: 'crawlee-python',
    },
    period: '2026.04.14',
    category: PROJECT_CATEGORIES.systemsEngineering,
    projectType: {
      en: 'Open-Source Contribution',
      zh: '开源贡献',
    },
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'Python crawling and browser-automation library maintained by Apify.',
      zh: 'Apify 维护的 Python 爬虫与浏览器自动化库。',
    },
    techStack: ['Python', 'Crawlee', 'Testing', 'CI Stability'],
    contributions: {
      en: ['Replaced fixed sleeps with poll-based assertions in a flaky autoscaling test to improve CI stability.'],
      zh: ['将 flaky 的 test_autoscales 改为轮询断言，提升 CI 稳定性。'],
    },
    github: 'https://github.com/apify/crawlee-python',
    githubStars: '9,414',
    pullRequests: pullRequests('https://github.com/apify/crawlee-python', [
      1835,
    ]),
  },
  {
    id: 22,
    title: {
      en: 'opcua-asyncio',
      zh: 'opcua-asyncio',
    },
    period: '2026.04.05',
    category: PROJECT_CATEGORIES.systemsEngineering,
    projectType: {
      en: 'Open-Source Contribution',
      zh: '开源贡献',
    },
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'Asyncio-based Python implementation of the OPC UA industrial protocol.',
      zh: '基于 asyncio 的 Python OPC UA 工业协议实现。',
    },
    techStack: ['Python', 'asyncio', 'OPC UA', 'Industrial Protocol'],
    contributions: {
      en: [
        'Fixed explicit certificate-format handling, uint16 sequence-number overflow, and NodeId typing issues.',
        'Fixed PubSub TTL validation and key-name handling for UdpSettings.',
      ],
      zh: [
        '修复显式证书格式参数、uint16 sequence number overflow 与 NodeId 类型标注问题。',
        '修复 PubSub TTL 校验与 UdpSettings key name 的兼容性问题。',
      ],
    },
    github: 'https://github.com/FreeOpcUa/opcua-asyncio',
    githubStars: '1,453',
    pullRequests: pullRequests('https://github.com/FreeOpcUa/opcua-asyncio', [
      1954,
      1955,
      1956,
      1957,
    ]),
  },
  {
    id: 23,
    title: {
      en: 'Docker Compose',
      zh: 'Docker Compose',
    },
    period: '2026.04.03',
    category: PROJECT_CATEGORIES.systemsEngineering,
    projectType: {
      en: 'Open-Source Contribution',
      zh: '开源贡献',
    },
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'Multi-service container orchestration tool for local development and deployment workflows.',
      zh: '容器多服务编排工具，支持本地开发与部署工作流。',
    },
    techStack: ['Go', 'Docker', 'Containers', 'Tar'],
    contributions: {
      en: ['Returned non-ErrNotExist stat failures from Tar.Sync() instead of swallowing them silently.'],
      zh: ['在 Tar.Sync() 中返回非 ErrNotExist 的 stat 错误，避免异常被静默吞掉。'],
    },
    github: 'https://github.com/docker/compose',
    githubStars: '38,035',
    pullRequests: pullRequests('https://github.com/docker/compose', [13684]),
  },
  {
    id: 24,
    title: {
      en: 'Everything Claude Code',
      zh: 'Everything Claude Code',
    },
    period: '2026.03.28 — 2026.03.29',
    category: PROJECT_CATEGORIES.systemsEngineering,
    projectType: {
      en: 'Open-Source Contribution',
      zh: '开源贡献',
    },
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'Agent configuration and hooks automation toolkit.',
      zh: 'AI agent 配置与 hooks 自动化项目。',
    },
    techStack: ['TypeScript', 'Node.js', 'Agents', 'Hooks', 'Codex'],
    contributions: {
      en: [
        'Landed 5 merged PRs covering Windows path compatibility, Codex persistent_instructions, MCP startup_timeout_sec, observer temp-file handling, and hooks denylist migration.',
      ],
      zh: [
        '已合并 5 个 PR，覆盖 Windows 路径兼容、Codex baseline 的 persistent_instructions、MCP startup_timeout_sec、observer 临时文件兼容与 hooks denylist 迁移。',
      ],
    },
    github: 'https://github.com/affaan-m/ECC',
    githubStars: '238,856',
    pullRequests: pullRequests(
      'https://github.com/affaan-m/ECC',
      [971, 972, 974, 977, 992],
    ),
  },
]
