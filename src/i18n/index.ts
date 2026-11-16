import { createI18n } from 'vue-i18n'
import en from './en'
import zh from './zh'

export type SiteLocale = 'en' | 'zh'

export function getHomeLocale(path: string): SiteLocale | undefined {
  const normalizedPath = path.replace(/\/+$/, '') || '/'
  if (normalizedPath === '/') return 'en'
  if (normalizedPath === '/zh') return 'zh'
  return undefined
}

export function getHomePath(locale: string) {
  return locale === 'zh' ? '/zh' : '/'
}

export function createSiteI18n(path = '/') {
  return createI18n({
    legacy: false,
    locale: getHomeLocale(path) ?? 'en',
    fallbackLocale: 'en',
    messages: { en, zh },
  })
}

export function readSavedLocale(): SiteLocale | undefined {
  try {
    const saved = localStorage.getItem('lang')
    return saved === 'en' || saved === 'zh' ? saved : undefined
  } catch {
    return undefined
  }
}

export function saveLocale(locale: string) {
  try {
    localStorage.setItem('lang', locale)
  } catch {
    // 浏览器禁止存储时，仍可使用本次会话的语言。
  }
}

export type MessageSchema = typeof en
