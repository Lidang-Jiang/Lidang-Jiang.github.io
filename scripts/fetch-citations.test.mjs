import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, it } from 'node:test'

import {
  PUBLICATIONS,
  PROFILE_URL,
  fetchScholarHtml,
  parseCitationHtml,
  refreshCitations,
  updateCitations,
} from './fetch-citations.mjs'

const [energy, appliedEnergy] = PUBLICATIONS
const today = '2026-11-15'

function row(publication, count = 11, estimated = false) {
  return `<tr class="gsc_a_tr"><td class="gsc_a_t">
    <a class="gsc_a_at" href="/citations?view_op=view_citation&amp;user=SvUCAeQAAAAJ&amp;citation_for_view=${publication.scholarId}">${publication.title}</a>
    </td><td class="gsc_a_c"><a class="gsc_a_ac gs_ibl" href="https://scholar.google.com/scholar?oi=bibs&amp;hl=en&amp;cites=2315966577370902074,10948924252561696116">${count}</a>
    ${estimated ? '<span class="gsc_a_m"><a class="gsc_a_am" href="javascript:void(0)">*</a></span>' : ''}
    </td><td class="gsc_a_y">2024</td></tr>`
}

const profile = (energyCount = 11, appliedCount = 47) => `<table>
  ${row(appliedEnergy, appliedCount)}${row(energy, energyCount, true)}</table>`
const cached = Object.fromEntries(PUBLICATIONS.map((publication) => [
  publication.id,
  {
    count: publication.id === energy.id ? 11 : 47,
    estimated: publication.id === energy.id,
    scholarId: publication.scholarId,
    source: 'Google Scholar',
    sourceUrl: `https://scholar.google.com/citations?view_op=view_citation&hl=en&user=SvUCAeQAAAAJ&citation_for_view=${publication.scholarId}`,
    citedByUrl: 'https://scholar.google.com/scholar?oi=bibs&hl=en&cites=2315966577370902074,10948924252561696116',
    verifiedAt: '2026-11-08',
  },
]))

describe('Google Scholar 单篇引用解析', () => {
  it('按记录 ID 和完整标题匹配，不按顺序，保留独立星号估算标记', () => {
    const entry = parseCitationHtml(profile(), energy)
    assert.equal(entry.count, 11)
    assert.equal(entry.estimated, true)
    assert.equal(entry.scholarId, energy.scholarId)
    assert.equal(entry.source, 'Google Scholar')
    assert.equal(new URL(entry.sourceUrl).searchParams.get('citation_for_view'), energy.scholarId)
    assert.equal(new URL(entry.citedByUrl).searchParams.get('cites'), '2315966577370902074,10948924252561696116')
    assert.equal(entry.citedByUrl.includes('&amp;'), false)
    assert.equal(parseCitationHtml(profile(), appliedEnergy).count, 47)
    assert.equal(parseCitationHtml(profile(), appliedEnergy).estimated, false)
  })

  it('允许标题大小写、空白及数字分组变化，0 为有效值', () => {
    const html = row(energy, '1,234').replace(energy.title, energy.title.toLowerCase().replaceAll(' ', '&nbsp; '))
    assert.equal(parseCitationHtml(html, energy).count, 1234)
    assert.equal(parseCitationHtml(row(energy, 0), energy).count, 0)
  })

  for (const count of ['', 'N/A', '-1', '1.5', '11*', '1,23', '9007199254740992']) {
    it(`拒绝无效被引数字 ${count || '空值'}，不转换成零`, () => {
      assert.throws(() => parseCitationHtml(row(energy, count), energy), /引用数字/)
    })
  }

  it('拒绝错误标题、ID、重复记录和缺少数字字段', () => {
    for (const html of [
      row(energy).replace(energy.title, 'Other publication'),
      row(energy).replaceAll(energy.scholarId, appliedEnergy.scholarId),
      row(energy) + row(energy),
      row(energy).replaceAll('gsc_a_ac', 'other_class'),
      row(energy).replaceAll('gsc_a_c', 'other_cell'),
    ]) assert.throws(() => parseCitationHtml(html, energy))
  })

  it('忽略脚本、注释的伪造条目，拒绝离站链接和验证码页', () => {
    assert.throws(() => parseCitationHtml(`<!--${row(energy)}--><script>${row(energy)}</script>`, energy))
    assert.throws(() => parseCitationHtml(row(energy).replace('https://scholar.google.com/scholar', 'https://example.com/scholar'), energy))
    assert.throws(() => parseCitationHtml('<div class="g-recaptcha">Challenge</div>', energy), /访问限制/)
  })
})

describe('Google Scholar 低频 HTTP 获取', () => {
  it('仅请求公开主页，使用明确超时和状态码，不执行 shell', async () => {
    const html = await fetchScholarHtml({
      timeoutSeconds: 3,
      execFile: async (command, args, options) => {
        assert.equal(command, 'curl')
        assert.equal(args.at(-1), PROFILE_URL)
        assert.equal(args[args.indexOf('--max-time') + 1], '3')
        assert.equal(options.shell, undefined)
        assert.ok(options.maxBuffer > 0)
        return { stdout: `${profile()}\n200` }
      },
    })
    assert.equal(html, profile())
  })

  it('临时网络错误和 5xx 可有限重试', async () => {
    let calls = 0
    const html = await fetchScholarHtml({
      retryDelayMs: 0,
      execFile: async () => {
        calls += 1
        if (calls === 1) throw Object.assign(new Error('timeout'), { code: 28 })
        return { stdout: calls === 2 ? 'unavailable\n503' : `${profile()}\n200` }
      },
    })
    assert.equal(calls, 3)
    assert.equal(html, profile())
  })

  for (const response of [
    'forbidden\n403', 'limited\n429', 'not found\n404',
    '<div class="g-recaptcha"></div>\n200',
    '<div class="g-recaptcha"></div>\n503',
    'Your computer may be sending automated queries\n503',
  ]) {
    it(`访问限制或非临时错误立即停止：${response.slice(-3)}`, async () => {
      let calls = 0
      await assert.rejects(fetchScholarHtml({
        retryDelayMs: 0,
        execFile: async () => { calls += 1; return { stdout: response } },
      }))
      assert.equal(calls, 1)
    })
  }

  it('连续超时达到上限后失败', async () => {
    let calls = 0
    await assert.rejects(fetchScholarHtml({
      retryDelayMs: 0,
      execFile: async () => { calls += 1; throw Object.assign(new Error('timeout'), { code: 28 }) },
    }), /请求失败/)
    assert.equal(calls, 3)
  })
})

describe('Google Scholar 数据刷新与缓存', () => {
  it('每次只抓取一次主页，允许计数下降，更新核验日期且不修改旧缓存', async () => {
    let calls = 0
    const result = await updateCitations({
      existingData: cached,
      today,
      fetchHtml: async () => { calls += 1; return profile(8, 0) },
    })
    assert.equal(calls, 1)
    assert.equal(result.results[energy.id].count, 8)
    assert.equal(result.results[appliedEnergy.id].count, 0)
    assert.equal(result.results[energy.id].verifiedAt, today)
    assert.equal(cached[energy.id].count, 11)
    assert.deepEqual(result.failures, [])
    assert.deepEqual(result.warnings, [])
  })

  it('请求失败完整保留两篇缓存及原核验时间', async () => {
    const result = await updateCitations({
      existingData: cached, today,
      fetchHtml: async () => { throw new Error('HTTP 403') },
    })
    assert.deepEqual(result.results, cached)
    assert.equal(result.warnings.length, 2)
    assert.deepEqual(result.failures, [])
  })

  it('一篇记录缺失时只沿用该篇缓存，另一篇正常刷新', async () => {
    const result = await updateCitations({ existingData: cached, today, fetchHtml: async () => row(energy, 12) })
    assert.equal(result.results[energy.id].count, 12)
    assert.deepEqual(result.results[appliedEnergy.id], cached[appliedEnergy.id])
    assert.equal(result.warnings.length, 1)
  })

  for (const change of [
    { count: -1 }, { count: null }, { count: 1.5 }, { estimated: 'yes' },
    { scholarId: 'wrong' }, { source: 'OpenAlex' }, { sourceUrl: 'https://example.com/' },
    { citedByUrl: 'https://example.com/scholar?cites=123' }, { verifiedAt: '2026-02-30' },
  ]) {
    it(`失败时不接受无效缓存 ${JSON.stringify(change)}`, async () => {
      const result = await updateCitations({
        existingData: { ...cached, [energy.id]: { ...cached[energy.id], ...change } },
        today, fetchHtml: async () => { throw new Error('unavailable') },
      })
      assert.equal(result.failures.length, 1)
      assert.equal(result.results[energy.id], undefined)
    })
  }

  it('首次没有缓存且抓取失败时返回缺失错误', async () => {
    const result = await updateCitations({ today, fetchHtml: async () => { throw new Error('unavailable') } })
    assert.equal(result.failures.length, 2)
    assert.deepEqual(result.results, {})
  })

  it('不完整刷新不覆盖现有文件；完整刷新写入可读 JSON', async () => {
    const directory = mkdtempSync(join(tmpdir(), 'citation-test-'))
    const outputPath = join(directory, 'citations.json')
    try {
      const initial = JSON.stringify({ [energy.id]: cached[energy.id] })
      writeFileSync(outputPath, initial)
      await assert.rejects(refreshCitations({ outputPath, today, fetchHtml: async () => row(energy) }), /未覆盖/)
      assert.equal(readFileSync(outputPath, 'utf8'), initial)
      await refreshCitations({ outputPath, today, fetchHtml: async () => profile() })
      assert.equal(JSON.parse(readFileSync(outputPath, 'utf8'))[appliedEnergy.id].count, 47)
    } finally {
      rmSync(directory, { recursive: true, force: true })
    }
  })
})
