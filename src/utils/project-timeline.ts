import type { Project } from '@/types/project'

export interface ProjectDate {
  year: number
  month: number
  day: number
  precision: 'day' | 'month'
  value: number
}

export interface ProjectPeriod {
  start: ProjectDate
  end: ProjectDate | null
  ongoing: boolean
}

export interface ProjectTimelineEntry {
  project: Project
  period: ProjectPeriod | null
}

export interface ProjectTimelineGroup {
  key: string
  entries: ProjectTimelineEntry[]
}

function parseDate(value: string, boundary: 'start' | 'end'): ProjectDate | null {
  const match = /^(\d{4})\.(\d{1,2})(?:\.(\d{1,2}))?$/.exec(value.trim())
  if (!match) return null

  const year = Number(match[1])
  const month = Number(match[2])
  if (year < 1 || month < 1 || month > 12) return null

  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
  const monthDays = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const lastDay = monthDays[month - 1]
  const precision = match[3] ? 'day' : 'month'
  const day = match[3] ? Number(match[3]) : boundary === 'end' ? lastDay : 1
  if (day < 1 || day > lastDay) return null

  return { year, month, day, precision, value: year * 10000 + month * 100 + day }
}

/** 从展示周期解析可排序日期；月份边界只用于比较。 */
export function parseProjectPeriod(period: string): ProjectPeriod | null {
  const parts = period.trim().split(/\s*[—–-]\s*/)
  if (parts.length > 2) return null

  const start = parseDate(parts[0], 'start')
  if (!start) return null
  if (parts.length === 2 && /^present$/i.test(parts[1])) {
    return { start, end: null, ongoing: true }
  }

  const end = parseDate(parts.length === 2 ? parts[1] : parts[0], 'end')
  if (!end || end.value < start.value) return null
  return { start, end, ongoing: false }
}

/** 本地化进行中标记，同时保留来源数据的日期精度。 */
export function formatProjectPeriod(period: string, present: string): string {
  return period.replace(/\bPresent\b/gi, present)
}

function rank(period: ProjectPeriod | null): number {
  if (!period) return 2
  return period.ongoing ? 0 : 1
}

/** 生成进行中、结束年份和未知日期分组，不修改源数组或项目。 */
export function getProjectTimeline(projects: readonly Project[]): ProjectTimelineGroup[] {
  const entries = projects.map((project, index) => ({
    project,
    index,
    period: parseProjectPeriod(project.period),
  })).sort((left, right) =>
    rank(left.period) - rank(right.period)
    || (right.period?.end?.value ?? 0) - (left.period?.end?.value ?? 0)
    || (right.period?.start.value ?? 0) - (left.period?.start.value ?? 0)
    || left.index - right.index,
  )

  const groups = new Map<string, ProjectTimelineGroup>()
  for (const { project, period } of entries) {
    const key = !period ? 'unknown' : period.ongoing ? 'ongoing' : String(period.end!.year)
    const entry = { project, period }
    const group = groups.get(key)
    if (group) group.entries.push(entry)
    else groups.set(key, { key, entries: [entry] })
  }
  return [...groups.values()]
}
