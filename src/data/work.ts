export interface WorkExperience {
  company: {
    en: string
    zh: string
  }
  position?: {
    en: string
    zh: string
  }
  period: string
  description?: {
    en: string
    zh: string
  }
}

export const workExperiences: WorkExperience[] = [
  {
    company: {
      en: 'Shanghai MicroPort Software Co., Ltd. Shenzhen Branch',
      zh: '上海微创软件股份有限公司深圳分公司',
    },
    position: {
      en: 'Python Backend Developer',
      zh: 'AI计算-Python后端开发工程师',
    },
    period: '2025.08 - Present',
  },
  {
    company: {
      en: 'Hainan Xin Zhujiang Human Resources Development & Management Co., Ltd.',
      zh: '海南新珠江人力资源开发管理有限公司',
    },
    period: '2024.07 - 2025.06',
    description: {
      en: 'Large Language Model Algorithm Engineer (2024.07 - 2024.09), Front-end Development Engineer (2024.09 - 2025.06)',
      zh: '大模型算法工程师（2024.07 - 2024.09），前端开发工程师（2024.09 - 2025.06）',
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
    period: '2021.05 - 2021.12',
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
    period: '2021.05 - 2021.12',
  },
  {
    company: {
      en: 'Others (e.g., Unemployed, Preparing for Exams at Home, etc.)',
      zh: '其他（如待业、在家备考等）',
    },
    period: '2019.09 - 2021.05',
  },
  {
    company: {
      en: 'Real Estate Consultant / Environmental Engineer / Hotel Receptionist / Game Booster',
      zh: '链家置业顾问（2018.08荣获大区"实勘王"），环保工程师，宾馆前台，游戏代练',
    },
    period: '2018.07 - 2019.09',
  },
]
