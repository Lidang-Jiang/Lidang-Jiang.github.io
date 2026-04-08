import type { Project } from '@/types/project'
import { PROJECT_CATEGORIES } from '@/utils/project-groups'

export const systemsEngineeringProjects: Project[] = [
  {
    id: 28,
    title: {
      en: 'PyTorch AO',
      zh: 'PyTorch AO',
    },
    period: '2026.04.08',
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
      en: 'Model optimization, quantization, and compiler tooling in the PyTorch ecosystem.',
      zh: 'PyTorch 生态中的模型优化、量化与编译工具库。',
    },
    techStack: ['Python', 'PyTorch', 'Quantization', 'PT2E'],
    contributions: {
      en: [
        'Skipped linear+bn fusion for inputs with rank greater than 2 in PT2E flows, avoiding invalid graph rewrites.',
      ],
      zh: [
        '在 PT2E 场景下为高于 2 维输入跳过 linear+bn 融合，避免错误图优化。',
      ],
    },
    github: 'https://github.com/pytorch/ao',
    githubStars: '2,763',
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
        'Widened NodeId typing for reference methods and fixed PubSub UdpSettings key-name casing plus TTL validation.',
        'Fixed uint16 sequence-number overflow in DataSetWriter and respected explicit format arguments in certificate-loading helpers.',
      ],
      zh: [
        '拓宽 reference 方法的 NodeId 类型标注，并修复 PubSub UdpSettings key name 大小写与 TTL 类型检查。',
        '修复 DataSetWriter sequence number 的 uint16 overflow，并修复证书加载函数忽略显式 format 参数的问题。',
      ],
    },
    github: 'https://github.com/FreeOpcUa/opcua-asyncio',
    githubStars: '1,398',
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
      en: [
        'Returned non-ErrNotExist stat failures from Tar.Sync() instead of swallowing them silently.',
      ],
      zh: [
        '在 Tar.Sync() 中返回非 ErrNotExist 的 stat 错误，避免异常被静默吞掉。',
      ],
    },
    github: 'https://github.com/docker/compose',
    githubStars: '37,218',
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
      en: 'Agent configuration, hooks, and automation toolkit for Claude Code and Codex workflows.',
      zh: '面向 Claude Code / Codex 的 agents、hooks 与配置自动化项目。',
    },
    techStack: ['TypeScript', 'Node.js', 'Agents', 'Hooks', 'Codex'],
    contributions: {
      en: [
        'Ported the doc-file-warning denylist to the current hooks runtime and improved Windows compatibility around observer temp files and the Haiku prompt.',
        'Added an os.homedir() fallback for Windows, introduced persistent_instructions to the Codex baseline, and relaxed the sanity check.',
        'Added startup_timeout_sec to MCP servers to avoid first-run timeouts.',
      ],
      zh: [
        '将 doc-file-warning denylist 迁移到当前 hooks runtime，并改进 observer 临时文件与 Haiku prompt 的 Windows 兼容性。',
        '为 Windows 增加 os.homedir() fallback，为 Codex baseline 补充 persistent_instructions，并放宽 sanity check。',
        '为 MCP server 增加 startup_timeout_sec，避免首次启动超时。',
      ],
    },
    github: 'https://github.com/affaan-m/everything-claude-code',
    githubStars: '144,987',
  },
]
