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
      en: 'GLES integration, GPU UI rendering, and performance validation',
      zh: 'GLES 适配、GPU UI 绘制与性能验证',
    },
    background: {
      en: 'Graphics-stack development for lightweight smart devices based on the OpenHarmony small system, with a focus on GPU rendering compatibility, UI performance, and on-device validation.',
      zh: '基于 OpenHarmony small 系统的轻智能设备图形栈开发，围绕 GPU 渲染兼容性、UI 性能及板端验证推进功能交付。',
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
        'Fixed GPU black-screen rendering by completing the declaration, loading, and forwarding of the missing glBlendFuncSeparate entry point in the GLES integration layer.',
        'Implemented GPU drawing for rounded progress bars with solid and gradient colors, retaining CPU fallback and per-context GPU resource cleanup.',
        'Developed and evaluated prototype font texture caching, atlas batching, and GPU optimization for image-sequence animation through staged performance validation.',
      ],
      zh: [
        '补齐 GLES 适配层缺失的 glBlendFuncSeparate 声明、加载与转发，修复 GPU 渲染黑屏问题。',
        '实现圆头纯色与渐变进度条的 GPU 绘制，保留 CPU 回退路径，并完善按 context 管理的 GPU 资源清理。',
        '开展字体纹理缓存、图集批处理及序列帧动画 GPU 优化的原型开发与阶段验证。',
      ],
    },
    achievements: {
      en: 'The GLES black-screen fix and progress-bar GPU optimization are merged into the product branch. Font and image-sequence optimization remain staged research work; the earlier font-cache implementation was reverted after its initial merge.',
      zh: 'GLES 黑屏修复与进度条 GPU 绘制优化已合入产品分支。字体及序列帧优化属于阶段研发，其中早期字体缓存实现在首次合入后已回退。',
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
