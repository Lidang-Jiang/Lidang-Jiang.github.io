import { expect, test } from '@playwright/test'

const timelinePaths = [
  '/projects',
  '/projects/ai-infra',
  '/projects/embodied-ai',
  '/projects/systems-engineering',
  '/projects/web-development',
]

test.beforeEach(async ({ page }) => {
  await page.route('https://www.googletagmanager.com/**', (route) => route.abort())
  await page.emulateMedia({ reducedMotion: 'reduce' })
})

for (const width of [375, 768, 1024, 1440]) {
  test(`${width}px 总项目和全部分类使用响应式时间线`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.addInitScript(() => localStorage.setItem('lang', 'zh'))

    for (const path of timelinePaths) {
      await page.goto(path)
      await expect(page.locator('[data-project-timeline]')).toBeVisible()
      const list = page.locator('[data-project-timeline] > section > ol:has(> li:nth-child(2))').first()
      const entries = list.locator(':scope > li')
      const positions = await entries.evaluateAll((items) => items.slice(0, 2).map((item) => {
        const { x, y, right, bottom } = item.getBoundingClientRect()
        return { x, y, right, bottom }
      }))

      expect(positions, path).toHaveLength(2)
      const [first, second] = positions
      if (width >= 1024) {
        expect(Math.abs(first.y - second.y), path).toBeLessThan(2)
        expect(second.x, path).toBeGreaterThan(first.right)
      } else {
        expect(Math.abs(first.x - second.x), path).toBeLessThan(2)
        expect(second.y, path).toBeGreaterThan(first.bottom)
      }
      for (const entry of [entries.nth(0), entries.nth(1)]) {
        await expect(entry.locator('[data-project-period]')).toBeVisible()
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), path).toBe(true)
    }
  })
}

for (const path of ['/projects', '/projects/ai-infra']) {
  test(`${path} 双列中的项目详情独立展开`, async ({ page }) => {
    await page.goto(path)
    const list = page.locator('[data-project-timeline] > section > ol:has(> li:nth-child(2))').first()
    const buttons = list.locator(':scope > li > article button[aria-controls]')
    const left = buttons.nth(0)
    const right = buttons.nth(1)

    await right.focus()
    await page.keyboard.press('Enter')
    await expect(right).toHaveAttribute('aria-expanded', 'true')
    await expect(left).toHaveAttribute('aria-expanded', 'false')
    const detailsId = await right.getAttribute('aria-controls')
    await expect(page.locator(`[id="${detailsId}"]`)).toBeVisible()
    await page.keyboard.press('Enter')
    await expect(right).toHaveAttribute('aria-expanded', 'false')
  })
}

test('分类直链静态生成完整时间线，无需 JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL })
  try {
    const page = await context.newPage()
    for (const path of timelinePaths.slice(1)) {
      await page.goto(path)
      await expect(page.locator('[data-project-timeline]')).toBeVisible()
      const count = await page.locator('h3[id^="project-title-"]').count()
      expect(count).toBeGreaterThan(0)
      await expect(page.locator('[data-project-period]')).toHaveCount(count)
    }
  } finally {
    await context.close()
  }
})

for (const settings of [
  { lang: 'en', theme: 'light', width: 1440, label: 'Back to top' },
  { lang: 'zh', theme: 'dark', width: 375, label: '回到顶部' },
]) {
  test(`${settings.lang} ${settings.width}px 所有页面可通过键盘回到顶部`, async ({ page }) => {
    await page.setViewportSize({ width: settings.width, height: 480 })
    await page.addInitScript(({ lang, theme }) => {
      localStorage.setItem('lang', lang)
      localStorage.setItem('theme', theme)
    }, settings)

    for (const path of [settings.lang === 'zh' ? '/zh' : '/', '/publications', '/cv', '/projects/categories', ...timelinePaths]) {
      await page.goto(path)
      await expect(page.locator('html')).toHaveAttribute('lang', settings.lang === 'zh' ? 'zh-CN' : 'en')
      const button = page.getByRole('button', { name: settings.label, exact: true })
      await expect(button).toBeHidden()
      await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }))
      await expect(button, path).toBeVisible()
      await expect(button).toBeInViewport()
      const size = await button.boundingBox()
      expect(size?.width).toBeGreaterThanOrEqual(44)
      expect(size?.height).toBeGreaterThanOrEqual(44)
      await button.focus()
      await page.keyboard.press('Enter')
      await expect.poll(() => page.evaluate(() => window.scrollY), { message: path }).toBeLessThan(2)
      await expect(page.locator('#main-content')).toBeFocused()
      await expect(button).toBeHidden()
    }
  })
}
