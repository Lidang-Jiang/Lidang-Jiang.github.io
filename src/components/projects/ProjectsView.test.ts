import { renderToString } from 'vue/server-renderer'
import { createSSRApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createMemoryHistory, createRouter, RouterView } from 'vue-router'
import { describe, expect, it } from 'vitest'

import { projects } from '@/data/projects'
import en from '@/i18n/en'
import zh from '@/i18n/zh'
import { routes } from '@/router'
import { getProjectGroupBySlug, PROJECT_CATEGORY_NAV_ITEMS } from '@/utils/project-groups'

async function renderProjects(path: string, locale = 'en') {
  const router = createRouter({ history: createMemoryHistory(), routes })
  const app = createSSRApp(RouterView)
  app.use(router)
  app.use(createI18n({ legacy: false, locale, messages: { en, zh } }))
  await router.push(path)
  await router.isReady()

  return { html: await renderToString(app), router }
}

function projectIds(html: string): number[] {
  return Array.from(html.matchAll(/id="project-title-(\d+)"/g), (match) => Number(match[1]))
}

function linkTag(html: string, path: string): string | undefined {
  return html.match(/<a\b[^>]*>/g)?.find((tag) => tag.includes(`href="${path}"`))
}

describe('项目页面路由与静态首屏', () => {
  it('默认完整展示时间线，以真实链接切换模式并标明当前页', async () => {
    const { html } = await renderProjects('/projects')

    expect(linkTag(html, '/projects')).toContain('aria-current="page"')
    expect(linkTag(html, '/projects/categories')).toBeDefined()
    expect(html.includes('data-project-timeline')).toBe(true)
    expect(projectIds(html)).toHaveLength(projects.length)
    expect(projectIds(html).slice(0, 3)).toEqual([40, 41, 34])
    expect(new Set(projectIds(html)).size).toBe(projects.length)
    expect(html).toContain('href="/projects/systems-engineering"')
  })

  it('分类总览具有独立直链，仅挂载分类卡片', async () => {
    const { html, router } = await renderProjects('/projects/categories')

    expect(router.currentRoute.value.name).toBe('project-categories')
    expect(linkTag(html, '/projects/categories')).toContain('aria-current="page"')
    expect(html).toContain('Category Overview')
    expect(html).not.toContain('data-project-timeline')
    expect(projectIds(html)).toEqual([])
    for (const item of PROJECT_CATEGORY_NAV_ITEMS) {
      expect(html).toContain(`href="/projects/${item.slug}"`)
    }
  })

  it.each(PROJECT_CATEGORY_NAV_ITEMS)('保留 $slug 直链和分类原始顺序', async ({ slug }) => {
    const { html, router } = await renderProjects(`/projects/${slug}`)
    const group = getProjectGroupBySlug(projects, slug)

    expect(router.currentRoute.value.name).toBe('project-category')
    expect(projectIds(html)).toEqual(group?.projects.map((item) => item.id))
    expect(html).not.toContain('data-project-timeline')
    expect(linkTag(html, `/projects/${slug}`)).toContain('aria-current="page"')
  })

  it('中文日期显示至今，项目详情默认收起且 ARIA ID 唯一', async () => {
    const { html } = await renderProjects('/projects', 'zh')

    expect(html.includes('2026.10 — 至今')).toBe(true)
    expect(html).not.toContain('2026.10 — Present')
    expect(html.match(/aria-expanded="false"/g)).toHaveLength(projects.length)
    const detailIds = Array.from(html.matchAll(/id="project-details-(\d+)"/g), (match) => match[1])
    expect(new Set(detailIds).size).toBe(projects.length)
    for (const id of detailIds) {
      expect(html).toContain(`aria-controls="project-details-${id}"`)
      expect(html).toContain(`aria-labelledby="project-title-${id}"`)
    }
  })

  it('未知分类直链回到默认时间线', async () => {
    const { html, router } = await renderProjects('/projects/unknown')

    expect(router.currentRoute.value.path).toBe('/projects')
    expect(html.includes('data-project-timeline')).toBe(true)
  })
})
