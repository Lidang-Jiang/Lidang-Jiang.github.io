import type { Project } from '@/types/project'

type ProjectCategory = NonNullable<Project['category']>

export interface ProjectGroup {
  category: ProjectCategory
  projects: Project[]
}

export interface ProjectCategoryNavItem {
  key: string
  slug: string
  category: ProjectCategory
}

export const PROJECTS_OVERVIEW_PATH = '/projects'

export const PROJECT_CATEGORIES = {
  aiInfra: {
    en: 'AI Infrastructure, Model Serving, and Training Optimization',
    zh: 'AI 基础设施、模型服务与训练优化',
  },
  embodiedAi: {
    en: 'Embodied AI, Robotics, and Reinforcement Learning',
    zh: '具身智能、机器人与强化学习',
  },
  systemsEngineering: {
    en: 'Systems Engineering, Developer Tooling, and Industrial Integration',
    zh: '系统工程、开发工具与工业集成',
  },
  webApp: {
    en: 'Web, Government, and Industry Digitalization',
    zh: 'Web、政务与行业数字化应用',
  },
} satisfies Record<string, ProjectCategory>

export const PROJECT_CATEGORY_NAV_ITEMS = [
  {
    key: 'aiInfra',
    slug: 'ai-infra',
    category: PROJECT_CATEGORIES.aiInfra,
  },
  {
    key: 'embodiedAi',
    slug: 'embodied-ai',
    category: PROJECT_CATEGORIES.embodiedAi,
  },
  {
    key: 'systemsEngineering',
    slug: 'systems-engineering',
    category: PROJECT_CATEGORIES.systemsEngineering,
  },
  {
    key: 'webApp',
    slug: 'web-development',
    category: PROJECT_CATEGORIES.webApp,
  },
] as const satisfies readonly ProjectCategoryNavItem[]

export type ProjectCategorySlug =
  (typeof PROJECT_CATEGORY_NAV_ITEMS)[number]['slug']

export const PROJECT_CATEGORY_ORDER = PROJECT_CATEGORY_NAV_ITEMS.map(
  (item) => item.category.en,
)

const PROJECT_CATEGORY_BY_SLUG = new Map<string, ProjectCategoryNavItem>(
  PROJECT_CATEGORY_NAV_ITEMS.map((item) => [item.slug, item]),
)

export function isProjectCategorySlug(
  value: string,
): value is ProjectCategorySlug {
  return PROJECT_CATEGORY_BY_SLUG.has(value)
}

export function getProjectCategoryBySlug(
  slug: string,
): ProjectCategoryNavItem | null {
  return PROJECT_CATEGORY_BY_SLUG.get(slug) ?? null
}

export function getProjectCategoryPath(slug: ProjectCategorySlug): string {
  return `${PROJECTS_OVERVIEW_PATH}/${slug}`
}

export function getProjectCategoryPaths(): string[] {
  return PROJECT_CATEGORY_NAV_ITEMS.map((item) =>
    getProjectCategoryPath(item.slug),
  )
}

export function getProjectStaticPaths(): string[] {
  return [PROJECTS_OVERVIEW_PATH, ...getProjectCategoryPaths()]
}

export function getProjectGroups(projects: Project[]): ProjectGroup[] {
  const groups = new Map<string, ProjectGroup>()

  for (const project of projects) {
    if (!project.category) {
      continue
    }

    const existingGroup = groups.get(project.category.en)

    if (existingGroup) {
      existingGroup.projects.push(project)
      continue
    }

    groups.set(project.category.en, {
      category: project.category,
      projects: [project],
    })
  }

  return PROJECT_CATEGORY_ORDER.flatMap((categoryEn) => {
    const group = groups.get(categoryEn)
    return group ? [group] : []
  })
}

export function getProjectGroupBySlug(
  projects: Project[],
  slug: string,
): ProjectGroup | null {
  const category = getProjectCategoryBySlug(slug)

  if (!category) {
    return null
  }

  return (
    getProjectGroups(projects).find(
      (group) => group.category.en === category.category.en,
    ) ?? null
  )
}
