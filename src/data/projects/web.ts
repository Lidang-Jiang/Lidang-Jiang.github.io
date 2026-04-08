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
      en: 'Open-Source Full-Stack Web App',
      zh: '开源全栈 Web 应用',
    },
    role: {
      en: 'Full-Stack Developer',
      zh: '全栈开发',
    },
    module: {
      en: 'Independently built client/admin front-end systems and backend RESTful APIs',
      zh: '独立完成前后台前端系统与后端 RESTful 接口',
    },
    background: {
      en: 'Personal portal system for university researchers, integrating academic achievements display, project management and news updates, supporting multilingual internationalization. The GitHub project has been deployed to a real research-team website.',
      zh: '面向高校研究人员的个人门户系统，集成学术成果展示、项目管理与新闻动态，支持多语言国际化。GitHub 开源项目，已在实际科研团队网站部署应用。',
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
        'Built the complete client and admin front-end systems, including seamless Chinese and English switching with Vue I18n.',
        'Designed and implemented backend RESTful APIs for the News and Project modules.',
      ],
      zh: [
        '完成前后台完整前端开发，并基于 Vue I18n 实现中英文无缝切换。',
        '设计并实现 News 与 Project 模块的后端 RESTful API。',
      ],
    },
    achievements: {
      en: 'Deployed on a real research-team website and open-sourced on GitHub.',
      zh: '已部署到实际科研团队官网，并在 GitHub 开源。',
    },
    github: 'https://github.com/Lidang-Jiang/UniversityResearcherProfiles',
    githubStars: '0',
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
    projectType: {
      en: 'Government Data Management Platform',
      zh: '政务数据管理平台',
    },
    role: {
      en: 'Front-End Developer',
      zh: '前端开发',
    },
    module: {
      en: 'Data status tracking and batch approval features',
      zh: '数据状态跟踪与批量审批功能',
    },
    background: {
      en: 'Added data status tracking, batch approval and other features to solve cross-department data coordination challenges.',
      zh: '新增数据状态跟踪、批量审批等能力，解决跨部门数据协同难题。',
    },
    techStack: ['Vue 2', 'Element UI', 'Vuex', 'Vite'],
    contributions: {
      en: [
        'Implemented batch approval workflows.',
        'Built a data status tracking list for operational visibility.',
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
    projectType: {
      en: 'Government Hotline Automation System',
      zh: '政务热线自动化系统',
    },
    role: {
      en: 'Front-End Developer',
      zh: '前端开发',
    },
    module: {
      en: 'Intelligent report editor and template management module',
      zh: '智能报告编辑器与模板管理模块',
    },
    background: {
      en: 'Government hotline report automation system, enabling intelligent generation of structured reports from work-order data and solving the low efficiency and inconsistent formatting of manual report preparation.',
      zh: '政务热线报告自动化系统，实现从工单数据到结构化报告的智能生成，解决人工编制报告效率低和格式不统一的问题。',
    },
    techStack: ['Vue 2', 'Element UI', 'Quill', 'Vuex', 'Vite'],
    contributions: {
      en: [
        'Built the intelligent template management system.',
        'Developed the interactive report template editor, including extensible table components and a DeepSeek instruction dialog.',
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
    projectType: {
      en: 'Military Hospital Information System',
      zh: '军队医院信息系统',
    },
    role: {
      en: 'Front-End Developer',
      zh: '前端开发',
    },
    module: {
      en: 'To-do items and task supervision module',
      zh: '待办事项与任务督办模块',
    },
    background: {
      en: 'Added a to-do module to establish a closed-loop task supervision mechanism, addressing the V1.0 issues of fragmented task management, cross-department collaboration difficulties, and progress-tracking blind spots.',
      zh: '新增待办事项模块，建立任务督办闭环机制，解决 V1.0 中任务分散管理、跨部门协作困难和进度追踪盲区等问题。',
    },
    techStack: ['Vue 2', 'Element UI', 'Vuex', 'Vite'],
    contributions: {
      en: [
        'Implemented a dual-view task mode.',
        'Developed a department tree selection component.',
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
    projectType: {
      en: 'Government Risk Warning Platform',
      zh: '政府风险预警平台',
    },
    role: {
      en: 'Front-End Developer',
      zh: '前端开发',
    },
    module: {
      en: 'Warning model management and configuration module',
      zh: '预警模型管理与配置模块',
    },
    background: {
      en: 'Restructured core modules of a government-level risk warning platform, establishing a warning-linkage mechanism and improving multi-source data adaptability.',
      zh: '重构政府级风险预警平台核心模块，建立预警联动机制，提升多源数据适配能力。',
    },
    techStack: ['Vue 2', 'Element UI', 'Vuex', 'Vite'],
    contributions: {
      en: [
        'Implemented a three-state filtering mechanism.',
        'Built model-type and entity-type linkage components that auto-populate warning names from tree-structured data.',
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
    projectType: {
      en: 'Cultural Tourism Digital Platform',
      zh: '文旅数字化平台',
    },
    role: {
      en: 'Front-End Developer',
      zh: '前端开发',
    },
    module: {
      en: 'Official site / Youth version / Admin panel tri-terminal collaboration',
      zh: '官网 / 青少年版 / 管理后台三端协同',
    },
    background: {
      en: 'Upgraded the V1.0 experience by redesigning the visit-service flow and enabling data interoperability across three clients.',
      zh: '基于 V1.0 进行体验升级，重构参观服务流程，实现三端数据互通。',
    },
    techStack: ['Vue 2', 'Element UI', 'Vuex', 'Vite'],
    contributions: {
      en: [
        'Designed and implemented a unified reservation service system across three clients.',
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
    projectType: {
      en: 'Government Enterprise Verification Platform',
      zh: '政务企业核验平台',
    },
    role: {
      en: 'Front-End Developer',
      zh: '前端开发',
    },
    module: {
      en: 'Enterprise data batch validation feature',
      zh: '企业数据批量校验功能',
    },
    background: {
      en: 'Government enterprise data verification platform integrating the national market entity API to support batch validation of company names and unified credit codes.',
      zh: '政务企业数据核验平台，通过对接国家市场主体 API 实现企业名称与统一信用代码的批量核验。',
    },
    techStack: ['Vue 2', 'Element UI', 'Axios', 'Vite', 'ESLint', 'Prettier'],
    contributions: {
      en: [
        'Implemented batch import for Excel files.',
        'Built a real-time validation progress display component.',
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
    projectType: {
      en: 'Enterprise Internal Management System',
      zh: '企业内部管理系统',
    },
    role: {
      en: 'Mobile Front-End Developer',
      zh: '移动端前端开发',
    },
    module: {
      en: 'Approval Center module',
      zh: '审批中心模块',
    },
    background: {
      en: 'Internal project management platform covering multiple approval workflows and management functions. Version 2.6 added a business-opportunity approval flow to improve deal governance.',
      zh: '公司内部项目管理平台，覆盖多个审批流程与管理功能，V2.6 新增商机审批功能以提升商机管理效率。',
    },
    techStack: ['Vue 2', 'Vue Router', 'Pinia', 'Vant', 'ESLint', 'Prettier'],
    contributions: {
      en: [
        'Built the mobile Approval Center for reviewing business-opportunity approvals, overtime approvals, contract approvals, and other workflow tasks.',
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
    projectType: {
      en: 'Education Information Platform',
      zh: '教育信息化平台',
    },
    role: {
      en: 'Front-End Developer',
      zh: '前端开发',
    },
    module: {
      en: 'PC work assignment management + WeChat delegation verification',
      zh: 'PC 端分工管理 + 公众号端委托验证',
    },
    background: {
      en: 'Comprehensive digital campus system covering both PC and WeChat public-account flows for class-duty management and student pickup delegation verification.',
      zh: '面向学校的综合数字校园系统，覆盖 PC 端和公众号端流程，实现班级分工管理与学生接送委托验证。',
    },
    techStack: [
      'Vue 2',
      'Vue Router',
      'Vuex',
      'Element UI',
      'uni-app',
      'ESLint',
      'Prettier',
    ],
    contributions: {
      en: [
        'Built the PC-side work assignment settings module.',
        'Implemented QR-code verification and delegation-verification forms for the WeChat public-account flow.',
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
    projectType: {
      en: 'Cultural Tourism Digital Platform',
      zh: '文旅数字化平台',
    },
    role: {
      en: 'Front-End Developer',
      zh: '前端开发',
    },
    module: {
      en: 'Admin panel and Youth PC client',
      zh: '管理后台 + 青少年 PC 端',
    },
    background: {
      en: 'Digital platform for the Red Detachment of Women Memorial Park, including an admin panel, standard PC client, and youth PC client for visit services, study-tour management, and transportation guides.',
      zh: '红色娘子军纪念园数字化平台，包含管理后台、标准 PC 端和青少年 PC 端，提供参观服务、研学活动管理和交通指南等能力。',
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
    projectType: {
      en: 'Enterprise Internal Management System',
      zh: '企业内部管理系统',
    },
    role: {
      en: 'Front-End Developer',
      zh: '前端开发',
    },
    module: {
      en: 'PC vehicle reports + mobile workbench and approvals',
      zh: 'PC 端车辆报表 + 移动端工作台与审批',
    },
    background: {
      en: 'Internal enterprise vehicle management system spanning both PC and mobile platforms. It supported vehicle usage management and reporting, including permission control, data filtering, and export capabilities.',
      zh: '企业内部车辆管理系统，覆盖 PC 端和移动端，用于车辆使用管理、数据筛选导出和审批流程处理。',
    },
    techStack: [
      'Vite',
      'Vue 2',
      'Vue Router',
      'Pinia',
      'Element UI',
      'Husky',
      'ESLint',
      'Stylelint',
      'Prettier',
      'Vant',
    ],
    contributions: {
      en: [
        'Developed the PC-side vehicle reports module.',
        'Built the mobile Workbench, Approval Center, and Vehicle Management modules.',
      ],
      zh: [
        '负责 PC 端车辆报表模块开发。',
        '负责移动端工作台、审批中心和用车管理模块开发。',
      ],
    },
  },
]
