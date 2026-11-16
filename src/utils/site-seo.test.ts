import { describe, expect, it } from 'vitest'
import { getSiteSeo, SITE_ORIGIN } from './site-seo'
import { getProjectCategoryPaths } from './project-groups'

const paths = ['/', '/zh', '/cv', '/publications', '/projects',
  '/projects/categories', ...getProjectCategoryPaths()]

describe('页面索引信息', () => {
  it('每个发布页面有自己的规范网址、标题和摘要', () => {
    const pages = paths.map((path) => getSiteSeo(path, path === '/zh' ? 'zh' : 'en'))
    expect(new Set(pages.map((page) => page.title)).size).toBe(paths.length)
    expect(new Set(pages.map((page) => page.description)).size).toBe(paths.length)
    expect(pages.map((page) => page.canonical)).toEqual(
      paths.map((path) => `${SITE_ORIGIN}${path}`),
    )
    for (const page of pages) expect(page.description.length).toBeGreaterThan(40)
  })

  it('中文首页在标题和摘要中直接展示姓名', () => {
    const page = getSiteSeo('/zh', 'en')
    expect(page.title).toContain('江李当')
    expect(page.description).toContain('江李当')
    expect(page.lang).toBe('zh-CN')
  })

  it('两个首页的语言与网址一致并互相声明替代版本', () => {
    const english = getSiteSeo('/', 'zh')
    const chinese = getSiteSeo('/zh/', 'en')
    expect(english.lang).toBe('en')
    expect(chinese.canonical).toBe(`${SITE_ORIGIN}/zh`)
    expect(chinese.alternates).toEqual(english.alternates)
    expect(english.alternates).toEqual([
      { hreflang: 'en', href: `${SITE_ORIGIN}/` },
      { hreflang: 'zh-CN', href: `${SITE_ORIGIN}/zh` },
      { hreflang: 'x-default', href: `${SITE_ORIGIN}/` },
    ])
  })

  it('分类标题来自实际分类资料，其他页面不声明不存在的语言地址', () => {
    const page = getSiteSeo('/projects/systems-engineering', 'zh')
    expect(page.title).toContain('系统工程')
    expect(page.lang).toBe('zh-CN')
    expect(page.alternates).toEqual([])
    expect(getSiteSeo('/cv', 'en').title).toContain('Resume')
    expect(getSiteSeo('/publications', 'zh').title).toContain('论文')
    expect(getSiteSeo('/projects', 'zh').title).toContain('项目')
    expect(getSiteSeo('/projects/categories', 'zh').title).toContain('分类')
  })

  it('未知地址使用未找到信息且禁止索引', () => {
    expect(getSiteSeo('/missing', 'en')).toMatchObject({
      title: 'Page Not Found | Lidang Jiang', robots: 'noindex, follow',
    })
    expect(getSiteSeo('/projects/missing', 'zh').robots).toBe('noindex, follow')
  })
})
