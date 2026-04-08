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
      en: 'Hainan Xinzhujiang HR Development Co., Ltd.',
      zh: '海南新珠江人力资源开发管理有限公司',
    },
    period: '2024.07 - 2025.06',
    description: {
      en: 'LLM Algorithm Engineer (2024.07 - 2024.09), Front-end Development Engineer (2024.09 - 2025.06)',
      zh: '大语言模型算法工程师（2024.07 - 2024.09），前端开发工程师（2024.09 - 2025.06）',
    },
  },
  {
    company: {
      en: 'Wenjia Education, etc.',
      zh: '文加教育等',
    },
    position: {
      en: 'Graduate Entrance Exam Tutor',
      zh: '研究生入学考试科目辅导教师',
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
      zh: '数学教师',
    },
    period: '2021.05 - 2021.12',
  },
  {
    company: {
      en: 'Self-study Period',
      zh: '待业、在家备考',
    },
    position: {
      en: 'Graduate Entrance Exam Preparation',
      zh: '研究生入学考试备考',
    },
    period: '2019.09 - 2021.05',
  },
  {
    company: {
      en: 'Various Companies',
      zh: '多家公司',
    },
    position: {
      en: 'Real Estate Consultant / Environmental Engineer / Hotel Receptionist / Game Booster',
      zh: '房地产顾问 / 环境工程师 / 酒店前台 / 代练',
    },
    period: '2018.07 - 2019.09',
  },
]
