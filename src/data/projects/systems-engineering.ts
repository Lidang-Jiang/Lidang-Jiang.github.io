import type { Project } from '@/types/project'
import { PROJECT_CATEGORIES } from '@/utils/project-groups'

export const systemsEngineeringProjects: Project[] = [
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
    githubStars: '8,778',
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
    githubStars: '1,402',
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
    githubStars: '37,275',
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
      en: 'Agent configuration and hooks automation toolkit for Claude Code and Codex workflows.',
      zh: '面向 Claude Code 与 Codex 工作流的 agents、hooks 与配置自动化项目。',
    },
    techStack: ['TypeScript', 'Node.js', 'Agents', 'Hooks', 'Codex'],
    contributions: {
      en: [
        'Improved Windows compatibility around paths, temp files, and persistent instructions.',
        'Added MCP startup_timeout_sec support and completed related hooks/runtime fixes.',
      ],
      zh: [
        '改进 Windows 路径、临时文件与 persistent_instructions 相关兼容性。',
        '为 MCP server 增加 startup_timeout_sec，并完成相关 hooks/runtime 修复。',
      ],
    },
    github: 'https://github.com/affaan-m/everything-claude-code',
    githubStars: '156,478',
  },
]
