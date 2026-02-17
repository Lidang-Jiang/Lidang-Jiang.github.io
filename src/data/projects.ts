import type { Project } from '@/types/project'

export const projects: Project[] = [
  {
    id: 13,
    title: {
      en: 'vLLM-Kunlun (Baidu Kunlun Chip LLM Inference Framework)',
      zh: 'vLLM-Kunlun（百度昆仑芯片大模型推理框架）',
    },
    period: '2025.08.18 — Present',
    role: {
      en: 'Contributor',
      zh: 'Contributor',
    },
    background: {
      en: 'Adapting core technologies like PagedAttention to Baidu Kunlun chip (XPU) hardware, supporting high-performance inference for mainstream models like Qwen.',
      zh: '将 PagedAttention 等核心技术适配至百度昆仑芯片（XPU）硬件，支持 Qwen 等主流模型高性能推理。',
    },
    techStack: ['Python', 'PyTorch', 'C++', 'NVIDIA A800', 'Kunlun P800'],
    contributions: {
      en: [
        'Heterogeneous hardware operator precision debugging: Resolved garbled inference output of Qwen2.5-7B in P800 (Float16) environment. Through statistical analysis, narrowed fault scope from entire model to Attention operator internals, assisting team in fixing XPU operator computation logic defects.',
        'Open-source ecosystem and engineering: Responsible for building official project documentation website (Sphinx+ReadTheDocs); Responsible for release-ready testing, establishing Qwen series model accuracy and performance benchmark baselines.',
      ],
      zh: [
        '异构硬件算子精度调试：解决了 Qwen2.5-7B 在 P800 (Float16) 环境中推理乱码问题。通过统计分析，将故障范围从整个模型缩小到 Attention 算子内部，协助团队修复 XPU 算子计算逻辑缺陷。',
        '开源生态与工程建设：负责建设官方项目文档网站（Sphinx+ReadTheDocs）；负责发布就绪测试，建立 Qwen 系列模型精度和性能 Benchmark 基线。',
      ],
    },
    achievements: {
      en: 'Name included in official documentation Acknowledgments: https://vllm-kunlun.readthedocs.io/en/latest/community/contributors.html',
      zh: '名字收录于官方文档 Acknowledgments：https://vllm-kunlun.readthedocs.io/en/latest/community/contributors.html',
    },
    github: 'https://github.com/baidu/vLLM-Kunlun',
  },
  {
    id: 12,
    title: {
      en: 'University Researcher Profile System',
      zh: '大学研究员档案系统',
    },
    period: '2025.05.25 — 2025.06.04',
    module: {
      en: 'Client + Admin Frontend + Backend API',
      zh: '客户端 + 管理端前端系统 + 后端 API',
    },
    background: {
      en: 'University researcher portal system integrating academic achievement display, project management, and news updates, supporting multilingual internationalization. Open-sourced on GitHub, practically applied to research team websites.',
      zh: '高校研究员个人门户系统，集成学术成果展示、项目管理和新闻更新，支持多语言国际化。GitHub 开源，实际应用于研究团队网站。',
    },
    techStack: ['Vue 2.7', 'Element UI', 'Vue I18n', 'Vue Router', 'Vite', 'Quill Editor', 'Spring Boot', 'MyBatis-Plus', 'MySQL'],
    contributions: {
      en: [
        'Developed complete frontend code for both client and admin panels; Implemented multilingual switching system based on Vue I18n (seamless Chinese-English switching).',
        'Backend API development: Designed and implemented RESTful APIs for News and Project modules.',
      ],
      zh: [
        '开发客户端和管理端完整前端代码；基于 Vue I18n 实现多语言切换系统（中英文无缝切换）。',
        '后端 API 开发：为 News 和 Project 模块设计并实现 RESTful API。',
      ],
    },
    achievements: {
      en: 'Deployed on research team website: https://www.hegelab.com/',
      zh: '部署于研究团队官网: https://www.hegelab.com/',
    },
    github: 'https://github.com/Lidang-Jiang/UniversityResearcherProfiles',
    demo: 'https://www.hegelab.com/',
  },
  {
    id: 11,
    title: {
      en: 'Government-Enterprise Platform V3.1',
      zh: '政企平台 V3.1',
    },
    period: '2025.05.15 — 2025.05.31',
    module: {
      en: 'Government Data Intelligence Management Suite (Frontend)',
      zh: '政府数据智能管理套件（前端）',
    },
    background: {
      en: 'Added data status tracking, batch approval and other features to solve cross-department data coordination challenges.',
      zh: '新增数据状态跟踪、批量审批等功能，解决跨部门数据协调难题。',
    },
    techStack: ['Vue 2', 'Element UI', 'Vuex', 'Vite'],
    contributions: {
      en: [
        'Implemented batch approval functionality.',
        'Developed data status tracking list.',
      ],
      zh: [
        '实现批量审批功能。',
        '开发数据状态跟踪列表。',
      ],
    },
  },
  {
    id: 10,
    title: {
      en: 'Haikou 12345 Intelligent Report System V1.0',
      zh: '海口 12345 智能报告系统 V1.0',
    },
    period: '2025.05.13 — 2025.05.31',
    module: {
      en: 'Intelligent Report Editor and Template Management Center (Frontend)',
      zh: '智能报告编辑器和模板管理中心（前端）',
    },
    background: {
      en: 'Government hotline report automation system that intelligently generates structured reports from work order data, solving the pain points of low manual report efficiency and inconsistent formatting.',
      zh: '政府热线报告自动化系统，从工单数据智能生成结构化报告，解决人工报告效率低和格式不一致的痛点。',
    },
    techStack: ['Vue 2', 'Element UI', 'Quill', 'Vuex', 'Vite'],
    contributions: {
      en: [
        'Intelligent template management system.',
        'Interactive report template editor (expandable table component, DeepSeek instruction dialog component).',
      ],
      zh: [
        '智能模板管理系统。',
        '交互式报告模板编辑器（可扩展表格组件、DeepSeek 指令对话框组件）。',
      ],
    },
  },
  {
    id: 9,
    title: {
      en: '928 Hospital - Model Command System V2.0',
      zh: '928 医院 - 模型指挥系统 V2.0',
    },
    period: '2025.03.31 — 2025.04.09',
    module: {
      en: 'Todo Module (Frontend)',
      zh: '待办事项模块（前端）',
    },
    background: {
      en: 'Added todo module to establish task closed-loop supervision mechanism, solving issues of scattered task management, difficult cross-department collaboration, and progress tracking blind spots in V1.0.',
      zh: '新增待办事项模块，建立任务闭环督办机制，解决 V1.0 中任务管理分散、跨部门协作困难和进度跟踪盲点问题。',
    },
    techStack: ['Vue 2', 'Element UI', 'Vuex', 'Vite'],
    contributions: {
      en: [
        'Implemented dual-view task mode.',
        'Developed department tree selection component.',
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
      en: 'Risk Monitoring and Early Warning System V1.0.1',
      zh: '风险监测预警系统公共服务平台 V1.0.1',
    },
    period: '2025.03.10 — 2025.03.21',
    module: {
      en: 'Warning Model Management CRUD Module (Frontend)',
      zh: '预警模型管理系统 CRUD 模块（前端）',
    },
    background: {
      en: 'Refactored core module of government-level risk warning platform, establishing warning linkage mechanism, solving issues of scattered model management and poor multi-source data adaptability in V1.0.0.',
      zh: '重构政府级风险预警平台核心模块，建立预警联动机制，解决 V1.0.0 中模型管理分散和多源数据适配性差的问题。',
    },
    techStack: ['Vue 2', 'Element UI', 'Vuex', 'Vite'],
    contributions: {
      en: [
        'Implemented tri-state filtering mechanism.',
        'Built model type-entity type linked component, automatically filling warning names based on tree structure data.',
      ],
      zh: [
        '实现三态过滤机制。',
        '构建模型类型-实体类型联动组件，基于树形结构数据自动填充预警名称。',
      ],
    },
  },
  {
    id: 7,
    title: {
      en: 'Red Detachment of Women Memorial Park Digital Platform V1.2.0',
      zh: '红色娘子军纪念园数字平台 V1.2.0',
    },
    period: '2025.02.25 — 2025.03.06',
    module: {
      en: 'Multi-terminal Collaborative Development (Official Chinese Website / Youth Version / Admin Panel) (Frontend)',
      zh: '多终端协同开发（官方中文网站/青少年版/管理面板）（前端）',
    },
    background: {
      en: 'Experience upgrade based on V1.0, refactoring visit service process, achieving three-terminal data interoperability, solving V1.0 compatibility issues and lengthy booking process.',
      zh: '基于 V1.0 的体验升级，重构参观服务流程，实现三端数据互通，解决 V1.0 兼容性差和预约流程冗长的问题。',
    },
    techStack: ['Vue 2', 'Element UI', 'Vuex', 'Vite'],
    contributions: {
      en: [
        'Designed and implemented unified booking service system across three terminals.',
        'Secure document download; Implemented server-side rendering of Word templates.',
      ],
      zh: [
        '设计并实现跨三端统一预约服务系统。',
        '安全文档下载；实现 Word 模板的服务器端渲染。',
      ],
    },
  },
  {
    id: 6,
    title: {
      en: 'Government-Enterprise Platform V2',
      zh: '政企平台 V2',
    },
    period: '2025.02.21 — 2025.02.25',
    module: {
      en: 'Enterprise Data Verification Module (Frontend)',
      zh: '企业数据验证模块（前端）',
    },
    background: {
      en: 'Government enterprise data verification platform providing enterprise information verification services for government, banks, and other institutions. Batch verification of enterprise names and unified credit codes through National Market Entity API.',
      zh: '政府企业数据验证平台，为政府、银行等机构提供企业信息验证服务。通过接入国家市场主体 API，实现批量验证企业名称和统一信用代码。',
    },
    techStack: ['Vue 2', 'Element UI', 'Axios', 'Vite', 'ESLint', 'Prettier'],
    contributions: {
      en: [
        'Implemented Excel file batch import functionality.',
        'Developed real-time verification progress display component.',
      ],
      zh: [
        '实现 Excel 文件批量导入功能。',
        '开发实时验证进度展示组件。',
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
    module: {
      en: 'Mobile "Approval Center" Module (Frontend)',
      zh: '移动端"审批中心"模块开发（前端）',
    },
    background: {
      en: 'Company internal project management platform. V2.6 added "Business Opportunity Approval" feature.',
      zh: '公司内部项目管理平台，V2.6 新增"商机审批"功能。',
    },
    techStack: ['Vue 2', 'Vue Router', 'Pinia', 'Vant', 'ESLint', 'Prettier'],
    contributions: {
      en: [
        'Developed mobile "Approval Center" module, supporting viewing and managing various approval tasks (business opportunity approval, overtime task approval, contract approval, etc.).',
      ],
      zh: [
        '负责开发移动端"审批中心"模块，支持查看和管理各类审批任务（商机审批、加班任务审批、合同审批等）。',
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
    module: {
      en: 'PC Duty Schedule & WeChat Delegation Verification Module (Frontend)',
      zh: 'PC 端值日安排设置及微信公众号委托验证和推送模块（前端）',
    },
    background: {
      en: 'Comprehensive management and service platform for schools, improving work efficiency of homeroom teachers and parents, ensuring student safety and management convenience.',
      zh: '为学校提供综合管理和服务平台，提高班主任和家长的工作效率，保障学生安全和管理便利。',
    },
    techStack: ['Vue 2', 'Vue Router', 'Vuex', 'Element UI', 'uni-app', 'ESLint', 'Prettier'],
    contributions: {
      en: [
        'PC "Duty Schedule Setup" module.',
        'WeChat Official Account "Delegation Verification and Push" module (QR code verification, delegation verification form).',
      ],
      zh: [
        'PC 端"值日安排设置"模块。',
        '微信公众号"委托验证和推送"模块（二维码验证功能、委托验证表单）。',
      ],
    },
  },
  {
    id: 3,
    title: {
      en: 'Red Detachment of Women Memorial Park Digital Platform V1.0',
      zh: '红色娘子军纪念园数字平台 V1.0',
    },
    period: '2024.11.11 — 2024.11.30',
    module: {
      en: 'Multi-terminal Frontend Module Development',
      zh: '多终端前端模块开发',
    },
    background: {
      en: 'Digital platform development for Red Detachment of Women Memorial Park, including admin panel, PC client, and youth PC client, providing visit services, study tour management, and transportation guide.',
      zh: '红色娘子军纪念园数字平台开发，包括管理面板、PC 客户端和青少年 PC 客户端，提供参观服务、研学活动管理、交通指南等功能。',
    },
    techStack: ['Vue 2', 'Vue Router', 'Element UI', 'Vant', 'ESLint', 'Prettier'],
    contributions: {
      en: [
        'Admin panel "Study Tour Registration Management" module.',
        'Youth PC client "Visit Services" section.',
      ],
      zh: [
        '管理面板"研学报名管理"模块。',
        '青少年 PC 客户端"参观服务"板块。',
      ],
    },
  },
  {
    id: 2,
    title: {
      en: 'Project Operations Management Platform V2.5',
      zh: '项目运营管理平台 V2.5',
    },
    period: '2024.10.22 — 2024.11.20',
    module: {
      en: 'PC and Mobile Vehicle Management (Frontend)',
      zh: 'PC 端和移动端车辆管理功能开发（前端）',
    },
    background: {
      en: 'Enterprise internal vehicle management system covering PC and mobile terminals, mainly for vehicle usage management and statistics.',
      zh: '企业内部车辆管理系统，覆盖 PC 和移动端，主要用于车辆使用管理和统计。',
    },
    techStack: ['Vite', 'Vue 2', 'Vue Router', 'Pinia', 'Element UI', 'Husky', 'ESLint', 'Stylelint', 'Prettier', 'Vant'],
    contributions: {
      en: [
        'PC "Vehicle Report" module.',
        'Mobile "Workbench", "Approval Center", and "Vehicle Management" modules.',
      ],
      zh: [
        'PC 端"车辆报告"模块。',
        '移动端"工作台"、"审批中心"和"车辆管理"模块。',
      ],
    },
  },
  {
    id: 1,
    title: {
      en: 'Haikou Public Security Administrative Knowledge Base',
      zh: '海口公安行政知识库',
    },
    period: '2024.07.25 — 2024.09.25',
    module: {
      en: 'RAG System Construction and LLM Evaluation (Algorithm)',
      zh: 'RAG 系统构建和 LLM 评测（算法）',
    },
    background: {
      en: 'Developing intelligent administrative knowledge base for Haikou Public Security system, using RAG technology to improve accuracy of large language models in administrative knowledge queries.',
      zh: '为海口公安系统开发智能行政知识库，采用 RAG 技术提高大语言模型在行政知识查询中的准确性。',
    },
    techStack: ['Embedding Models', 'Milvus', 'TeleChat LLM', 'Python'],
    contributions: {
      en: [
        'Knowledge base construction (administrative data cleaning and structured processing).',
        'LLM testing and optimization (collected and analyzed 20,000+ real administrative query model responses).',
      ],
      zh: [
        '知识库构建（行政数据清洗和结构化处理）。',
        'LLM 测试与优化（收集分析 20000+ 条真实行政查询的模型回复）。',
      ],
    },
  },
]
