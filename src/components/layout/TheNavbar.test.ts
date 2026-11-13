import { renderToString } from 'vue/server-renderer'
import { createSSRApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createMemoryHistory, createRouter } from 'vue-router'
import { describe, expect, it } from 'vitest'
import TheNavbar from './TheNavbar.vue'
import en from '@/i18n/en'
import { routes } from '@/router'

async function renderNavigation(path: string) {
  const router = createRouter({ history: createMemoryHistory(), routes })
  const app = createSSRApp(TheNavbar)
  app.use(router)
  app.use(createI18n({ legacy: false, locale: 'en', messages: { en } }))
  await router.push(path)
  await router.isReady()
  return renderToString(app)
}

describe('导航所在位置', () => {
  it.each([
    ['/projects', 'page'],
    ['/projects/categories', 'location'],
    ['/projects/ai-infra', 'location'],
    ['/projects/systems-engineering', 'location'],
  ])('%s 在桌面和手机导航中都标明项目位置', async (path, current) => {
    const html = await renderNavigation(path)
    const links = html.match(/<a\b[^>]*>/g)?.filter((tag) => tag.includes('href="/projects"'))
    expect(links).toHaveLength(2)
    for (const link of links ?? []) {
      expect(link).toContain(`aria-current="${current}"`)
    }
  })

  it('其他页面不会误标项目导航', async () => {
    const html = await renderNavigation('/publications')
    const links = html.match(/<a\b[^>]*>/g)?.filter((tag) => tag.includes('href="/projects"'))
    for (const link of links ?? []) expect(link).not.toContain('aria-current')
  })
})
