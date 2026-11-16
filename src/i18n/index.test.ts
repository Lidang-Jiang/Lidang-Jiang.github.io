import { afterEach, describe, expect, it, vi } from 'vitest'
import { createSSRApp, defineComponent, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { useI18n } from 'vue-i18n'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createSiteI18n, getHomeLocale, getHomePath, readSavedLocale, saveLocale } from './index'
import App from '@/App.vue'
import { routes } from '@/router'

afterEach(() => vi.unstubAllGlobals())

describe('独立的页面语言实例', () => {
  it('并行渲染中文、英文页面时不共享语言状态', async () => {
    const Heading = defineComponent({
      setup() {
        const { t } = useI18n()
        return () => h('h1', t('hero.name'))
      },
    })
    const chinese = createSiteI18n('/zh')
    const english = createSiteI18n('/')
    const cv = createSiteI18n('/cv')
    const results = await Promise.all([chinese, english, cv].map((i18n) => {
      return renderToString(createSSRApp(Heading).use(i18n))
    }))

    expect(results).toEqual(['<h1>江李当</h1>', '<h1>Lidang Jiang</h1>', '<h1>Lidang Jiang</h1>'])
    chinese.global.locale.value = 'en'
    english.global.locale.value = 'zh'
    expect(cv.global.locale.value).toBe('en')
  })

  it.each([
    ['/', 'en'],
    ['/zh', 'zh'],
    ['/zh/', 'zh'],
    ['/cv', 'en'],
    ['/zh/missing', 'en'],
  ])('%s 初始语言由真实页面路径决定', (path, locale) => {
    expect(createSiteI18n(path).global.locale.value).toBe(locale)
  })
})

describe('语言偏好存储', () => {
  it.each(['en', 'zh'])('恢复有效的 %s 偏好', (saved) => {
    vi.stubGlobal('localStorage', { getItem: vi.fn(() => saved) })
    expect(readSavedLocale()).toBe(saved)
  })

  it.each([null, '', 'fr'])('忽略无效偏好 %s', (saved) => {
    vi.stubGlobal('localStorage', { getItem: vi.fn(() => saved) })
    expect(readSavedLocale()).toBeUndefined()
  })

  it('保存偏好供后续普通页面恢复', () => {
    const setItem = vi.fn()
    vi.stubGlobal('localStorage', { setItem })
    saveLocale('zh')
    expect(setItem).toHaveBeenCalledWith('lang', 'zh')
  })

  it('存储被禁止时保持页面可用', () => {
    const denied = () => { throw new Error('存储不可用') }
    vi.stubGlobal('localStorage', { getItem: denied, setItem: denied })
    expect(readSavedLocale()).toBeUndefined()
    expect(() => saveLocale('en')).not.toThrow()
  })

  it('服务端没有存储对象时使用默认语言', () => {
    vi.stubGlobal('localStorage', undefined)
    expect(readSavedLocale()).toBeUndefined()
    expect(() => saveLocale('zh')).not.toThrow()
  })

  it('只有首页按 URL 固定语言，中文首页入口使用独立 URL', () => {
    expect(getHomeLocale('/publications')).toBeUndefined()
    expect(getHomePath('zh')).toBe('/zh')
    expect(getHomePath('en')).toBe('/')
  })
})

describe('首页静态语言', () => {
  it.each([
    ['/', 'zh', 'Lidang Jiang', '/zh'],
    ['/zh', 'en', '江李当', '/'],
  ])('%s 忽略相反的浏览器偏好，并输出真实语言链接', async (path, saved, name, alternate) => {
    const storage = { getItem: vi.fn(() => saved), setItem: vi.fn() }
    vi.stubGlobal('localStorage', storage)
    const router = createRouter({ history: createMemoryHistory(), routes })
    const app = createSSRApp(App)
    app.use(router)
    app.use(createSiteI18n())
    await router.push(path)
    await router.isReady()

    const html = await renderToString(app)

    expect(html).toMatch(new RegExp(`<h1[^>]*>${name}</h1>`))
    const links = html.match(/<a\b[^>]*>[\s\S]*?<\/a>/g) ?? []
    const languageLinks = links.filter((link) => /(?:切换到中文|Switch to English|>中<|>EN<)/.test(link))
    expect(languageLinks).toHaveLength(2)
    for (const link of languageLinks) expect(link).toContain(`href="${alternate}"`)
    expect(storage.getItem).not.toHaveBeenCalled()
    expect(storage.setItem).not.toHaveBeenCalled()
  })
})
