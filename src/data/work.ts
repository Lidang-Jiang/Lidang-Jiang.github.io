export interface WorkExperience {
  company: {
    en: string
    zh: string
  }
  position?: {
    en: string
    zh: string
  }
  period: {
    en: string
    zh: string
  }
  description?: {
    en: string
    zh: string
  }
}

export const workExperiences: WorkExperience[] = [
  {
    company: {
      en: 'ManpowerGroup Enterprise Management Consulting (Shanghai) Co., Ltd.',
      zh: '万宝盛华企业管理咨询（上海）有限公司',
    },
    position: {
      en: 'Software Development Engineer (Embedded Systems)',
      zh: '软件开发工程师（嵌入式方向）',
    },
    period: {
      en: '2026.07 - Present',
      zh: '2026.07 - 至今',
    },
    description: {
      en: 'Department: OpenHarmony Enablement Department (Device BG); base: Bantian, Shenzhen; compensation: (CNY 16,500 + 3,000 + 1,500 overtime pay) per month | 14–16 monthly salaries',
      zh: '部门：OpenHarmony使能部（终端BG）；工作地点：深圳坂田；薪资：（16,500 + 3,000 + 1,500（加班工资））元/月 | （14–16）薪',
    },
  },
  {
    company: {
      en: 'Shanghai MicroPort Software Co., Ltd. Shenzhen Branch',
      zh: '上海微创软件股份有限公司深圳分公司',
    },
    position: {
      en: 'Python Backend Developer (AI Inference Framework)',
      zh: 'AI计算-Python后端开发工程师（AI推理框架）',
    },
    period: {
      en: '2025.08 - 2026.07',
      zh: '2025.08 - 2026.07',
    },
    description: {
      en: 'Compensation: CNY 16,500/month | 12 monthly salaries | first 3 months paid at 80%',
      zh: '薪资：16,500 元/月 | 12 薪 | 前 3 个月按 80% 发放',
    },
  },
  {
    company: {
      en: 'Hainan Xin Zhujiang Human Resources Development & Management Co., Ltd.',
      zh: '海南新珠江人力资源开发管理有限公司',
    },
    period: {
      en: '2024.07 - 2025.06',
      zh: '2024.07 - 2025.06',
    },
    description: {
      en: 'Large Language Model Algorithm Engineer (2024.07 - 2024.09), Front-end Development Engineer (2024.09 - 2025.06); compensation: CNY 8,000/month | 12 monthly salaries | first 2 months paid at 80%',
      zh: '大模型算法工程师（2024.07 - 2024.09），前端开发工程师（2024.09 - 2025.06）；薪资：8,000 元/月 | 12 薪 | 前 2 个月按 80% 发放',
    },
  },
  {
    company: {
      en: 'Wenjia Education, etc.',
      zh: '文加教育等',
    },
    position: {
      en: 'Graduate Entrance Exam Subject Tutor',
      zh: '考研专业课辅导（线上直播一对一）',
    },
    period: {
      en: '2021.05 - 2021.12',
      zh: '2021.05 - 2021.12',
    },
  },
  {
    company: {
      en: 'Guangzhou Lizhi Education Technology Co., Ltd., Yousi Tutoring, etc.',
      zh: '广州栗志教育科技有限公司，优思家教等',
    },
    position: {
      en: 'Math Teacher',
      zh: '数学老师（家教一对一，上门补习。）',
    },
    period: {
      en: '2021.05 - 2021.12',
      zh: '2021.05 - 2021.12',
    },
  },
  {
    company: {
      en: 'Others (e.g., Unemployed, Preparing for Exams at Home, etc.)',
      zh: '其他（如待业、在家备考等）',
    },
    period: {
      en: '2019.09 - 2021.05',
      zh: '2019.09 - 2021.05',
    },
  },
  {
    company: {
      en: 'Real Estate Consultant / Environmental Engineer / Hotel Receptionist / Game Booster',
      zh: '链家置业顾问（2018.08荣获大区"实勘王"），环保工程师，宾馆前台，游戏代练',
    },
    period: {
      en: '2018.07 - 2019.09',
      zh: '2018.07 - 2019.09',
    },
  },
]
