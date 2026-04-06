import { describe, expect, it } from 'vitest'

import { projects } from '@/data/projects'
import {
  PROJECT_CATEGORY_NAV_ITEMS,
  PROJECT_CATEGORY_ORDER,
  PROJECTS_OVERVIEW_PATH,
  getProjectCategoryBySlug,
  getProjectCategoryPath,
  getProjectGroupBySlug,
  getProjectGroups,
  getProjectStaticPaths,
  isProjectCategorySlug,
} from '@/utils/project-groups'

describe('project grouping', () => {
  it('keeps all projects categorized', () => {
    expect(projects).toHaveLength(24)

    for (const project of projects) {
      expect(project.category).toBeDefined()
      expect(project.category?.en).toBeTruthy()
      expect(project.category?.zh).toBeTruthy()
    }
  })

  it('groups projects in the expected category order', () => {
    expect(PROJECT_CATEGORY_ORDER).toEqual([
      'AI Infrastructure and LLM Inference',
      'Embodied AI and Robotics Simulation',
      'Systems Engineering and Developer Tooling',
      'Web Application Development',
    ])

    const groups = getProjectGroups(projects)

    expect(groups.map((group) => group.category.en)).toEqual(
      PROJECT_CATEGORY_ORDER,
    )
    expect(groups.map((group) => group.projects)).toHaveLength(4)
    expect(groups.map((group) => group.projects.length)).toEqual([7, 3, 3, 11])
  })

  it('preserves the resume order inside each category', () => {
    const groups = getProjectGroups(projects)

    expect(groups[0]?.projects.map((project) => project.id)).toEqual([
      13, 14, 15, 16, 17, 18, 1,
    ])
    expect(groups[1]?.projects.map((project) => project.id)).toEqual([
      19, 20, 21,
    ])
    expect(groups[2]?.projects.map((project) => project.id)).toEqual([
      22, 23, 24,
    ])
    expect(groups[3]?.projects.map((project) => project.id)).toEqual([
      12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2,
    ])
  })

  it('defines stable category navigation metadata', () => {
    expect(PROJECT_CATEGORY_NAV_ITEMS.map((item) => item.slug)).toEqual([
      'ai-infra',
      'embodied-ai',
      'systems-engineering',
      'web-development',
    ])

    expect(PROJECT_CATEGORY_NAV_ITEMS.map((item) => item.category.en)).toEqual(
      PROJECT_CATEGORY_ORDER,
    )
  })

  it('resolves category slugs and filters groups from them', () => {
    expect(isProjectCategorySlug('ai-infra')).toBe(true)
    expect(isProjectCategorySlug('unknown')).toBe(false)

    expect(getProjectCategoryBySlug('web-development')?.category.en).toBe(
      'Web Application Development',
    )
    expect(getProjectCategoryBySlug('unknown')).toBeNull()

    expect(getProjectCategoryPath('systems-engineering')).toBe(
      '/projects/systems-engineering',
    )
    expect(getProjectGroupBySlug(projects, 'embodied-ai')?.projects.length).toBe(
      3,
    )
    expect(getProjectGroupBySlug(projects, 'unknown')).toBeNull()
  })

  it('exposes the expected static project paths for ssg', () => {
    expect(getProjectStaticPaths()).toEqual([
      PROJECTS_OVERVIEW_PATH,
      '/projects/ai-infra',
      '/projects/embodied-ai',
      '/projects/systems-engineering',
      '/projects/web-development',
    ])
  })
})
