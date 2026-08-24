import { renderToString } from '@vue/server-renderer'
import { createSSRApp, defineComponent, h } from 'vue'
import { createI18n } from 'vue-i18n'
import { describe, expect, it } from 'vitest'

import HeroSection from '@/components/home/HeroSection.vue'
import { profile } from '@/data/profile'
import en from '@/i18n/en'

const RouterLinkStub = defineComponent({
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  setup(props, { slots }) {
    return () => h('a', { href: props.to }, slots.default?.())
  },
})

async function renderHero() {
  const app = createSSRApp(HeroSection)

  app.component('RouterLink', RouterLinkStub)
  app.use(createI18n({
    legacy: false,
    locale: 'en',
    messages: { en },
  }))

  return renderToString(app)
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function getVisibleLinkText(html: string, href: string) {
  const encodedHref = href.replaceAll('&', '&amp;')
  const anchorPattern = new RegExp(
    `<a[^>]*href="${escapeRegExp(encodedHref)}"[^>]*>([\\s\\S]*?)<\\/a>`,
  )
  const content = html.match(anchorPattern)?.[1]

  return content?.replace(/<[^>]+>/g, '').trim() ?? null
}

describe('hero professional profiles', () => {
  it.each([
    [profile.social.github, 'GitHub'],
    [profile.social.scholar, 'Google Scholar'],
    [profile.social.orcid, 'ORCID'],
    ['https://gitcode.com/Lidang-Jiang', 'GitCode'],
  ])('shows %s as a named link', async (href, label) => {
    const html = await renderHero()

    expect(getVisibleLinkText(html, href)).toBe(label)
  })
})
