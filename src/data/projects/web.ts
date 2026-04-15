import type { Project } from '@/types/project'
import { PROJECT_CATEGORIES } from '@/utils/project-groups'

export const webProjects: Project[] = [
  {
    id: 12,
    title: {
      en: 'University Researcher Profile System',
      zh: '高校科研人员个人信息展示系统',
    },
    period: '2025.05.25 — 2025.06.04',
    category: PROJECT_CATEGORIES.webApp,
    projectType: {
      en: 'Personal Open-Source Full-Stack Web App',
      zh: '个人开源全栈 Web 应用',
    },
    role: {
      en: 'Independent Full-Stack Developer',
      zh: '独立全栈开发',
    },
    module: {
      en: 'Bilingual client/admin frontends and backend REST APIs',
      zh: '中英双语前后台与后端 RESTful 接口',
    },
    background: {
      en: 'Personal portal system for university research groups, covering profile display, academic achievements, and multilingual content delivery.',
      zh: '面向高校科研团队的个人门户系统，覆盖个人信息展示、学术成果管理与多语言内容交付。',
    },
    techStack: [
      'Vue 2.7',
      'Element UI',
      'Vue I18n',
      'Vue Router',
      'Vite',
      'Spring Boot',
      'MyBatis-Plus',
      'MySQL',
    ],
    contributions: {
      en: [
        'Independently built both front-end clients and the backend REST APIs.',
        'Added bilingual switching and deployed the project to a live research-team website.',
      ],
      zh: [
        '独立完成前后台前端与后端 RESTful API 开发。',
        '支持中英切换，并已部署到真实科研团队官网。',
      ],
    },
    achievements: {
      en: 'Deployed to a live research-team site and open-sourced on GitHub.',
      zh: '已部署到真实科研团队官网，并在 GitHub 开源。',
    },
    github: 'https://github.com/Lidang-Jiang/UniversityResearcherProfiles',
    githubStars: '0',
    demo: 'https://www.hegelab.com/',
  },
  {
    id: 10,
    title: {
      en: 'Haikou 12345 Intelligent Report System V1.0',
      zh: '海口12345智能报告系统 V1.0',
    },
    period: '2025.05.13 — 2025.05.31',
    category: PROJECT_CATEGORIES.webApp,
    projectType: {
      en: 'Government Hotline Automation System',
      zh: '政务热线自动化系统',
    },
    role: {
      en: 'Front-End Developer',
      zh: '前端开发',
    },
    module: {
      en: 'Template management, report editor, and DeepSeek prompt flow',
      zh: '模板管理、报表编辑器与 DeepSeek 指令交互',
    },
    background: {
      en: 'Government hotline automation system for generating structured reports from work-order data.',
      zh: '面向工单数据到结构化报告生成流程的政务热线自动化系统。',
    },
    techStack: ['Vue 2', 'Element UI', 'Quill', 'Vuex', 'Vite'],
    contributions: {
      en: [
        'Built the intelligent template management flow.',
        'Delivered the interactive report editor and DeepSeek prompt dialog.',
      ],
      zh: [
        '负责智能模板管理流程开发。',
        '完成交互式报表编辑器与 DeepSeek 指令弹窗开发。',
      ],
    },
  },
  {
    id: 11,
    title: {
      en: 'Government-Enterprise Platform (V2 / V3.1)',
      zh: '干企万户平台（V2 / V3.1）',
    },
    period: '2025.02.21 — 2025.05.31',
    category: PROJECT_CATEGORIES.webApp,
    projectType: {
      en: 'Government Enterprise Data Platform',
      zh: '政务企业数据平台',
    },
    role: {
      en: 'Front-End Developer',
      zh: '前端开发',
    },
    module: {
      en: 'Batch import, verification, status tracking, and approvals',
      zh: '批量导入、数据核验、状态跟踪与审批流程',
    },
    background: {
      en: 'Government enterprise data platform for cross-department enterprise verification and data-processing workflows.',
      zh: '面向跨部门企业数据核验与处理流程的政务企业数据平台。',
    },
    techStack: ['Vue 2', 'Element UI', 'Vuex', 'Vite', 'Excel Import'],
    contributions: {
      en: [
        'Implemented Excel batch import and enterprise information batch validation.',
        'Built data-status tracking and batch approval capabilities for cross-department workflows.',
      ],
      zh: [
        '实现 Excel 批量导入与企业信息批量校验能力。',
        '开发数据状态跟踪与批量审批功能，支撑跨部门企业数据核验流程。',
      ],
    },
  },
  {
    id: 9,
    title: {
      en: '928 Hospital Model Command System V2.0',
      zh: '928医院-模型化指挥系统V2.0',
    },
    period: '2025.03.31 — 2025.04.09',
    category: PROJECT_CATEGORIES.webApp,
    projectType: {
      en: 'Military Hospital Information System',
      zh: '军队医院信息化系统',
    },
    role: {
      en: 'Front-End Developer',
      zh: '前端开发',
    },
    module: {
      en: 'To-do items and task supervision',
      zh: '待办事项与任务督办',
    },
    background: {
      en: 'Hospital command platform upgrade focused on task execution and supervision workflows.',
      zh: '面向任务执行与督办流程的医院指挥平台升级项目。',
    },
    techStack: ['Vue 2', 'Element UI', 'Vuex', 'Vite'],
    contributions: {
      en: [
        'Built the to-do and task-supervision module.',
        'Implemented dual task views and a department tree selector.',
      ],
      zh: [
        '负责待办事项与任务督办模块开发。',
        '实现任务双视图模式与部门树选择组件。',
      ],
    },
  },
  {
    id: 8,
    title: {
      en: 'Risk Monitoring and Early Warning System Common Service Platform V1.0.1',
      zh: '风险监测预警体系共性服务平台系统V1.0.1',
    },
    period: '2025.03.10 — 2025.03.21',
    category: PROJECT_CATEGORIES.webApp,
    projectType: {
      en: 'Government Risk Warning Platform',
      zh: '政府风险预警平台',
    },
    role: {
      en: 'Front-End Developer',
      zh: '前端开发',
    },
    module: {
      en: 'Warning model management and configuration',
      zh: '预警模型管理与配置',
    },
    background: {
      en: 'Government risk-warning platform module for model configuration and multi-source warning linkage.',
      zh: '面向模型配置与多源预警联动的政府风险预警平台模块。',
    },
    techStack: ['Vue 2', 'Element UI', 'Vuex', 'Vite'],
    contributions: {
      en: [
        'Implemented three-state filtering for model management.',
        'Built model-type/entity-type linkage and automatic warning-name population.',
      ],
      zh: [
        '实现三态筛选能力。',
        '开发模型类型与实体类型联动，以及预警名称自动填充逻辑。',
      ],
    },
  },
  {
    id: 34,
    title: {
      en: 'Red Detachment of Women Memorial Park Digital Platform (V1.0 / V1.2.0)',
      zh: '红色娘子军纪念园数字化平台（V1.0 / V1.2.0）',
    },
    period: '2024.11.11 — 2025.03.06',
    category: PROJECT_CATEGORIES.webApp,
    projectType: {
      en: 'Cultural Tourism Digital Platform',
      zh: '文旅数字化平台',
    },
    role: {
      en: 'Front-End Developer',
      zh: '前端开发',
    },
    module: {
      en: 'Admin panel, youth-facing client, and reservation workflow iteration',
      zh: '管理后台、青少年端与预约流程迭代',
    },
    background: {
      en: 'Digital tourism platform spanning admin, youth-facing, and official-site experiences for study tours and visit services.',
      zh: '覆盖管理后台、青少年端与官网预约流程的文旅数字化平台。',
    },
    techStack: ['Vue 2', 'Element UI', 'Vuex', 'Vant', 'Vite'],
    contributions: {
      en: [
        'Iterated study-tour registration, visit services, and reservation workflows across multiple clients.',
        'Delivered secure document downloads and server-side Word template rendering.',
      ],
      zh: [
        '迭代研学报名、参观服务与预约流程，覆盖多个客户端。',
        '实现安全文档下载与 Word 模板服务端渲染。',
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
    projectType: {
      en: 'Enterprise Internal Management System',
      zh: '企业内部管理系统',
    },
    role: {
      en: 'Mobile Front-End Developer',
      zh: '移动端前端开发',
    },
    module: {
      en: 'Mobile approval center',
      zh: '移动端审批中心',
    },
    background: {
      en: 'Internal management platform covering multiple approval workflows and business-operation scenarios.',
      zh: '覆盖多种审批流程与经营场景的企业内部管理平台。',
    },
    techStack: ['Vue 2', 'Vue Router', 'Pinia', 'Vant'],
    contributions: {
      en: ['Built the mobile approval center for business-opportunity, overtime, contract, and related workflows.'],
      zh: ['负责移动端审批中心开发，支持商机、加班、合同等多种审批流程。'],
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
    projectType: {
      en: 'Education Information Platform',
      zh: '教育信息化平台',
    },
    role: {
      en: 'Front-End Developer',
      zh: '前端开发',
    },
    module: {
      en: 'PC work assignments and WeChat delegation verification',
      zh: 'PC 分工管理与公众号委托验证',
    },
    background: {
      en: 'Digital campus system covering PC-side assignment workflows and WeChat-side delegation verification.',
      zh: '覆盖 PC 端分工流程与公众号端委托验证流程的数字校园系统。',
    },
    techStack: ['Vue 2', 'Element UI', 'Vuex', 'uni-app', 'WeChat'],
    contributions: {
      en: [
        'Built the PC-side work-assignment module.',
        'Implemented QR-code verification and delegation workflows in the WeChat flow.',
      ],
      zh: [
        '负责 PC 端分工设置模块开发。',
        '实现公众号端扫码验证与委托验证流程。',
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
    projectType: {
      en: 'Enterprise Internal Management System',
      zh: '企业内部管理系统',
    },
    role: {
      en: 'Front-End Developer',
      zh: '前端开发',
    },
    module: {
      en: 'PC vehicle reports and mobile workbench',
      zh: 'PC 端车辆报表与移动端工作台',
    },
    background: {
      en: 'Internal enterprise management platform spanning PC and mobile workflows for vehicle management and approvals.',
      zh: '覆盖 PC 与移动端工作流的企业内部经营管理平台，聚焦车辆管理与审批能力。',
    },
    techStack: ['Vue 2', 'Element UI', 'Pinia', 'Vant', 'Vite'],
    contributions: {
      en: [
        'Developed the PC-side vehicle reports module.',
        'Built the mobile workbench, approval center, and vehicle-management modules.',
      ],
      zh: [
        '负责 PC 端车辆报表模块开发。',
        '负责移动端工作台、审批中心和用车管理模块开发。',
      ],
    },
  },
  {
    id: 1,
    title: {
      en: 'Haikou Police Administrative Knowledge Base',
      zh: '海口公安政务知识库',
    },
    period: '2024.07.25 — 2024.09.25',
    category: PROJECT_CATEGORIES.webApp,
    projectType: {
      en: 'Government AI Application',
      zh: '政府 AI 应用',
    },
    role: {
      en: 'Algorithm Engineer',
      zh: '算法工程师',
    },
    module: {
      en: 'Administrative data cleaning, RAG construction, and LLM evaluation',
      zh: '政务数据清洗、RAG 构建与大模型评测',
    },
    background: {
      en: 'Government knowledge-base project for the Haikou police system, combining administrative data processing with LLM-based question answering.',
      zh: '面向海口公安系统的政务知识库项目，结合政务数据处理与大模型问答能力。',
    },
    techStack: ['Python', 'RAG', 'Milvus', 'TeleChat', 'LLM Evaluation'],
    contributions: {
      en: [
        'Participated in administrative data cleaning and RAG-system construction.',
        'Analyzed responses to more than 20,000 real government queries to improve answer quality.',
      ],
      zh: [
        '参与政务数据清洗与 RAG 系统构建。',
        '分析 20000+ 条真实政务问题的模型回答，推动回答质量优化。',
      ],
    },
  },
]
