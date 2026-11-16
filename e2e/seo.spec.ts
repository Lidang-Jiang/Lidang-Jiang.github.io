import { expect, test } from '@playwright/test'

const paths = ['/', '/zh', '/cv', '/publications', '/projects',
  '/projects/categories', '/projects/ai-infra', '/projects/embodied-ai',
  '/projects/systems-engineering', '/projects/web-development']
const origin = 'https://lidang-jiang.pages.dev'

test('十个静态页面直接返回独立索引信息与正文', async ({ request }) => {
  const titles = new Set<string>()
  for (const path of paths) {
    const response = await request.get(path, { maxRedirects: 0 })
    expect(response.status(), path).toBe(200)
    const html = await response.text()
    expect(html).toContain(`rel="canonical" href="${origin}${path}"`)
    expect(html.match(/rel="canonical"/g)).toHaveLength(1)
    expect(html.match(/name="description"/g)).toHaveLength(1)
    expect(html).toMatch(/<h1\b[^>]*>[^<]+/)
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1]
    expect(title).toBeTruthy()
    titles.add(title!)
    if (path === '/zh') {
      expect(html).toContain('lang="zh-CN"')
      expect(html).toMatch(/<h1\b[^>]*>\s*江李当/)
    }
  }
  expect(titles.size).toBe(paths.length)
  const sitemap = await request.get('/sitemap.xml')
  const xml = await sitemap.text()
  expect(xml.match(/<loc>/g)).toHaveLength(paths.length)
  for (const path of paths) expect(xml).toContain(`<loc>${origin}${path}</loc>`)
})

test('客户端导航更新 head，并移除仅属于首页的语言链接', async ({ page }) => {
  await page.goto('/zh')
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN')
  await expect(page.locator('head link[rel="alternate"]')).toHaveCount(3)
  await page.getByRole('link', { name: '浏览项目', exact: true }).click()
  await expect(page).toHaveURL(/\/projects$/)
  await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href', `${origin}/projects`)
  await expect(page.locator('head link[rel="alternate"]')).toHaveCount(0)
  await expect(page).toHaveTitle('工程项目 | 江李当')
  await expect(page.locator('head meta[name="description"]')).toHaveCount(1)
})

test('脚本加载完成后保留用户在静态页面上的键盘焦点', async ({ page }) => {
  let releaseApp = () => {}
  const gate = new Promise<void>((resolve) => { releaseApp = resolve })
  await page.route('**/assets/app-*.js', async (route) => {
    await gate
    await route.continue()
  })
  try {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    const skip = page.getByRole('link', { name: 'Skip to content' })
    await page.keyboard.press('Tab')
    await expect(skip).toBeFocused()
    releaseApp()
    await page.waitForFunction(() => {
      const root = document.getElementById('app')
      return root && '__vue_app__' in root
    })
    await expect(skip).toBeFocused()
  } finally {
    releaseApp()
  }
})
