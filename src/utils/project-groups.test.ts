import { describe, expect, it } from 'vitest'

import { projects } from '@/data/projects'
import {
  PROJECT_CATEGORY_ORDER,
  getProjectGroups,
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
})
