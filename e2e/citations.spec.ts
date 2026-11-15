import { expect, test } from '@playwright/test'
import citationCounts from '../src/data/citation-counts.json'

const publications = [
  { id: 'energy-2024', doi: 'https://doi.org/10.1016/j.energy.2024.132840' },
  { id: 'applied-energy-2025', doi: 'https://doi.org/10.1016/j.apenergy.2024.124604' },
] as const

for (const { javaScriptEnabled, locale } of [
  { javaScriptEnabled: false, locale: 'en' },
  { javaScriptEnabled: true, locale: 'en' },
  { javaScriptEnabled: true, locale: 'zh' },
]) {
  test(`${locale} 论文与简历展示 Google Scholar 引用快照，JavaScript=${javaScriptEnabled}`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled, baseURL, viewport: { width: 375, height: 900 } })
    try {
      await context.route('https://www.googletagmanager.com/**', (route) => route.abort())
      if (javaScriptEnabled) {
        await context.addInitScript((lang) => localStorage.setItem('lang', lang), locale)
      }
      const page = await context.newPage()
      // 静态构建默认英文，中文由客户端语言偏好恢复。
      const lang = javaScriptEnabled ? locale : 'en'
      for (const path of ['/publications', '/cv']) {
        await page.goto(path)
        await expect(page.locator('[data-citation-metric]')).toHaveCount(publications.length)
        for (const publication of publications) {
          const metric = citationCounts[publication.id]
          const entry = path === '/publications'
            ? page.locator('article').filter({ has: page.locator(`a[href="${publication.doi}"]`) })
            : page.locator('li').filter({ has: page.locator(`a[href="${publication.doi}"]`) })
          const count = new Intl.NumberFormat(lang).format(metric.count)
          const label = lang === 'zh' ? `被引 ${count} 次` : `Cited by ${count}`
          const source = entry.locator('[data-citation-metric] a')
          await expect(source).toContainText(`Google Scholar · ${label}`)
          await expect(source).toHaveAttribute('href', metric.citedByUrl)
          await expect(entry.locator('time')).toHaveText(metric.verifiedAt)
          await expect(entry.locator('time')).toHaveAttribute('datetime', metric.verifiedAt)
          await expect(source.locator('span[aria-label]')).toHaveCount(metric.estimated ? 1 : 0)
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
      }
    } finally {
      await context.close()
    }
  })
}
