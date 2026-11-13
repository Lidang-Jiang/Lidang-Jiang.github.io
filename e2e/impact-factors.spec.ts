import { expect, test } from '@playwright/test'
import impactFactorData from '../src/data/impact-factors.json'

const journals = [
  { name: 'Energy', issn: '0360-5442' },
  { name: 'Applied Energy', issn: '0306-2619' },
] as const

for (const javaScriptEnabled of [false, true]) {
  test(`论文与简历展示正式影响因子，JavaScript=${javaScriptEnabled}`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled, baseURL })
    await context.route('https://www.googletagmanager.com/**', route => route.abort())
    const page = await context.newPage()

    for (const path of ['/publications', '/cv']) {
      await page.goto(path)
      for (const journal of journals) {
        const metric = impactFactorData[journal.issn]
        expect(metric.jcrSource).toContain('elsevier.com/journals/')
        expect(metric.jcrIF).not.toBeNull()
        const publication = path === '/publications'
          ? page.locator('article').filter({ hasText: journal.name }).first()
          : page.locator('li').filter({ hasText: `${journal.name},` }).first()
        await expect(publication.getByText(`IF=${metric.jcrIF}`, { exact: true })).toBeVisible()
      }
    }

    await context.close()
  })
}
