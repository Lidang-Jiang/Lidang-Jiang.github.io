import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const lifecycle = vi.hoisted(() => ({
  mounted: [] as (() => void)[],
  unmounted: [] as (() => void)[],
}))

vi.mock('vue', async (importOriginal) => ({
  ...await importOriginal<typeof import('vue')>(),
  onMounted: (callback: () => void) => lifecycle.mounted.push(callback),
  onUnmounted: (callback: () => void) => lifecycle.unmounted.push(callback),
}))

import { useBackToTop } from './useBackToTop'

describe('全站回到顶部', () => {
  let scrollY: number
  const addEventListener = vi.fn()
  const removeEventListener = vi.fn()
  const scrollTo = vi.fn()
  const focus = vi.fn()
  const matchMedia = vi.fn()
  const getElementById = vi.fn()

  beforeEach(() => {
    lifecycle.mounted.length = 0
    lifecycle.unmounted.length = 0
    scrollY = 0
    matchMedia.mockReturnValue({ matches: false })
    getElementById.mockReturnValue({ focus })
    vi.stubGlobal('window', {
      get scrollY() { return scrollY },
      addEventListener,
      removeEventListener,
      scrollTo,
      matchMedia,
    })
    vi.stubGlobal('document', { getElementById })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.resetAllMocks()
  })

  function mount() {
    const backToTop = useBackToTop()
    lifecycle.mounted.forEach((callback) => callback())
    return backToTop
  }

  function dispatchScroll(y: number) {
    scrollY = y
    const update = addEventListener.mock.calls.find(([event]) => event === 'scroll')?.[1]
    expect(update).toBeTypeOf('function')
    update()
  }

  it('服务端初始化不访问浏览器对象，首屏按钮默认隐藏', () => {
    vi.stubGlobal('window', undefined)
    vi.stubGlobal('document', undefined)

    expect(useBackToTop().isVisible.value).toBe(false)
    expect(addEventListener).not.toHaveBeenCalled()
  })

  it('滚动超过 400px 时显示，回到阈值或顶部时隐藏', () => {
    const { isVisible } = mount()

    expect(isVisible.value).toBe(false)
    dispatchScroll(400)
    expect(isVisible.value).toBe(false)
    dispatchScroll(401)
    expect(isVisible.value).toBe(true)
    dispatchScroll(400)
    expect(isVisible.value).toBe(false)
    dispatchScroll(900)
    expect(isVisible.value).toBe(true)
    dispatchScroll(0)
    expect(isVisible.value).toBe(false)
  })

  it('挂载时读取浏览器已恢复的滚动位置', () => {
    scrollY = 720

    expect(mount().isVisible.value).toBe(true)
  })

  it('使用被动滚动监听，并在卸载时移除同一监听函数', () => {
    mount()

    expect(addEventListener).toHaveBeenCalledOnce()
    expect(addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })
    lifecycle.unmounted.forEach((callback) => callback())
    expect(removeEventListener).toHaveBeenCalledOnce()
    expect(removeEventListener).toHaveBeenCalledWith('scroll', addEventListener.mock.calls[0][1])
  })

  it('平滑回到顶部并将焦点交回正文，不额外改变滚动位置', () => {
    const { scrollToTop } = mount()

    scrollToTop()

    expect(matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)')
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
    expect(getElementById).toHaveBeenCalledWith('main-content')
    expect(focus).toHaveBeenCalledWith({ preventScroll: true })
  })

  it('每次点击都读取减少动态效果偏好，启用时立即回到顶部', () => {
    const { scrollToTop } = mount()
    scrollToTop()
    matchMedia.mockReturnValue({ matches: true })

    scrollToTop()

    expect(scrollTo).toHaveBeenLastCalledWith({ top: 0, behavior: 'instant' })
  })

  it('缺少正文焦点目标时仍然可以回到顶部', () => {
    getElementById.mockReturnValue(null)

    expect(() => mount().scrollToTop()).not.toThrow()
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
    expect(focus).not.toHaveBeenCalled()
  })
})
