import { describe, expect, it, vi } from 'vitest'

import {
  parseImpactFactorHtml,
  updateImpactFactors,
} from './fetch-impact-factors.mjs'

describe('parseImpactFactorHtml', () => {
  it('extracts realtime and jcr impact factors from LetPub HTML', () => {
    const html = `
      <table>
        <tr><td>实时影响因子</td><TD>截止2026年1月20日：9.3</TD></tr>
        <tr><td>最新影响因子</td><TD>9.4</TD></tr>
      </table>
    `

    expect(parseImpactFactorHtml(html)).toEqual({
      realtimeIF: 9.3,
      jcrIF: 9.4,
    })
  })

  it('keeps the remaining field when one impact factor is missing', () => {
    const html = `
      <table>
        <tr><td>最新影响因子</td><TD>11.0</TD></tr>
      </table>
    `

    expect(parseImpactFactorHtml(html)).toEqual({
      realtimeIF: null,
      jcrIF: 11,
    })
  })
})

describe('updateImpactFactors', () => {
  const journals = [
    { issn: '0360-5442', journalId: 2496, name: 'Energy' },
    { issn: '0306-2619', journalId: 729, name: 'Applied Energy' },
  ]

  it('retries transient failures and writes refreshed data', async () => {
    const fetchJournalData = vi
      .fn()
      .mockRejectedValueOnce(new Error('socket closed'))
      .mockRejectedValueOnce(new Error('socket closed again'))
      .mockResolvedValue({
        realtimeIF: 9.5,
        jcrIF: 9.4,
      })

    const result = await updateImpactFactors({
      journals: [journals[0]],
      existingData: {},
      fetchJournalData,
      today: '2026-04-20',
      retryDelayMs: 0,
    })

    expect(fetchJournalData).toHaveBeenCalledTimes(3)
    expect(result.results).toEqual({
      '0360-5442': {
        realtimeIF: 9.5,
        jcrIF: 9.4,
        updatedAt: '2026-04-20',
      },
    })
    expect(result.warnings).toEqual([])
    expect(result.failures).toEqual([])
  })

  it('keeps the previous entry when refresh fails but cached data exists', async () => {
    const fetchJournalData = vi.fn().mockRejectedValue(new Error('timeout'))

    const result = await updateImpactFactors({
      journals: [journals[0]],
      existingData: {
        '0360-5442': {
          realtimeIF: 9.3,
          jcrIF: 9.4,
          updatedAt: '2026-04-13',
        },
      },
      fetchJournalData,
      today: '2026-04-20',
      retryDelayMs: 0,
    })

    expect(result.results).toEqual({
      '0360-5442': {
        realtimeIF: 9.3,
        jcrIF: 9.4,
        updatedAt: '2026-04-13',
      },
    })
    expect(result.failures).toEqual([])
    expect(result.warnings).toEqual([
      'Using cached impact factors for Energy after refresh failed: timeout',
    ])
  })

  it('fails when a journal has neither fresh data nor cached data', async () => {
    const fetchJournalData = vi.fn().mockResolvedValue({
      realtimeIF: null,
      jcrIF: null,
    })

    const result = await updateImpactFactors({
      journals: [journals[1]],
      existingData: {},
      fetchJournalData,
      today: '2026-04-20',
      retryDelayMs: 0,
    })

    expect(result.results).toEqual({})
    expect(result.warnings).toEqual([])
    expect(result.failures).toEqual([
      'Missing impact factor data for Applied Energy: no impact factor fields found',
    ])
  })
})
