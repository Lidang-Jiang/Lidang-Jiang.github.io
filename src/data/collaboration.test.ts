import { describe, expect, it } from 'vitest'

import { collaborationItemKeys } from '@/data/collaboration'
import { profile } from '@/data/profile'
import en from '@/i18n/en'
import zh from '@/i18n/zh'

describe('collaboration section content', () => {
  it('uses a public email for the homepage contact cta', () => {
    expect(profile.publicEmail).toBe('lidangjiang@gmail.com')
  })

  it('keeps homepage collaboration keys aligned with both locales', () => {
    expect(collaborationItemKeys).toEqual([
      'aiInfra',
      'embodiedAi',
      'systemsEngineering',
      'web',
    ])

    expect(Object.keys(zh.collaboration.items)).toEqual(collaborationItemKeys)
    expect(Object.keys(en.collaboration.items)).toEqual(collaborationItemKeys)

    for (const key of collaborationItemKeys) {
      expect(zh.collaboration.items[key].title).toBeTruthy()
      expect(zh.collaboration.items[key].description).toBeTruthy()
      expect(en.collaboration.items[key].title).toBeTruthy()
      expect(en.collaboration.items[key].description).toBeTruthy()
    }
  })
})
