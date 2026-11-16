import { profile } from '@/data/profile'
import { getProjectCategoryBySlug } from './project-groups'

export const SITE_ORIGIN = 'https://lidang-jiang.pages.dev'
type Language = 'en' | 'zh'

interface PageCopy {
  title: string
  description: string
}

const pages: Record<string, Record<Language, PageCopy>> = {
  '/': {
    en: {
      title: 'Lidang Jiang | MLsys, Embodied AI and Embedded Engineering',
      description: 'Lidang Jiang works on ML systems, embodied intelligence, robotics and embedded engineering. Explore his projects, open-source contributions, resume and research publications.',
    },
    zh: {
      title: '江李当 | MLsys、具身智能与嵌入式工程',
      description: '江李当的个人网站，介绍机器学习系统（MLsys）、具身智能、机器人及嵌入式软硬件方面的工程经历、开源贡献、项目成果、个人简历与研究论文。',
    },
  },
  '/cv': {
    en: {
      title: 'Resume | Lidang Jiang',
      description: 'Explore Lidang Jiang’s professional experience, education, technical skills, engineering projects, open-source contributions and research. Download his English or Chinese resume.',
    },
    zh: {
      title: '个人简历 | 江李当',
      description: '江李当的个人简历，涵盖工作经历、教育背景、机器学习系统与嵌入式工程技能、项目交付、开源贡献和科研成果，并提供中英文简历下载。',
    },
  },
  '/publications': {
    en: {
      title: 'Research Publications | Lidang Jiang',
      description: 'Read Lidang Jiang’s research publications in machine learning, battery health prediction and energy systems, with publication details, citations and links to the original papers.',
    },
    zh: {
      title: '研究论文 | 江李当',
      description: '江李当的研究论文与科研成果，涉及机器学习、电池健康状态预测和能源系统，提供论文信息、引用数据、期刊指标与原文链接，方便查阅研究内容。',
    },
  },
  '/projects': {
    en: {
      title: 'Engineering Projects | Lidang Jiang',
      description: 'Browse Lidang Jiang’s engineering project timeline, including model inference, robotics, embedded systems, developer tools and web applications, with contributions and delivery details.',
    },
    zh: {
      title: '工程项目 | 江李当',
      description: '按时间浏览江李当的工程项目，涵盖模型推理、机器人、嵌入式系统、开发工具和 Web 应用，查看各项目的背景、技术方案、个人贡献与交付成果。',
    },
  },
  '/projects/categories': {
    en: {
      title: 'Project Categories | Lidang Jiang',
      description: 'Discover Lidang Jiang’s projects by category: AI infrastructure, embodied intelligence, systems engineering and web development. Follow each category to its detailed project timeline.',
    },
    zh: {
      title: '项目分类 | 江李当',
      description: '按分类查阅江李当的项目：AI 基础设施、具身智能、系统工程与 Web 开发。各分类提供对应的项目时间线，便于了解技术方向、实际贡献和工程成果。',
    },
  },
}

export function getSiteSeo(path: string, preferredLanguage: Language = 'en') {
  const normalizedPath = path.replace(/\/+$/, '') || '/'
  const home = normalizedPath === '/' || normalizedPath === '/zh'
  const language = home ? (normalizedPath === '/zh' ? 'zh' : 'en') : preferredLanguage
  const category = normalizedPath.startsWith('/projects/')
    ? getProjectCategoryBySlug(normalizedPath.slice('/projects/'.length))
    : null
  const page = pages[home ? '/' : normalizedPath]?.[language]
  const categoryName = category?.category[language]
  const copy = page ?? (categoryName ? {
    title: `${categoryName} | ${profile.name[language]}`,
    description: language === 'zh'
      ? `查看江李当在${categoryName}方向的项目时间线，了解项目背景、使用技术、个人贡献、工程交付和开源成果，以及相关项目资料与链接。`
      : `Explore Lidang Jiang’s ${categoryName.toLowerCase()} projects, including technical background, individual contributions, engineering results and links to related work.`,
  } : {
    title: language === 'zh' ? '页面未找到 | 江李当' : 'Page Not Found | Lidang Jiang',
    description: language === 'zh' ? '请求的页面不存在，请返回首页浏览个人介绍与项目。' : 'The requested page could not be found. Return home to explore the site.',
  })

  return {
    ...copy,
    canonical: `${SITE_ORIGIN}${normalizedPath}`,
    lang: language === 'zh' ? 'zh-CN' : 'en',
    robots: page || category ? 'index, follow' : 'noindex, follow',
    alternates: home ? [
      { hreflang: 'en', href: `${SITE_ORIGIN}/` },
      { hreflang: 'zh-CN', href: `${SITE_ORIGIN}/zh` },
      { hreflang: 'x-default', href: `${SITE_ORIGIN}/` },
    ] : [],
  }
}
