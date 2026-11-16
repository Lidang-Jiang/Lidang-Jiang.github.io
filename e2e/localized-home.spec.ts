import { expect, test, type Page } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.route('https://www.googletagmanager.com/**', (route) => route.abort())
})

function collectRenderErrors(page: Page) {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (/hydration/i.test(message.text())) errors.push(message.text())
  })
  return errors
}

for (const home of [
  { path: '/', saved: 'zh', name: 'Lidang Jiang', lang: 'en' },
  { path: '/zh', saved: 'en', name: '江李当', lang: 'zh-CN' },
]) {
  test(`${home.path} 在相反的保存偏好下仍按 URL 渲染`, async ({ page }) => {
    const errors = collectRenderErrors(page)
    await page.addInitScript((saved) => localStorage.setItem('lang', saved), home.saved)
    await page.goto(home.path)
    await expect(page.getByRole('heading', { name: home.name, exact: true })).toBeVisible()
    await expect(page.locator('html')).toHaveAttribute('lang', home.lang)
    await expect.poll(() => page.evaluate(() => localStorage.getItem('lang')))
      .toBe(home.path === '/' ? 'en' : 'zh')
    await page.reload()
    await expect(page.getByRole('heading', { name: home.name, exact: true })).toBeVisible()
    expect(errors).toEqual([])
  })
}

test('禁用 JavaScript 时中文正文与语言链接仍可使用', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL })
  const page = await context.newPage()
  await page.goto('/zh')
  await expect(page.getByRole('heading', { name: '江李当', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: '关于我', exact: true })).toBeVisible()
  await page.getByRole('link', { name: '切换语言', exact: true }).click()
  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('heading', { name: 'Lidang Jiang', exact: true })).toBeVisible()
  await context.close()
})

test('中文首页、项目页、语言切换与浏览器历史保持一致', async ({ page }) => {
  const errors = collectRenderErrors(page)
  await page.goto('/zh')
  await page.getByRole('link', { name: '浏览项目', exact: true }).click()
  await expect(page).toHaveURL(/\/projects$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('项目')
  await page.getByRole('link', { name: '首页', exact: true }).click()
  await expect(page).toHaveURL(/\/zh$/)
  await page.getByRole('link', { name: '切换语言', exact: true }).click()
  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('heading', { name: 'Lidang Jiang', exact: true })).toBeVisible()
  await page.goBack()
  await expect(page.getByRole('heading', { name: '江李当', exact: true })).toBeVisible()
  await page.goForward()
  await expect(page.getByRole('heading', { name: 'Lidang Jiang', exact: true })).toBeVisible()
  expect(errors).toEqual([])
})

test('手机首页语言入口切换网址并关闭菜单', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 })
  await page.goto('/')
  const menu = page.locator('button[aria-controls="mobile-navigation"]')
  await menu.click()
  await page.getByRole('link', { name: '切换到中文', exact: true }).click()
  await expect(page).toHaveURL(/\/zh$/)
  await expect(page.getByRole('heading', { name: '江李当', exact: true })).toBeVisible()
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await menu.click()
  await page.getByRole('link', { name: 'Switch to English', exact: true }).click()
  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('heading', { name: 'Lidang Jiang', exact: true })).toBeVisible()
})

test('普通页面在挂载后恢复偏好，刷新也无 hydration 错误', async ({ page }) => {
  const errors = collectRenderErrors(page)
  await page.addInitScript(() => localStorage.setItem('lang', 'zh'))
  await page.goto('/projects')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('项目')
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('项目')
  await page.getByRole('button', { name: '切换语言', exact: true }).click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Projects')
  await page.getByRole('link', { name: 'Home', exact: true }).click()
  await expect(page).toHaveURL(/\/$/)
  expect(errors).toEqual([])
})

test('存储不可用时首页和普通页面仍支持语言切换', async ({ page }) => {
  const errors = collectRenderErrors(page)
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() { throw new DOMException('Storage unavailable', 'SecurityError') },
    })
  })
  await page.goto('/zh')
  await expect(page.getByRole('heading', { name: '江李当', exact: true })).toBeVisible()
  await page.getByRole('link', { name: '浏览项目', exact: true }).click()
  await page.getByRole('button', { name: '切换语言', exact: true }).click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Projects')
  expect(errors).toEqual([])
})
