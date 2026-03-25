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
      en: 'AI Infrastructure & LLM',
      zh: 'AI 基础设施与大模型',
    },
    items: [
      { name: 'PyTorch', level: 'proficient' },
      { name: 'vLLM', level: 'proficient' },
      { name: 'vllm-bench', level: 'proficient' },
      { name: 'EvalScope', level: 'proficient' },
      { name: 'RAG', level: 'proficient' },
    ],
  },
  {
    category: {
      en: 'Programming Languages',
      zh: '编程语言',
    },
    items: [
      { name: 'Python', level: 'expert' },
      { name: 'Vue / JavaScript', level: 'expert' },
      { name: 'C++', level: 'basic' },
      { name: 'Java', level: 'basic' },
      { name: 'SQL', level: 'basic' },
      { name: 'Spring Boot', level: 'basic' },
    ],
  },
  {
    category: {
      en: 'Full-Stack Development',
      zh: '全栈开发',
    },
    items: [
      { name: 'Vue 2 / Vue 3', level: 'proficient' },
      { name: 'Element UI / Plus', level: 'proficient' },
      { name: 'Vant', level: 'proficient' },
      { name: 'ECharts', level: 'proficient' },
      { name: 'Spring Boot', level: 'basic' },
      { name: 'MySQL', level: 'proficient' },
      { name: 'Nginx', level: 'basic' },
      { name: 'Docker', level: 'basic' },
      { name: 'Linux', level: 'proficient' },
    ],
  },
  {
    category: {
      en: 'Tools',
      zh: '通用工具',
    },
    items: [
      { name: 'Git', level: 'proficient' },
      { name: 'LaTeX', level: 'proficient' },
      { name: 'VS Code', level: 'proficient' },
    ],
  },
]
