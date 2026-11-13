import { describe, expect, it } from 'vitest'

import { projects } from '@/data/projects'
import type { Project } from '@/types/project'
import {
  formatProjectPeriod,
  getProjectTimeline,
  parseProjectPeriod,
} from '@/utils/project-timeline'

function project(id: number, period: string): Project {
  return {
    id,
    period,
    title: { en: `Project ${id}`, zh: `项目 ${id}` },
    background: { en: 'Description', zh: '简介' },
    contributions: { en: [], zh: [] },
    techStack: [],
  }
}

describe('项目日期解析', () => {
  it('将单日作为相同的开始和结束日期', () => {
    expect(parseProjectPeriod('2026.04.05')).toMatchObject({
      start: { value: 20260405, precision: 'day' },
      end: { value: 20260405, precision: 'day' },
      ongoing: false,
    })
  })

  it.each([
    ['2025.08.18 — 2026.07.06', 20250818, 20260706],
    [' 2025.8.18–2026.7.6 ', 20250818, 20260706],
    ['2025.08.18 - 2026.07.06', 20250818, 20260706],
    ['2026.08 — 2026.10', 20260801, 20261031],
    ['2024.02', 20240201, 20240229],
    ['2025.02', 20250201, 20250228],
    ['2000.02', 20000201, 20000229],
    ['1900.02', 19000201, 19000228],
    ['2026.04.02 — 2026.04', 20260402, 20260430],
  ])('正确解析 %s', (period, start, end) => {
    const parsed = parseProjectPeriod(period)

    expect(parsed?.start.value).toBe(start)
    expect(parsed?.end?.value).toBe(end)
    expect(parsed?.ongoing).toBe(false)
  })

  it('保留月份精度，并明确表示进行中而不依赖今天', () => {
    expect(parseProjectPeriod('2026.10 — Present')).toMatchObject({
      start: { year: 2026, month: 10, day: 1, precision: 'month' },
      end: null,
      ongoing: true,
    })
  })

  it.each([
    '',
    'Present',
    '2026',
    '2026.00',
    '2026.13',
    '0000.01',
    '2025.02.29',
    '2026.04.31',
    '2026.04.00',
    '2026.07.02 — 2026.07.01',
    '2026.08 — 2026.07',
    '2026.04 —',
    '2026.04 — sometime',
    '2026.04 — 2026.05 — 2026.06',
    'prefix 2026.04.05',
  ])('将非法日期 %s 标记为未知', (period) => {
    expect(parseProjectPeriod(period)).toBeNull()
  })

  it('仅本地化 Present，保留原有日期精度', () => {
    expect(formatProjectPeriod('2026.10 — Present', '至今')).toBe('2026.10 — 至今')
    expect(formatProjectPeriod('2026.10 — Present', 'Present')).toBe('2026.10 — Present')
    expect(formatProjectPeriod('2024.02', '至今')).toBe('2024.02')
    expect(formatProjectPeriod('2026.04.05', '至今')).toBe('2026.04.05')
  })
})

describe('项目时间线', () => {
  it('按结束日期、开始日期倒序排列，同日期保持原顺序', () => {
    const source = [
      project(1, '2026.01.01 — 2026.07.06'),
      project(2, '2026.02.01 — 2026.07.06'),
      project(3, '2025.01.01 — 2026.10'),
      project(4, '2026.02.01 — 2026.07.06'),
      project(5, '2026.07.05'),
    ]

    expect(getProjectTimeline(source)[0]?.entries.map((entry) => entry.project.id))
      .toEqual([3, 2, 4, 1, 5])
  })

  it('进行中单独置顶按开始日期倒序，未知日期置底且稳定', () => {
    const source = [
      project(1, 'unknown'),
      project(2, '2026.10 — Present'),
      project(3, '2026.11.01'),
      project(4, '2026.11 — Present'),
      project(5, 'invalid'),
      project(6, '2026.11 — Present'),
    ]
    const groups = getProjectTimeline(source)

    expect(groups.map((group) => group.key)).toEqual(['ongoing', '2026', 'unknown'])
    expect(groups.map((group) => group.entries.map((entry) => entry.project.id)))
      .toEqual([[4, 6, 2], [3], [1, 5]])
  })

  it('跨年项目仅按结束年份出现一次', () => {
    const groups = getProjectTimeline([
      project(1, '2024.11.11 — 2025.03.06'),
      project(2, '2024.12.24'),
      project(3, '2025.08.18 — 2026.07.06'),
    ])

    expect(groups.map((group) => group.key)).toEqual(['2026', '2025', '2024'])
    expect(groups.map((group) => group.entries.map((entry) => entry.project.id)))
      .toEqual([[3], [1], [2]])
  })

  it('接受空列表，且不修改源数组或项目对象', () => {
    expect(getProjectTimeline([])).toEqual([])
    const source = Object.freeze([
      Object.freeze(project(1, '2025.02')),
      Object.freeze(project(2, '2026.10')),
    ])

    expect(getProjectTimeline(source)[0]?.entries[0]?.project).toBe(source[1])
    expect(source.map((item) => item.id)).toEqual([1, 2])
  })

  it('真实项目全部可解析且 ID 唯一，时间线不丢失或重复项目', () => {
    expect(projects).toHaveLength(39)
    expect(new Set(projects.map((item) => item.id)).size).toBe(projects.length)

    for (const item of projects) {
      expect(parseProjectPeriod(item.period), item.title.en).not.toBeNull()
    }

    const timelineProjects = getProjectTimeline(projects)
      .flatMap((group) => group.entries.map((entry) => entry.project))
    expect(timelineProjects).toHaveLength(projects.length)
    expect(new Set(timelineProjects)).toEqual(new Set(projects))
  })
})
