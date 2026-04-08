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
    expect(projects).toHaveLength(28)

    for (const project of projects) {
      expect(project.category).toBeDefined()
      expect(project.category?.en).toBeTruthy()
      expect(project.category?.zh).toBeTruthy()
    }
  })

  it('groups projects in the expected category order', () => {
    expect(PROJECT_CATEGORY_ORDER).toEqual([
      'AI Infrastructure and LLM Inference',
      'Embodied AI, Robotics, and Reinforcement Learning',
      'Systems Engineering, Model Optimization, and Developer Tooling',
      'Web, Government, and Industry Digitalization',
    ])

    const groups = getProjectGroups(projects)

    expect(groups.map((group) => group.category.en)).toEqual(
      PROJECT_CATEGORY_ORDER,
    )
    expect(groups.map((group) => group.projects)).toHaveLength(4)
    expect(groups.map((group) => group.projects.length)).toEqual([9, 4, 4, 11])
  })

  it('preserves the resume order inside each category', () => {
    const groups = getProjectGroups(projects)

    expect(groups[0]?.projects.map((project) => project.title.en)).toEqual([
      'vLLM-Kunlun (Baidu Kunlun Chip LLM Inference Framework)',
      'LitServe',
      'SGLang',
      'RLLM',
      'vLLM-Omni',
      'OpenRLHF',
      'Baidu AIAK-SGLang DeepSeek / GLM5 PD Deployment and Performance Debugging',
      'Transformers',
      'Haikou Police Administrative Knowledge Base',
    ])
    expect(groups[1]?.projects.map((project) => project.title.en)).toEqual([
      'HighwayEnv',
      'Genesis',
      'PyTorch RL',
      'ManiSkill',
    ])
    expect(groups[2]?.projects.map((project) => project.title.en)).toEqual([
      'PyTorch AO',
      'opcua-asyncio',
      'Docker Compose',
      'Everything Claude Code',
    ])
    expect(groups[3]?.projects.map((project) => project.title.en)).toEqual([
      'University Researcher Profile System',
      'Government-Enterprise Platform V3.1',
      'Haikou 12345 Intelligent Report System V1.0',
      '928 Hospital - Model Command System V2.0',
      'Risk Monitoring and Early Warning System Common Service Platform V1.0.1',
      'Red Detachment of Women Memorial Park Digital Platform V1.2.0',
      'Government-Enterprise Platform V2',
      'Project Platform Management System V2.6',
      'Digital Campus System V2.0.5',
      'Red Detachment of Women Memorial Park Digital Platform V1.0',
      'Project Operation Management Platform V2.5',
    ])
  })

  it('preserves optional metadata used by enriched project cards', () => {
    const vllmKunlun = projects.find(
      (project) =>
        project.title.en ===
        'vLLM-Kunlun (Baidu Kunlun Chip LLM Inference Framework)',
    )
    const aiak = projects.find(
      (project) =>
        project.title.en ===
        'Baidu AIAK-SGLang DeepSeek / GLM5 PD Deployment and Performance Debugging',
    )

    expect(vllmKunlun?.projectType?.en).toBe('Open-Source Contribution')
    expect(vllmKunlun?.githubStars).toBe('388')
    expect(aiak?.projectType?.zh).toBe('百度闭源 AI 推理系统项目')
    expect(aiak?.github).toBeUndefined()
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
      'Web, Government, and Industry Digitalization',
    )
    expect(getProjectCategoryBySlug('unknown')).toBeNull()

    expect(getProjectCategoryPath('systems-engineering')).toBe(
      '/projects/systems-engineering',
    )
    expect(getProjectGroupBySlug(projects, 'embodied-ai')?.projects.length).toBe(
      4,
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
