export interface SkillCategory {
  category: {
    en: string
    zh: string
  }
  items: {
    name: string
    level?: 'expert' | 'proficient' | 'basic'
  }[]
}

export const skills: SkillCategory[] = [
  {
    category: {
      en: 'MLsys / AI Infrastructure',
      zh: 'MLsys / AI Infra',
    },
    items: [
      { name: 'Python' },
      { name: 'PyTorch' },
      { name: 'vLLM / vLLM-Kunlun' },
      { name: 'CUDA' },
      { name: 'Inference Debugging' },
      { name: 'Environment Diagnostics' },
    ],
  },
  {
    category: {
      en: 'Languages',
      zh: '编程语言',
    },
    items: [
      { name: 'Python' },
      { name: 'C++' },
      { name: 'Go' },
      { name: 'TypeScript' },
    ],
  },
  {
    category: {
      en: 'Infrastructure & Engineering',
      zh: '基础设施与工程化',
    },
    items: [
      { name: 'Kubernetes' },
      { name: 'Docker' },
      { name: 'Linux' },
      { name: 'Git' },
    ],
  },
  {
    category: {
      en: 'Supplementary Web Engineering',
      zh: 'Web 工程补充',
    },
    items: [
      { name: 'Vue' },
      { name: 'JavaScript' },
      { name: 'Spring Boot' },
      { name: 'MySQL' },
      { name: 'Nginx' },
      { name: 'Element-UI' },
      { name: 'Vant' },
    ],
  },
]
