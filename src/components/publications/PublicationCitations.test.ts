import { renderToString } from 'vue/server-renderer'
import { createSSRApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createMemoryHistory, createRouter, RouterView } from 'vue-router'
import { describe, expect, it } from 'vitest'
import { routes } from '@/router'
import { publications } from '@/data/publications'
import { citationCounts } from '@/data/citations'
import en from '@/i18n/en'
import zh from '@/i18n/zh'

describe('各处论文展示共用 Google Scholar 引用数据', () => {
  it.each([
    ['/publications', 'en'],
    ['/publications', 'zh'],
    ['/cv', 'en'],
    ['/cv', 'zh'],
  ])('%s %s 为每篇论文静态渲染引用指标', async (path, locale) => {
    const router = createRouter({ history: createMemoryHistory(), routes })
    const app = createSSRApp(RouterView)
    app.use(router)
    app.use(createI18n({ legacy: false, locale, messages: { en, zh } }))
    await router.push(path)
    await router.isReady()
    const html = await renderToString(app)

    expect(html.match(/data-citation-metric/g)).toHaveLength(publications.length)
    expect(html.match(/<time datetime=/g)).toHaveLength(publications.length)
    expect(html).not.toContain('Citation data unavailable')
    expect(html).not.toContain('引用数据暂不可用')
    const entries = html.match(path === '/publications'
      ? /<article\b[\s\S]*?<\/article>/g
      : /<li\b[\s\S]*?<\/li>/g) ?? []
    for (const publication of publications) {
      const metric = citationCounts[publication.id]!
      expect(metric, publication.id).toBeDefined()
      const entry = entries.find((item) => item.includes(`href="${publication.doi}"`))
      const count = new Intl.NumberFormat(locale).format(metric.count)
      expect(entry).toContain(locale === 'zh' ? `被引 ${count} 次` : `Cited by ${count}`)
      expect(entry).toContain(`datetime="${metric.verifiedAt}"`)
      expect(entry?.includes('>*</span>')).toBe(metric.estimated)
    }
  })
})
