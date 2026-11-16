import { createSSRApp, defineComponent } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createI18n } from 'vue-i18n'
import { createHead, renderSSRHead } from '@unhead/vue/server'
import { describe, expect, it } from 'vitest'
import { useSiteSeo } from './useSiteSeo'

const HeadOnly = defineComponent({
  setup() {
    useSiteSeo()
    return () => null
  },
})

async function renderHead(path: string, locale = 'en') {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/:pathMatch(.*)*', component: HeadOnly }],
  })
  const head = createHead()
  const app = createSSRApp(HeadOnly)
  app.use(head)
  app.use(router)
  app.use(createI18n({ legacy: false, locale, messages: { en: {}, zh: {} } }))
  await router.push(path)
  await renderToString(app)
  return renderSSRHead(head)
}

describe('静态 HTML head', () => {
  it('每页仅输出一个自指规范网址和对应分享信息', async () => {
    const { headTags, htmlAttrs } = await renderHead('/projects/ai-infra?view=list#details')
    expect(headTags.match(/rel="canonical"/g)).toHaveLength(1)
    expect(headTags).toContain('href="https://lidang-jiang.pages.dev/projects/ai-infra"')
    expect(headTags).toContain('property="og:url" content="https://lidang-jiang.pages.dev/projects/ai-infra"')
    expect(headTags).toContain('name="twitter:title"')
    expect(headTags).not.toContain('hreflang')
    expect(htmlAttrs).toContain('lang="en"')
  })

  it('中文首页直接输出中文和双向语言链接', async () => {
    const { headTags, htmlAttrs } = await renderHead('/zh', 'en')
    expect(headTags).toContain('<title>江李当')
    expect(headTags.match(/rel="alternate"/g)).toHaveLength(3)
    expect(headTags).toContain('hreflang="zh-CN"')
    expect(htmlAttrs).toContain('lang="zh-CN"')
  })

  it('非首页切换语言时使用该语言的摘要和 html lang', async () => {
    const { headTags, htmlAttrs } = await renderHead('/cv', 'zh')
    expect(headTags).toContain('<title>个人简历 | 江李当</title>')
    expect(htmlAttrs).toContain('lang="zh-CN"')
  })
})
