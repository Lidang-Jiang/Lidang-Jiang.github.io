import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import 'vue'

describe('浏览器禁止存储时的主题', () => {
  const add = vi.fn()
  const remove = vi.fn()
  const matchMedia = vi.fn(() => ({ matches: true }))

  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
    vi.stubGlobal('document', { documentElement: { classList: { add, remove } } })
    vi.stubGlobal('window', { matchMedia })
  })

  afterEach(() => vi.unstubAllGlobals())

  it('读取被拒绝时使用系统主题，仍然完成初始化', async () => {
    vi.stubGlobal('localStorage', {
      getItem: () => { throw new Error('存储不可用') },
    })
    const { useTheme } = await import('./useTheme')
    const theme = useTheme()

    expect(() => theme.initTheme()).not.toThrow()
    expect(theme.isDark.value).toBe(true)
    expect(add).toHaveBeenCalledWith('dark')
  })

  it('保存被拒绝时依然切换当前主题', async () => {
    vi.stubGlobal('localStorage', {
      setItem: () => { throw new Error('存储不可用') },
    })
    const { useTheme } = await import('./useTheme')
    const theme = useTheme()

    expect(() => theme.toggleTheme()).not.toThrow()
    expect(theme.isDark.value).toBe(true)
    expect(add).toHaveBeenCalledWith('dark')
  })

  it.each(['dark', 'light'])('优先恢复保存的 %s 主题', async (saved) => {
    vi.stubGlobal('localStorage', { getItem: () => saved })
    const { useTheme } = await import('./useTheme')
    const theme = useTheme()

    theme.initTheme()

    expect(theme.isDark.value).toBe(saved === 'dark')
    expect(matchMedia).not.toHaveBeenCalled()
    expect(saved === 'dark' ? add : remove).toHaveBeenCalledWith('dark')
  })

  it('正常存储时保存切换后的主题', async () => {
    const setItem = vi.fn()
    vi.stubGlobal('localStorage', { setItem })
    const { useTheme } = await import('./useTheme')
    const theme = useTheme()

    theme.toggleTheme()
    theme.toggleTheme()

    expect(setItem).toHaveBeenNthCalledWith(1, 'theme', 'dark')
    expect(setItem).toHaveBeenNthCalledWith(2, 'theme', 'light')
    expect(remove).toHaveBeenCalledWith('dark')
  })

  it('服务端不读取浏览器对象', async () => {
    vi.stubGlobal('window', undefined)
    vi.stubGlobal('document', undefined)
    vi.stubGlobal('localStorage', undefined)
    const { useTheme } = await import('./useTheme')
    const theme = useTheme()

    expect(() => theme.initTheme()).not.toThrow()
    expect(theme.isDark.value).toBe(false)
    expect(() => theme.toggleTheme()).not.toThrow()
  })
})
