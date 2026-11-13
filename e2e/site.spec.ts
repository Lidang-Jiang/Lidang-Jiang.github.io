import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.route('https://www.googletagmanager.com/**', (route) => route.abort())
})

test('时间线、分类直链和浏览器历史保持一致', async ({ page }) => {
  await page.goto('/projects')
  await expect(page.locator('[data-project-timeline]')).toBeVisible()
  const titles = page.locator('h3[id^="project-title-"]')
  await expect(titles).toHaveCount(39)
  await expect(titles.first()).toContainText('RP3')
  await expect(titles.nth(1)).toContainText('Ability Lite')

  await page.locator('a[href="/projects/categories"]').first().click()
  await expect(page).toHaveURL(/\/projects\/categories$/)
  await expect(page.getByRole('navigation', { name: 'Primary navigation' })
    .getByRole('link', { name: 'Projects', exact: true })).toHaveAttribute('aria-current', 'location')
  await expect(page.locator('[data-project-timeline]')).toHaveCount(0)
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Category Overview' })).toBeVisible()

  await page.locator('a[href="/projects/systems-engineering"]').last().click()
  await expect(page.locator('h3[id^="project-title-"]')).toHaveCount(7)
  await page.goBack()
  await expect(page).toHaveURL(/\/projects\/categories$/)
  await page.goBack()
  await expect(page.locator('[data-project-timeline]')).toBeVisible()
  await page.goForward()
  await expect(page.getByRole('heading', { name: 'Category Overview' })).toBeVisible()
})

test('项目详情可通过键盘展开，中文日期正确且没有重复标识', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('lang', 'zh'))
  await page.goto('/projects')
  await expect(page.getByText('2026.10 — 至今', { exact: true }).first()).toBeVisible()
  const toggle = page.locator('article').first().locator('button[aria-controls]')
  await toggle.focus()
  await page.keyboard.press('Enter')
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  const detailsId = await toggle.getAttribute('aria-controls')
  await expect(page.locator(`[id="${detailsId}"]`)).toBeVisible()
  await page.keyboard.press('Enter')
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  const ids = await page.locator('[id]').evaluateAll((elements) => elements.map((element) => element.id))
  expect(new Set(ids).size).toBe(ids.length)
})

test('手机导航支持键盘与 Escape，跳至内容可用', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 })
  await page.goto('/')
  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: 'Skip to content' })
  await expect(skip).toBeFocused()
  await expect(skip).toBeInViewport()
  await page.keyboard.press('Enter')
  await expect(page.locator('#main-content')).toBeFocused()

  const menu = page.locator('button[aria-controls="mobile-navigation"]')
  await expect(menu).toHaveAccessibleName('Open navigation menu')
  await menu.click()
  await expect(menu).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Escape')
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await expect(menu).toBeFocused()
})

test('静态首页与两种项目总览在禁用 JavaScript 时仍有正文', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL })
  const page = await context.newPage()
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Lidang Jiang', exact: true })).toBeVisible()
  for (const section of await page.locator('.reveal').all()) {
    await expect(section).toHaveCSS('opacity', '1')
  }
  await page.goto('/projects')
  await expect(page.locator('h3[id^="project-title-"]')).toHaveCount(39)
  await page.goto('/projects/categories')
  await expect(page.getByRole('heading', { name: 'Category Overview' })).toBeVisible()
  await context.close()
})

for (const width of [375, 768, 1024, 1440]) {
  test(`中文亮色 ${width}px 页面无水平溢出`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 })
    await page.addInitScript(() => {
      localStorage.setItem('lang', 'zh')
      localStorage.setItem('theme', 'light')
    })
    for (const path of ['/', '/projects', '/projects/categories', '/publications', '/cv']) {
      await page.goto(path)
      await expect(page.locator('h1')).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    }
  })
}

for (const width of [375, 1440]) {
  for (const settings of [
    { lang: 'en', theme: 'light' },
    { lang: 'zh', theme: 'dark' },
    { lang: 'en', theme: 'dark' },
  ]) {
    test(`${settings.lang} ${settings.theme} ${width}px 可读且减少动态效果有效`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.addInitScript(({ lang, theme }) => {
        localStorage.setItem('lang', lang)
        localStorage.setItem('theme', theme)
      }, settings)
      for (const path of ['/', '/projects', '/publications', '/cv']) {
        await page.goto(path)
        await expect(page.locator('h1')).toBeVisible()
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
        await expect(page.locator('html')).toHaveClass(settings.theme === 'dark' ? /dark/ : /^(?!.*dark).*$/)
        for (const section of await page.locator('.reveal').all()) {
          await expect(section).toHaveCSS('opacity', '1')
        }
      }
    })
  }
}
