import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  JOURNALS,
  fetchJournalData,
  fetchJournalHtml,
  parseImpactFactorHtml,
  updateImpactFactors,
} from './fetch-impact-factors.mjs'

const energy = {
  issn: '0360-5442',
  name: 'Energy',
  url: 'https://shop.elsevier.com/journals/energy/0360-5442',
}
const appliedEnergy = {
  issn: '0306-2619',
  name: 'Applied Energy',
  url: 'https://shop.elsevier.com/journals/applied-energy/0306-2619',
}

function officialHtml(value, journal = energy) {
  return `<main><h1>${journal.name}</h1><ul>
    <li><span>ISSN: ${journal.issn}</span></li>
    <li><span>5 Year impact factor: 9.5</span></li>
    <li><span>Impact factor: ${value}</span></li>
    <li><span>CiteScore: 17.1</span></li>
  </ul></main>`
}

function freshEntry(jcrIF, journal = energy) {
  return { realtimeIF: null, jcrIF, jcrYear: null, jcrSource: journal.url }
}

const cached = {
  ...freshEntry(10.1),
  realtimeIF: 5.981,
  verifiedAt: '2026-11-13',
  updatedAt: '2026-11-13',
}

describe('parseImpactFactorHtml', () => {
  it('仅从匹配期刊的官方页面解析普通 IF', () => {
    assert.deepEqual(parseImpactFactorHtml(officialHtml(10.1), energy), freshEntry(10.1))
    assert.deepEqual(
      parseImpactFactorHtml(officialHtml(12.2, appliedEnergy), appliedEnergy),
      freshEntry(12.2, appliedEnergy),
    )
  })

  it('允许指标次序变化、标签大小写、空白、嵌套元素和相同指标重复', () => {
    const html = `<h1>Energy</h1><ul>
      <li><span>IMPACT FACTOR:</span><b>&nbsp;8.8</b></li>
      <li>5 Year impact factor: 99</li>
      <li>CiteScore: 88</li><li>ISSN: 0360-5442</li>
      <li><div>Impact factor: 8.8</div></li>
    </ul>`
    assert.deepEqual(parseImpactFactorHtml(html, energy), freshEntry(8.8))
  })

  it('接受有效的零值', () => {
    assert.equal(parseImpactFactorHtml(officialHtml(0), energy).jcrIF, 0)
  })

  for (const label of ['5 Year impact factor', 'CiteScore', 'Estimated Impact factor']) {
    it(`不会用 ${label} 冒充正式 IF`, () => {
      assert.throws(
        () => parseImpactFactorHtml(officialHtml(10.1).replace('Impact factor:', label + ':'), energy),
        /impact factor/i,
      )
    })
  }

  for (const value of ['', 'N/A', 'NaN', 'Infinity', '-1', '10.1abc', '10,1', '2025年需登录']) {
    it(`拒绝无效 IF：${value || '空值'}`, () => {
      assert.throws(() => parseImpactFactorHtml(officialHtml(value), energy), /impact factor/i)
    })
  }

  it('缺失、错误或相互冲突的 ISSN 均拒绝', () => {
    for (const html of [
      officialHtml(10.1).replace('ISSN: 0360-5442', ''),
      officialHtml(10.1).replace('0360-5442', '0306-2619'),
      officialHtml(10.1) + '<li>ISSN: 0306-2619</li>',
    ]) {
      assert.throws(() => parseImpactFactorHtml(html, energy), /ISSN/)
    }
  })

  it('拒绝登录页、错误期刊标题和互相冲突的 IF', () => {
    assert.throws(() => parseImpactFactorHtml('<h1>Sign in</h1>', energy))
    assert.throws(() => parseImpactFactorHtml(officialHtml(10.1, appliedEnergy), energy))
    assert.throws(
      () => parseImpactFactorHtml(officialHtml(10.1) + '<li>Impact factor: 8.8</li>', energy),
      /impact factor/i,
    )
  })

  it('忽略脚本和注释中的指标，不跨越标签或列表项拼接数字', () => {
    const html = `<h1>Energy</h1><li>ISSN: 0360-5442</li>
      <script>const html = '<li>Impact factor: 99</li>'</script>
      <!-- <li>Impact factor: 99</li> -->
      <li>Impact factor:</li><li>10.1</li>`
    assert.throws(() => parseImpactFactorHtml(html, energy), /impact factor/i)
  })

  it('不接受 LetPub 的实时估算页面', () => {
    const html = '<tr><td>实时影响因子</td><td>截止2026年9月20日：5.981</td></tr>'
    assert.throws(() => parseImpactFactorHtml(html, energy))
  })
})

describe('fetchJournalData', () => {
  it('配置只指向已核实的 Elsevier 官方期刊页', () => {
    assert.deepEqual(JOURNALS, [energy, appliedEnergy])
  })

  it('HTTP 抓取验证官方地址并设置失败状态和超时处理', async () => {
    let calls = 0
    const entry = await fetchJournalData(energy, {
      timeoutSeconds: 0.001,
      execFile: async (command, args) => {
        calls += 1
        assert.equal(command, 'curl')
        assert.equal(args.at(-1), energy.url)
        assert.ok(args.includes('--fail'))
        assert.equal(args[args.indexOf('--max-time') + 1], '0.001')
        return { stdout: officialHtml(10.1) }
      },
    })
    assert.equal(calls, 1)
    assert.deepEqual(entry, freshEntry(10.1))
  })

  it('保留 curl 超时原因供重试和缓存警告使用', async () => {
    await assert.rejects(fetchJournalHtml(energy, {
      timeoutSeconds: 0.001,
      execFile: async () => {
        throw Object.assign(new Error('failed'), { stderr: 'curl: (28) timeout' })
      },
    }), /curl: \(28\) timeout/)
  })
})

describe('updateImpactFactors', () => {
  for (const jcrIF of [12.2, 8.8, 0]) {
    it(`官方新值 ${jcrIF} 替换已核实快照并更新来源和日期`, async () => {
      const result = await updateImpactFactors({
        journals: [energy],
        existingData: { [energy.issn]: cached },
        fetchJournalData: async () => freshEntry(jcrIF),
        today: '2026-11-20',
        retryDelayMs: 0,
      })
      assert.deepEqual(result.results[energy.issn], {
        ...freshEntry(jcrIF),
        verifiedAt: '2026-11-20',
        updatedAt: '2026-11-20',
      })
      assert.equal(cached.jcrIF, 10.1)
      assert.deepEqual(result.warnings, [])
      assert.deepEqual(result.failures, [])
    })
  }

  it('两次官方响应不同，第二次仍会重新解析并更新', async () => {
    let calls = 0
    const fetchJournalDataImpl = async () => {
      calls += 1
      return parseImpactFactorHtml(officialHtml(calls === 1 ? 10.1 : 9.8), energy)
    }
    const first = await updateImpactFactors({
      journals: [energy],
      fetchJournalData: fetchJournalDataImpl,
      today: '2026-11-13',
      retryDelayMs: 0,
    })
    const second = await updateImpactFactors({
      journals: [energy],
      existingData: first.results,
      fetchJournalData: fetchJournalDataImpl,
      today: '2026-11-20',
      retryDelayMs: 0,
    })
    assert.equal(calls, 2)
    assert.equal(first.results[energy.issn].jcrIF, 10.1)
    assert.equal(second.results[energy.issn].jcrIF, 9.8)
    assert.equal(second.results[energy.issn].verifiedAt, '2026-11-20')
    assert.equal(second.results[energy.issn].jcrYear, null)
  })

  it('超时重试成功后采用官方新值', async () => {
    let calls = 0
    const result = await updateImpactFactors({
      journals: [energy],
      fetchJournalData: async () => {
        calls += 1
        if (calls < 3) throw new Error('timeout')
        return freshEntry(10.1)
      },
      today: '2026-11-20',
      retryDelayMs: 0,
    })
    assert.equal(calls, 3)
    assert.equal(result.results[energy.issn].jcrIF, 10.1)
    assert.equal(result.results[energy.issn].verifiedAt, '2026-11-20')
    assert.deepEqual(result.failures, [])
  })

  for (const failure of ['timeout', 'ISSN mismatch', 'invalid impact factor']) {
    it(`${failure} 时完整保留上次已核实数据及日期，并明确警告`, async () => {
      const result = await updateImpactFactors({
        journals: [energy],
        existingData: { [energy.issn]: cached },
        fetchJournalData: async () => { throw new Error(failure) },
        today: '2026-11-20',
        retryDelayMs: 0,
      })
      assert.deepEqual(result.results, { [energy.issn]: cached })
      assert.deepEqual(result.failures, [])
      assert.equal(result.warnings.length, 1)
      assert.ok(result.warnings[0].includes(failure))
    })
  }

  for (const entry of [
    { realtimeIF: 99, jcrIF: null },
    freshEntry(NaN),
    freshEntry(Infinity),
    freshEntry(-1),
    { ...freshEntry(10.1), jcrSource: 'https://www.letpub.com.cn/' },
  ]) {
    it(`不会用无效或非官方数据覆盖缓存：${String(entry.jcrIF)} / ${entry.jcrSource}`, async () => {
      const result = await updateImpactFactors({
        journals: [energy],
        existingData: { [energy.issn]: cached },
        fetchJournalData: async () => entry,
        today: '2026-11-20',
        retries: 1,
      })
      assert.deepEqual(result.results, { [energy.issn]: cached })
      assert.equal(result.warnings.length, 1)
    })
  }

  for (const existingEntry of [
    undefined,
    { realtimeIF: 5.981, jcrIF: null },
    { ...cached, jcrSource: 'https://www.letpub.com.cn/' },
    { ...cached, jcrIF: NaN },
    { ...cached, verifiedAt: undefined },
  ]) {
    it('首次无有效官方数据不能使用估算或未核实缓存顶替', async () => {
      const result = await updateImpactFactors({
        journals: [energy],
        existingData: { [energy.issn]: existingEntry },
        fetchJournalData: async () => { throw new Error('timeout') },
        retries: 1,
      })
      assert.deepEqual(result.results, {})
      assert.equal(result.failures.length, 1)
      assert.deepEqual(result.warnings, [])
    })
  }
})
