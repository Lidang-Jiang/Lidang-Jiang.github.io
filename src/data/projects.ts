import type { Project } from '@/types/project'
import { PROJECT_CATEGORIES } from '@/utils/project-groups'

export const projects: Project[] = [
  {
    id: 13,
    title: {
      en: 'vLLM-Kunlun (Baidu Kunlun Chip LLM Inference Framework)',
      zh: 'vLLM-Kunlun（百度昆仑芯大模型推理框架）',
    },
    period: '2025.08.18 — Present',
    category: PROJECT_CATEGORIES.aiInfra,
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'LLM inference framework for Baidu Kunlun XPU that adapts capabilities such as PagedAttention to Kunlun P800, enabling high-performance inference for mainstream models such as Qwen.',
      zh: '面向百度昆仑芯 XPU 的大模型推理框架，将 PagedAttention 等关键能力适配到 Kunlun P800，支持 Qwen 等主流模型高性能推理。',
    },
    techStack: ['Python', 'PyTorch', 'C++', 'Kunlun P800', 'PagedAttention'],
    contributions: {
      en: [
        'Resolved garbled Qwen2.5-7B outputs on P800 Float16 by tracing tensor statistics around the Attention path and helping narrow the issue to XPU operator internals.',
        'Fixed an InternVL inference KeyError, added a built-in environment diagnostics script, and aligned code and documentation versioning to 0.15.1.',
        'Improved installation and tutorial docs, fixed Sphinx warnings that broke Read the Docs builds, and removed deprecated flags across multiple documentation files.',
      ],
      zh: [
        '通过分析 Attention 路径前后的张量统计信息，解决 Qwen2.5-7B 在 P800 Float16 环境下输出乱码问题，并协助将故障范围收敛到 XPU 算子内部。',
        '修复 InternVL 推理 KeyError，新增内置环境诊断脚本，并统一代码与文档版本到 0.15.1。',
        '优化安装与教程文档，修复导致 Read the Docs 构建失败的 Sphinx warnings，并批量移除已废弃参数。',
      ],
    },
    achievements: {
      en: 'Included in the official documentation Acknowledgments and contributed 6 merged PRs after open-sourcing.',
      zh: '名字被收录于官方文档 Acknowledgments，开源后已贡献 6 个合并 PR。',
    },
    github: 'https://github.com/baidu/vLLM-Kunlun',
  },
  {
    id: 14,
    title: {
      en: 'SGLang',
      zh: 'SGLang',
    },
    period: '2026.04.06',
    category: PROJECT_CATEGORIES.aiInfra,
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'High-performance LLM serving and inference framework focused on optimized runtime and multi-backend deployment.',
      zh: '面向大模型在线服务、推理优化与多后端部署的高性能推理框架。',
    },
    techStack: ['Python', 'PyTorch', 'LLM Serving', 'Testing'],
    contributions: {
      en: [
        'Added auth and token validation unit tests for auth.py.',
        'Added regression coverage for Hermes, Llama32, and Mistral function_call detectors.',
      ],
      zh: [
        '为 auth.py 增补鉴权与 token 校验单元测试。',
        '为 Hermes、Llama32、Mistral 的 function_call detector 补充回归测试。',
      ],
    },
    github: 'https://github.com/sgl-project/sglang',
  },
  {
    id: 15,
    title: {
      en: 'RLLM',
      zh: 'RLLM',
    },
    period: '2026.04.04',
    category: PROJECT_CATEGORIES.aiInfra,
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'Research framework for reinforcement learning and LLM training workflows with integrations such as verl.',
      zh: '面向强化学习与大模型协同训练的研究框架，支持与 verl 等组件集成。',
    },
    techStack: ['Python', 'RLHF', 'verl', 'Training'],
    contributions: {
      en: [
        'Updated import-path compatibility for verl 0.7.1+ to prevent failures after upstream path changes.',
      ],
      zh: [
        '更新 verl 0.7.1+ 的 import path 兼容逻辑，修复上游路径变更导致的导入失败。',
      ],
    },
    github: 'https://github.com/rllm-org/rllm',
  },
  {
    id: 16,
    title: {
      en: 'vLLM-Omni',
      zh: 'vLLM-Omni',
    },
    period: '2026.03.05 — 2026.04.03',
    category: PROJECT_CATEGORIES.aiInfra,
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'Omni and multimodal inference extension built on vLLM for speech and text generation scenarios.',
      zh: '基于 vLLM 的 omni 与多模态推理扩展，覆盖语音与文本等生成场景。',
    },
    techStack: ['Python', 'vLLM', 'Multimodal', 'Gradio', 'Logging'],
    contributions: {
      en: [
        'Replaced bare print calls with structured logging and narrowed exception handling.',
        'Made gradio optional and updated the version floor to improve dependency flexibility.',
        'Fixed HTTP status handling for create_speech error responses.',
      ],
      zh: [
        '用结构化 logger 替换 bare print，并收紧异常处理范围。',
        '将 gradio 调整为可选依赖并更新版本下界，提升依赖兼容性。',
        '修复 create_speech 错误响应的 HTTP 状态码处理。',
      ],
    },
    github: 'https://github.com/vllm-project/vllm-omni',
  },
  {
    id: 17,
    title: {
      en: 'OpenRLHF',
      zh: 'OpenRLHF',
    },
    period: '2026.04.03',
    category: PROJECT_CATEGORIES.aiInfra,
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'Distributed training framework for RLHF and alignment experiments.',
      zh: '面向 RLHF 训练与对齐实验的分布式训练框架。',
    },
    techStack: ['Python', 'Ray', 'RLHF', 'NCCL'],
    contributions: {
      en: [
        'Ensured the Ray runtime respects user-defined NCCL_DEBUG values instead of overwriting them.',
      ],
      zh: [
        '确保 Ray runtime 尊重用户显式设置的 NCCL_DEBUG 环境变量，避免配置被覆盖。',
      ],
    },
    github: 'https://github.com/OpenRLHF/OpenRLHF',
  },
  {
    id: 18,
    title: {
      en: 'Transformers',
      zh: 'Transformers',
    },
    period: '2026.03.30',
    category: PROJECT_CATEGORIES.aiInfra,
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'Flagship Hugging Face library for model implementations plus training and inference utilities.',
      zh: 'Hugging Face 维护的主流模型库与训练、推理工具链。',
    },
    techStack: ['Python', 'Transformers', 'PIL', 'TorchVision'],
    contributions: {
      en: [
        'Removed the incorrect torchvision requirement from PIL backend image processors to reduce unnecessary installs and runtime breakage.',
      ],
      zh: [
        '移除 PIL backend image processor 对 torchvision 的错误依赖，减少不必要安装与运行失败。',
      ],
    },
    github: 'https://github.com/huggingface/transformers',
  },
  {
    id: 1,
    title: {
      en: 'Haikou Police Administrative Knowledge Base',
      zh: '海口公安政务知识库',
    },
    period: '2024.07.25 — 2024.09.25',
    category: PROJECT_CATEGORIES.aiInfra,
    module: {
      en: 'RAG System Construction and LLM Evaluation (Algorithm)',
      zh: 'RAG 系统构建和大模型评测（算法）',
    },
    background: {
      en: 'Intelligent administrative knowledge base for the Haikou Police system, using RAG to improve answer quality for administrative knowledge queries.',
      zh: '面向海口公安系统的智能政务知识库，采用 RAG 提升大模型在政务知识问答中的回答准确性。',
    },
    techStack: ['Python', 'RAG', 'Milvus', 'TeleChat LLM', 'Embeddings'],
    contributions: {
      en: [
        'Participated in administrative data cleaning and structured processing for knowledge-base construction.',
        'Collected and analyzed responses to more than 20,000 real administrative queries for LLM testing and optimization.',
      ],
      zh: [
        '参与政务数据清洗与结构化处理，完成知识库构建。',
        '收集并分析 20000+ 条真实政务问题的模型回答，支撑大模型测试与优化。',
      ],
    },
  },
  {
    id: 19,
    title: {
      en: 'Genesis',
      zh: 'Genesis',
    },
    period: '2026.03.28 — 2026.04.05',
    category: PROJECT_CATEGORIES.embodiedAi,
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'General-purpose physics simulation platform for embodied AI and robotics workloads.',
      zh: '面向具身智能与机器人任务的通用物理仿真平台。',
    },
    techStack: ['Python', 'C++', 'Physics Simulation', 'Robotics', 'WSL2'],
    contributions: {
      en: [
        'Fixed GPU detection in WSL2 test infrastructure and corrected camera lookat behavior when entity_idx is set.',
        'Added public APIs for rigid-body kinetic and potential energy and fixed multi-robot IK DOF mapping.',
        'Fixed motion planning crashes on short paths and corrected the set_propellers_rpm API spelling.',
      ],
      zh: [
        '修复 WSL2 测试环境 GPU 检测问题，并修正设置 entity_idx 后 camera lookat 失效的问题。',
        '新增刚体动能与势能公开 API，并修复多机器人场景 IK 的 DOF 映射错误。',
        '修复短路径下 motion planning 崩溃，并更正 set_propellers_rpm API 拼写。',
      ],
    },
    github: 'https://github.com/Genesis-Embodied-AI/Genesis',
  },
  {
    id: 20,
    title: {
      en: 'PyTorch RL',
      zh: 'PyTorch RL',
    },
    period: '2026.04.05',
    category: PROJECT_CATEGORIES.embodiedAi,
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'Reinforcement learning library and training toolkit in the PyTorch ecosystem.',
      zh: 'PyTorch 生态中的强化学习组件库与训练工具集。',
    },
    techStack: ['Python', 'PyTorch', 'Reinforcement Learning'],
    contributions: {
      en: [
        'Added a strict_shape parameter to QValueModule for stronger action-shape enforcement.',
      ],
      zh: [
        '为 QValueModule 新增 strict_shape 参数，强化 action shape 校验。',
      ],
    },
    github: 'https://github.com/pytorch/rl',
  },
  {
    id: 21,
    title: {
      en: 'ManiSkill',
      zh: 'ManiSkill',
    },
    period: '2026.03.30',
    category: PROJECT_CATEGORIES.embodiedAi,
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'Robotics simulation and benchmark platform for manipulation tasks.',
      zh: '面向机器人操作任务的仿真与 benchmark 平台。',
    },
    techStack: ['Python', 'Robotics', 'Gymnasium', 'Benchmark'],
    contributions: {
      en: [
        'Fixed replay_trajectory compatibility with gymnasium>=1.0.',
        'Corrected the PlugCharger-v1 dense reward label in the documentation.',
      ],
      zh: [
        '修复 replay_trajectory 在 gymnasium>=1.0 下的兼容性问题。',
        '修正文档中 PlugCharger-v1 dense reward 标签错误。',
      ],
    },
    github: 'https://github.com/haosulab/ManiSkill',
  },
  {
    id: 22,
    title: {
      en: 'opcua-asyncio',
      zh: 'opcua-asyncio',
    },
    period: '2026.04.05',
    category: PROJECT_CATEGORIES.systemsEngineering,
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
        '拓宽 reference 方法的 NodeId 类型标注，并修复 PubSub UdpSettings key name 大小写与 TTL 校验问题。',
        '修复 DataSetWriter 的 uint16 sequence number 溢出问题，并修复证书加载函数忽略显式 format 参数的问题。',
      ],
    },
    github: 'https://github.com/FreeOpcUa/opcua-asyncio',
  },
  {
    id: 23,
    title: {
      en: 'Docker Compose',
      zh: 'Docker Compose',
    },
    period: '2026.04.03',
    category: PROJECT_CATEGORIES.systemsEngineering,
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
  },
  {
    id: 24,
    title: {
      en: 'Everything Claude Code',
      zh: 'Everything Claude Code',
    },
    period: '2026.03.28 — 2026.03.29',
    category: PROJECT_CATEGORIES.systemsEngineering,
    role: {
      en: 'Contributor',
      zh: '贡献者',
    },
    background: {
      en: 'Agent configuration, hooks, and automation toolkit for Claude Code and Codex workflows.',
      zh: '面向 Claude Code 与 Codex 的 agents、hooks 和配置自动化项目。',
    },
    techStack: ['TypeScript', 'Node.js', 'Agents', 'Hooks', 'Codex'],
    contributions: {
      en: [
        'Ported the doc-file-warning denylist to the current hooks runtime and improved observer compatibility on Windows.',
        'Added an os.homedir() fallback for Windows and introduced persistent_instructions to the Codex baseline.',
        'Added startup_timeout_sec to MCP servers to avoid first-run timeouts.',
      ],
      zh: [
        '将 doc-file-warning denylist 迁移到当前 hooks runtime，并改进 observer 在 Windows 下的兼容性。',
        '为 Windows 增加 os.homedir() fallback，并为 Codex baseline 补充 persistent_instructions。',
        '为 MCP server 增加 startup_timeout_sec，避免首次启动超时。',
      ],
    },
    github: 'https://github.com/affaan-m/everything-claude-code',
  },
  {
    id: 12,
    title: {
      en: 'University Researcher Profile System',
      zh: '高校科研人员个人信息展示系统',
    },
    period: '2025.05.25 — 2025.06.04',
    category: PROJECT_CATEGORIES.webApp,
    module: {
      en: 'Client + Admin Frontend + Backend API',
      zh: '客户端 + 管理端前端系统 + 后端 API',
    },
    background: {
      en: 'Personal portal system for university researchers, integrating academic achievements display, project management, and news updates, with multilingual internationalization support.',
      zh: '面向高校研究人员的个人门户系统，集成学术成果展示、项目管理与新闻动态，支持多语言国际化。',
    },
    techStack: [
      'Vue 2.7',
      'Element UI',
      'Vue I18n',
      'Vue Router',
      'Vite',
      'Quill Editor',
      'Spring Boot',
      'MyBatis-Plus',
      'MySQL',
    ],
    contributions: {
      en: [
        'Built the complete client and admin frontends, including seamless Chinese and English switching with Vue I18n.',
        'Designed and implemented backend RESTful APIs for the News and Project modules.',
      ],
      zh: [
        '完成前后台完整前端开发，并基于 Vue I18n 实现中英文无缝切换。',
        '设计并实现 News 与 Project 模块的后端 RESTful API。',
      ],
    },
    achievements: {
      en: 'Deployed on a real research-team website.',
      zh: '已部署到实际科研团队官网。',
    },
    github: 'https://github.com/Lidang-Jiang/UniversityResearcherProfiles',
    demo: 'https://www.hegelab.com/',
  },
  {
    id: 11,
    title: {
      en: 'Government-Enterprise Platform V3.1',
      zh: '干企万户平台 V3.1',
    },
    period: '2025.05.15 — 2025.05.31',
    category: PROJECT_CATEGORIES.webApp,
    module: {
      en: 'Government Data Management Features (Frontend)',
      zh: '数据状态跟踪与批量审批功能（前端）',
    },
    background: {
      en: 'Added data-status tracking and batch-approval capabilities to solve cross-department data coordination challenges.',
      zh: '新增数据状态跟踪与批量审批能力，解决跨部门数据协同难题。',
    },
    techStack: ['Vue 2', 'Element UI', 'Vuex', 'Vite'],
    contributions: {
      en: [
        'Implemented batch approval workflows.',
        'Built a data-status tracking list for operational visibility.',
      ],
      zh: [
        '实现批量审批流程。',
        '开发数据状态跟踪列表。',
      ],
    },
  },
  {
    id: 10,
    title: {
      en: 'Haikou 12345 Intelligent Report System V1.0',
      zh: '海口12345智能报告系统 V1.0',
    },
    period: '2025.05.13 — 2025.05.31',
    category: PROJECT_CATEGORIES.webApp,
    module: {
      en: 'Intelligent Report Editor and Template Management (Frontend)',
      zh: '智能报告编辑器与模板管理模块（前端）',
    },
    background: {
      en: 'Government hotline report automation system that generates structured reports from work-order data, improving manual reporting efficiency and format consistency.',
      zh: '政务热线报告自动化系统，实现从工单数据到结构化报告的智能生成，解决人工编制报告效率低和格式不统一的问题。',
    },
    techStack: ['Vue 2', 'Element UI', 'Quill', 'Vuex', 'Vite'],
    contributions: {
      en: [
        'Built the intelligent template management system.',
        'Developed the interactive report-template editor, including extensible table components and a DeepSeek instruction dialog.',
      ],
      zh: [
        '开发智能模板管理系统。',
        '开发交互式报表模板编辑器，包括可扩展表格组件和 DeepSeek 指令弹窗组件。',
      ],
    },
  },
  {
    id: 9,
    title: {
      en: '928 Hospital - Model Command System V2.0',
      zh: '928医院-模型化指挥系统 V2.0',
    },
    period: '2025.03.31 — 2025.04.09',
    category: PROJECT_CATEGORIES.webApp,
    module: {
      en: 'Todo Items and Task Supervision Module (Frontend)',
      zh: '待办事项与任务督办模块（前端）',
    },
    background: {
      en: 'Added a todo-items module to establish a closed-loop task supervision mechanism and solve V1.0 issues around scattered tasks and collaboration blind spots.',
      zh: '新增待办事项模块，建立任务督办闭环机制，解决 V1.0 中任务分散管理、跨部门协作困难和进度追踪盲区等问题。',
    },
    techStack: ['Vue 2', 'Element UI', 'Vuex', 'Vite'],
    contributions: {
      en: [
        'Implemented dual-view task mode.',
        'Developed the department tree-selection component.',
      ],
      zh: [
        '实现任务双视图模式。',
        '开发部门树形选择组件。',
      ],
    },
  },
  {
    id: 8,
    title: {
      en: 'Risk Monitoring and Early Warning System Common Service Platform V1.0.1',
      zh: '风险监测预警体系共性服务平台系统 V1.0.1',
    },
    period: '2025.03.10 — 2025.03.21',
    category: PROJECT_CATEGORIES.webApp,
    module: {
      en: 'Warning Model Management and Configuration Module (Frontend)',
      zh: '预警模型管理与配置模块（前端）',
    },
    background: {
      en: 'Restructured the core modules of a government-level risk warning platform, establishing warning linkage and improving multi-source data adaptability.',
      zh: '重构政府级风险预警平台核心模块，建立预警联动机制，提升多源数据适配能力。',
    },
    techStack: ['Vue 2', 'Element UI', 'Vuex', 'Vite'],
    contributions: {
      en: [
        'Implemented a three-state filtering mechanism.',
        'Built a model-type and entity-type linkage component that auto-fills warning names from tree-structured data.',
      ],
      zh: [
        '实现三态筛选机制。',
        '构建模型类型与实体类型联动组件，并根据树形数据自动填充预警名称。',
      ],
    },
  },
  {
    id: 7,
    title: {
      en: 'Red Detachment of Women Memorial Park Digital Platform V1.2.0',
      zh: '红色娘子军纪念园数字化平台 V1.2.0',
    },
    period: '2025.02.25 — 2025.03.06',
    category: PROJECT_CATEGORIES.webApp,
    module: {
      en: 'Official Site / Youth Version / Admin Panel Collaboration (Frontend)',
      zh: '官网/青少年版/管理后台三端协同（前端）',
    },
    background: {
      en: 'Experience upgrade based on V1.0, restructuring the visiting-service process and enabling data intercommunication across three terminals.',
      zh: '基于 V1.0 进行体验升级，重构参观服务流程，实现三端数据互通。',
    },
    techStack: ['Vue 2', 'Element UI', 'Vuex', 'Vite'],
    contributions: {
      en: [
        'Designed and implemented a unified reservation service system across three terminals.',
        'Delivered secure document download and server-side rendering for Word templates.',
      ],
      zh: [
        '设计并实现三端统一预约服务系统。',
        '实现安全文档下载与 Word 模板服务端渲染。',
      ],
    },
  },
  {
    id: 6,
    title: {
      en: 'Government-Enterprise Platform V2',
      zh: '干企万户平台 V2',
    },
    period: '2025.02.21 — 2025.02.25',
    category: PROJECT_CATEGORIES.webApp,
    module: {
      en: 'Enterprise Data Batch Validation (Frontend)',
      zh: '企业数据批量校验功能（前端）',
    },
    background: {
      en: 'Government enterprise verification platform that connects to the National Market Entity API for batch validation of company names and unified credit codes.',
      zh: '政务企业数据核验平台，通过对接国家市场主体 API 实现企业名称与统一信用代码的批量核验。',
    },
    techStack: ['Vue 2', 'Element UI', 'Axios', 'Vite', 'ESLint', 'Prettier'],
    contributions: {
      en: [
        'Implemented batch import for Excel files.',
        'Built a real-time validation-progress display component.',
      ],
      zh: [
        '实现 Excel 文件批量导入功能。',
        '开发实时校验进度展示组件。',
      ],
    },
  },
  {
    id: 5,
    title: {
      en: 'Project Platform Management System V2.6',
      zh: '项目平台管理系统 V2.6',
    },
    period: '2025.01.13 — 2025.02.06',
    category: PROJECT_CATEGORIES.webApp,
    module: {
      en: 'Mobile Approval Center Module (Frontend)',
      zh: '移动端审批中心模块（前端）',
    },
    background: {
      en: 'Internal project management platform with multiple approval workflows. V2.6 added business-opportunity approval to improve opportunity governance.',
      zh: '公司内部项目管理平台，覆盖多个审批流程与管理功能，V2.6 新增商机审批功能以提升商机管理效率。',
    },
    techStack: ['Vue 2', 'Vue Router', 'Pinia', 'Vant', 'ESLint', 'Prettier'],
    contributions: {
      en: [
        'Developed the mobile Approval Center for viewing and processing business-opportunity, overtime, contract, and other approval tasks.',
      ],
      zh: [
        '负责开发移动端审批中心，支持查看和处理商机审批、加班任务审批、合同审批等多种审批任务。',
      ],
    },
  },
  {
    id: 4,
    title: {
      en: 'Digital Campus System V2.0.5',
      zh: '数字校园系统 V2.0.5',
    },
    period: '2024.12.13 — 2024.12.24',
    category: PROJECT_CATEGORIES.webApp,
    module: {
      en: 'PC Work Assignment + WeChat Delegation Verification (Frontend)',
      zh: 'PC 端分工管理 + 公众号端委托验证（前端）',
    },
    background: {
      en: 'Comprehensive school-management platform covering both PC and WeChat public-account workflows for class duty management and student pickup delegation verification.',
      zh: '面向学校的综合管理与服务平台，覆盖 PC 端和值得公众号端流程，实现班级分工管理与学生接送委托验证。',
    },
    techStack: ['Vue 2', 'Vue Router', 'Vuex', 'Element UI', 'uni-app', 'ESLint', 'Prettier'],
    contributions: {
      en: [
        'Built the PC-side Work Assignment Settings module.',
        'Implemented QR-code verification and the delegation-verification form for the WeChat public-account flow.',
      ],
      zh: [
        '负责 PC 端分工设置模块开发。',
        '实现公众号端扫码验证与委托验证表单开发。',
      ],
    },
  },
  {
    id: 3,
    title: {
      en: 'Red Detachment of Women Memorial Park Digital Platform V1.0',
      zh: '红色娘子军纪念园数字化平台 V1.0',
    },
    period: '2024.11.11 — 2024.11.30',
    category: PROJECT_CATEGORIES.webApp,
    module: {
      en: 'Admin Panel + Youth PC Client (Frontend)',
      zh: '管理后台 + 青少年 PC 端（前端）',
    },
    background: {
      en: 'Digital platform for the Red Detachment of Women Memorial Park, including an admin panel, PC client, and youth PC client for visits, study tours, and transportation guidance.',
      zh: '红色娘子军纪念园数字化平台，包含管理后台、PC 端和青少年 PC 端，提供参观服务、研学活动管理和交通指南等能力。',
    },
    techStack: ['Vue 2', 'Vue Router', 'Element UI', 'Vant', 'ESLint', 'Prettier'],
    contributions: {
      en: [
        'Built the Study Tour Registration Management module in the admin panel.',
        'Developed the Visit Services section for the youth PC client.',
      ],
      zh: [
        '负责管理后台研学报名管理模块开发。',
        '负责青少年 PC 端参观服务板块功能开发。',
      ],
    },
  },
  {
    id: 2,
    title: {
      en: 'Project Operation Management Platform V2.5',
      zh: '项目经营管理平台 V2.5',
    },
    period: '2024.10.22 — 2024.11.20',
    category: PROJECT_CATEGORIES.webApp,
    module: {
      en: 'PC Vehicle Reports + Mobile Workbench and Approval (Frontend)',
      zh: 'PC 端车辆报表 + 移动端工作台与审批（前端）',
    },
    background: {
      en: 'Internal enterprise vehicle-management system covering both PC and mobile platforms for vehicle usage management, filtering, export, and approval workflows.',
      zh: '企业内部车辆管理系统，覆盖 PC 端和移动端，用于车辆使用管理、数据筛选导出和审批流程处理。',
    },
    techStack: ['Vite', 'Vue 2', 'Vue Router', 'Pinia', 'Element UI', 'Husky', 'ESLint', 'Stylelint', 'Prettier', 'Vant'],
    contributions: {
      en: [
        'Developed the PC-side Vehicle Reports module.',
        'Developed the mobile Workbench, Approval Center, and Vehicle Management modules.',
      ],
      zh: [
        '负责 PC 端车辆报表模块开发。',
        '负责移动端工作台、审批中心和用车管理模块开发。',
      ],
    },
  },
]
