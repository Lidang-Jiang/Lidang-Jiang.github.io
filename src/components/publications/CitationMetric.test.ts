import { renderToString } from 'vue/server-renderer'
import { createSSRApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { describe, expect, it } from 'vitest'
import CitationMetric from './CitationMetric.vue'
import type { CitationMetric as Metric } from '@/types/citation'
import en from '@/i18n/en'
import zh from '@/i18n/zh'

const metric: Metric = {
  count: 47,
  estimated: false,
  scholarId: 'SvUCAeQAAAAJ:9yKSN-GCB0IC',
  source: 'Google Scholar',
  sourceUrl: 'https://scholar.google.com/citations?view_op=view_citation&user=SvUCAeQAAAAJ&citation_for_view=SvUCAeQAAAAJ:9yKSN-GCB0IC&hl=en',
  citedByUrl: 'https://scholar.google.com/scholar?cites=7531611611822536100&hl=en',
  verifiedAt: '2026-11-15',
}

async function renderMetric(value: Metric | undefined, locale = 'en') {
  const app = createSSRApp(CitationMetric, { metric: value })
  app.use(createI18n({ legacy: false, locale, messages: { en, zh } }))
  return renderToString(app)
}

describe('Google Scholar 论文被引次数', () => {
  it.each([
    ['en', 'Cited by 47', 'Updated'],
    ['zh', '被引 47 次', '更新于'],
  ])('%s 静态首屏显示次数、来源与真实核验日期', async (locale, count, updated) => {
    const html = await renderMetric(metric, locale)

    expect(html).toContain(count)
    expect(html).toContain('Google Scholar')
    expect(html).toContain(updated)
    expect(html).toContain('datetime="2026-11-15"')
    expect(html).toContain('2026-11-15</time>')
    expect(html).toContain('href="https://scholar.google.com/scholar?cites=7531611611822536100&amp;hl=en"')
    expect(html).toContain('rel="noopener noreferrer"')
  })

  it('真实零引用仍显示为 0，而不是缺失数据', async () => {
    const html = await renderMetric({ ...metric, count: 0 }, 'zh')

    expect(html).toContain('被引 0 次')
    expect(html).not.toContain('引用数据暂不可用')
  })

  it('保留谷歌学术的估算星号，并提供可访问说明', async () => {
    const html = await renderMetric({ ...metric, count: 11, estimated: true }, 'zh')

    expect(html).toContain('被引 11 次')
    expect(html).toContain('>*</span>')
    expect(html).toContain('aria-label="Google Scholar 估算值，可能包含未匹配的引用"')
  })

  it('精确计数不添加估算标记', async () => {
    const html = await renderMetric(metric)

    expect(html).not.toContain('>*</span>')
  })

  it('缺少缓存时明确表示不可用，不捏造次数或更新时间', async () => {
    const html = await renderMetric(undefined, 'zh')

    expect(html).toContain('引用数据暂不可用')
    expect(html).not.toContain('被引 0 次')
    expect(html).not.toContain('<time')
  })
})
