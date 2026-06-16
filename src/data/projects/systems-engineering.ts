import type { Project } from '@/types/project'
import { pullRequests } from '@/data/project-prs'
import { PROJECT_CATEGORIES } from '@/utils/project-groups'

export const systemsEngineeringProjects: Project[] = [
  {
    id: 39,
    title: {
      en: 'Kubernetes',
      zh: 'Kubernetes',
    },
    period: '2026.06.15',
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
    techStack: ['Go', 'Kubernetes', 'StatefulSet', 'Declarative Validation'],
    contributions: {
      en: [
        'Migrated StatefulSet immutable-field validation to the declarative validation path across apps/v1, v1beta1, and v1beta2, with equivalence coverage and generated validation updates.',
      ],
      zh: [
        '将 StatefulSet 不可变字段迁移到 declarative validation，并补充 apps/v1、v1beta1、v1beta2 等价验证和生成代码。',
      ],
    },
    github: 'https://github.com/kubernetes/kubernetes',
    githubStars: '123,039',
    pullRequests: pullRequests('https://github.com/kubernetes/kubernetes', [
      138080,
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
    githubStars: '9,198',
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
    githubStars: '1,432',
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
    githubStars: '37,526',
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
    githubStars: '216,302',
    pullRequests: pullRequests(
      'https://github.com/affaan-m/ECC',
      [971, 972, 974, 977, 992],
    ),
  },
]
