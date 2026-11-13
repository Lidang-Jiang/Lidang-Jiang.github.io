import { createI18n } from 'vue-i18n'
import { describe, expect, it } from 'vitest'
import en from './en'

describe('英文项目数量', () => {
  it.each([
    [0, '0 projects'],
    [1, '1 project'],
    [28, '28 projects'],
  ])('%i 使用正确单复数', (count, expected) => {
    const i18n = createI18n({ legacy: false, locale: 'en', messages: { en } })
    expect(i18n.global.t('projects.projectCount', { count })).toBe(expected)
  })
})
