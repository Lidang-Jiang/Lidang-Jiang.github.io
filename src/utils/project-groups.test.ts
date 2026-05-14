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
    expect(projects).toHaveLength(34)

    for (const project of projects) {
      expect(project.category).toBeDefined()
      expect(project.category?.en).toBeTruthy()
      expect(project.category?.zh).toBeTruthy()
    }
  })

  it('groups projects in the expected category order', () => {
    expect(PROJECT_CATEGORY_ORDER).toEqual([
      'AI Infrastructure, Model Serving, and Training Optimization',
      'Embodied AI, Robotics, and Reinforcement Learning',
      'Systems Engineering, Developer Tooling, and Industrial Integration',
      'Web, Government, and Industry Digitalization',
    ])

    const groups = getProjectGroups(projects)

    expect(groups.map((group) => group.category.en)).toEqual(
      PROJECT_CATEGORY_ORDER,
    )
    expect(groups.map((group) => group.projects)).toHaveLength(4)
    expect(groups.map((group) => group.projects.length)).toEqual([14, 6, 4, 10])
  })

  it('preserves the resume order inside each category', () => {
    const groups = getProjectGroups(projects)

    expect(groups[0]?.projects.map((project) => project.title.en)).toEqual([
      'vLLM-Kunlun (Baidu Kunlun Chip Inference Framework)',
      'vLLM',
      'OpenClaw',
      'ExecuTorch',
      'LitServe',
      'Olive',
      'anomalib',
      'PyTorch AO',
      'SGLang',
      'RLLM',
      'vLLM-Omni',
      'OpenRLHF',
      'Baidu AIAK-SGLang DeepSeek / GLM5 PD Deployment',
      'Transformers',
    ])
    expect(groups[1]?.projects.map((project) => project.title.en)).toEqual([
      'Launch ROS',
      'Gymnasium',
      'HighwayEnv',
      'Genesis',
      'PyTorch RL',
      'ManiSkill',
    ])
    expect(groups[2]?.projects.map((project) => project.title.en)).toEqual([
      'crawlee-python',
      'opcua-asyncio',
      'Docker Compose',
      'Everything Claude Code',
    ])
    expect(groups[3]?.projects.map((project) => project.title.en)).toEqual([
      'University Researcher Profile System',
      'Haikou 12345 Intelligent Report System V1.0',
      'Government-Enterprise Platform (V2 / V3.1)',
      '928 Hospital Model Command System V2.0',
      'Risk Monitoring and Early Warning System Common Service Platform V1.0.1',
      'Red Detachment of Women Memorial Park Digital Platform (V1.0 / V1.2.0)',
      'Project Platform Management System V2.6',
      'Digital Campus System V2.0.5',
      'Project Operation Management Platform V2.5',
      'Haikou Police Administrative Knowledge Base',
    ])
  })

  it('preserves optional metadata used by enriched project cards', () => {
    const vllmKunlun = projects.find(
      (project) =>
        project.title.en ===
        'vLLM-Kunlun (Baidu Kunlun Chip Inference Framework)',
    )
    const aiak = projects.find(
      (project) =>
        project.title.en ===
        'Baidu AIAK-SGLang DeepSeek / GLM5 PD Deployment',
    )

    expect(vllmKunlun?.projectType?.en).toBe(
      'Open-Source Contribution + Product Delivery',
    )
    expect(vllmKunlun?.githubStars).toBe('412')
    expect(vllmKunlun?.contributions.en).toContain(
      'Landed 9 merged PRs spanning InternVL KeyError fixes, installation docs, collect_env.py diagnostics, 0.15.1 release alignment, Read the Docs cleanup, Docker documentation, and XProfiler benchmark docs.',
    )
    expect(aiak?.projectType?.zh).toBe('百度闭源 AI 推理系统')
    expect(aiak?.github).toBeUndefined()
  })

  it('keeps open-source contribution pull requests linked', () => {
    const expectedPullRequests = new Map<string, number[]>([
      [
        'vLLM-Kunlun (Baidu Kunlun Chip Inference Framework)',
        [108, 136, 218, 249, 251, 253, 327, 328, 341],
      ],
      ['vLLM', [38099]],
      ['OpenClaw', [66285]],
      ['ExecuTorch', [18701, 18703, 18700]],
      ['LitServe', [674, 673]],
      ['Olive', [2380]],
      ['anomalib', [3512, 3509, 3508]],
      ['PyTorch AO', [4242]],
      ['SGLang', [21400, 21399]],
      ['RLLM', [480]],
      ['vLLM-Omni', [1687, 1636, 2221, 2228]],
      ['OpenRLHF', [1212]],
      ['Transformers', [45045]],
      ['Launch ROS', [538]],
      ['Gymnasium', [1553]],
      ['HighwayEnv', [668]],
      ['Genesis', [2609, 2610, 2612, 2613, 2614, 2653]],
      ['PyTorch RL', [3593]],
      ['ManiSkill', [1402, 1403]],
      ['crawlee-python', [1835]],
      ['opcua-asyncio', [1954, 1955, 1956, 1957]],
      ['Docker Compose', [13684]],
      ['Everything Claude Code', [971, 972, 974, 977, 992]],
    ])

    for (const [title, numbers] of expectedPullRequests) {
      const project = projects.find((item) => item.title.en === title)

      expect(project?.pullRequests?.map((pullRequest) => pullRequest.number)).toEqual(
        numbers,
      )
      expect(project?.pullRequests?.map((pullRequest) => pullRequest.url)).toEqual(
        numbers.map((number) => `${project?.github}/pull/${number}`),
      )
    }
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
    expect(getProjectGroupBySlug(projects, 'embodied-ai')?.projects.length).toBe(6)
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
