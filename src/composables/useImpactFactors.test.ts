import { describe, expect, it, vi } from 'vitest'
import { useImpactFactors } from './useImpactFactors'

vi.mock('@/data/impact-factors.json', () => ({
  default: {
    '0360-5442': { realtimeIF: 5.981, jcrIF: 10.1 },
    '0306-2619': { realtimeIF: 8.415, jcrIF: 12.2 },
    estimate: { realtimeIF: 6.5, jcrIF: null },
    missing: { realtimeIF: null, jcrIF: null },
    zero: { realtimeIF: 1.2, jcrIF: 0 },
  },
}))

describe('useImpactFactors', () => {
  it('展示 JCR 影响因子，不使用实时估算覆盖', () => {
    const { impactFactors } = useImpactFactors(['0360-5442', '0306-2619'])

    expect([...impactFactors.value]).toEqual([
      ['0360-5442', 10.1],
      ['0306-2619', 12.2],
    ])
  })

  it('不把仅有的实时估算作为正式 IF，允许页面使用已有回退值', () => {
    const { impactFactors } = useImpactFactors(['estimate', 'missing', 'unknown'])

    expect(impactFactors.value.size).toBe(0)
  })

  it('保留有效的零值并且只返回请求的期刊', () => {
    expect([...useImpactFactors(['zero']).impactFactors.value]).toEqual([['zero', 0]])
    expect(useImpactFactors([]).impactFactors.value.size).toBe(0)
  })
})
