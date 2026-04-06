import type { Project } from '@/types/project'

type ProjectCategory = NonNullable<Project['category']>

export interface ProjectGroup {
  category: ProjectCategory
  projects: Project[]
}

export const PROJECT_CATEGORIES = {
  aiInfra: {
    en: 'AI Infrastructure and LLM Inference',
    zh: 'AI 基础设施与大模型推理',
  },
  embodiedAi: {
    en: 'Embodied AI and Robotics Simulation',
    zh: '具身智能与机器人仿真',
  },
  systemsEngineering: {
    en: 'Systems Engineering and Developer Tooling',
    zh: '系统工程与开发工具',
  },
  webApp: {
    en: 'Web Application Development',
    zh: 'Web 应用开发',
  },
} satisfies Record<string, ProjectCategory>

export const PROJECT_CATEGORY_ORDER = [
  PROJECT_CATEGORIES.aiInfra.en,
  PROJECT_CATEGORIES.embodiedAi.en,
  PROJECT_CATEGORIES.systemsEngineering.en,
  PROJECT_CATEGORIES.webApp.en,
]

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
