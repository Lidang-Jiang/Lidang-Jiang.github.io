import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const lifecycle = vi.hoisted(() => ({
  mounted: [] as (() => void)[],
  unmounted: [] as (() => void)[],
}))

vi.mock('vue', () => ({
  onMounted: (callback: () => void) => lifecycle.mounted.push(callback),
  onUnmounted: (callback: () => void) => lifecycle.unmounted.push(callback),
}))

import { useScrollReveal } from './useScrollReveal'

function createElement() {
  const classes = new Set<string>()
  return {
    classList: {
      add: (value: string) => classes.add(value),
      remove: (value: string) => classes.delete(value),
      contains: (value: string) => classes.has(value),
    },
  }
}

describe('渐进增强的滚动显示', () => {
  let elements: ReturnType<typeof createElement>[]
  let intersect: IntersectionObserverCallback
  const observe = vi.fn()
  const unobserve = vi.fn()
  const disconnect = vi.fn()

  beforeEach(() => {
    lifecycle.mounted.length = 0
    lifecycle.unmounted.length = 0
    elements = [createElement(), createElement()]
    vi.stubGlobal('window', { matchMedia: vi.fn(() => ({ matches: false })) })
    vi.stubGlobal('document', { querySelectorAll: () => elements })
    vi.stubGlobal('IntersectionObserver', class {
      observe = observe
      unobserve = unobserve
      disconnect = disconnect
      constructor(callback: IntersectionObserverCallback) {
        intersect = callback
      }
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  function mount() {
    useScrollReveal()
    lifecycle.mounted.forEach((callback) => callback())
  }

  it('只在观察器成功接管后启用入场状态，进入视口后恢复可见', () => {
    mount()
    expect(observe).toHaveBeenCalledTimes(2)
    expect(elements[0].classList.contains('reveal-pending')).toBe(true)

    intersect([
      { target: elements[0], isIntersecting: false },
      { target: elements[1], isIntersecting: true },
    ] as unknown as IntersectionObserverEntry[], {} as IntersectionObserver)

    expect(elements[0].classList.contains('reveal-pending')).toBe(true)
    expect(elements[1].classList.contains('reveal-pending')).toBe(false)
    expect(unobserve).toHaveBeenCalledWith(elements[1])
  })

  it('不支持观察器时保持内容可见', () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    expect(mount).not.toThrow()
    expect(elements.every((element) => !element.classList.contains('reveal-pending'))).toBe(true)
  })

  it('用户减少动态效果时不启用滚动动画', () => {
    vi.stubGlobal('window', { matchMedia: () => ({ matches: true }) })
    mount()
    expect(observe).not.toHaveBeenCalled()
  })

  it('观察器初始化失败时恢复所有内容', () => {
    observe.mockImplementationOnce(() => {}).mockImplementationOnce(() => {
      throw new Error('observer unavailable')
    })
    expect(mount).not.toThrow()
    expect(elements.every((element) => !element.classList.contains('reveal-pending'))).toBe(true)
    expect(disconnect).toHaveBeenCalled()
  })

  it('离开页面时断开观察器并清除未完成的动画状态', () => {
    mount()
    lifecycle.unmounted.forEach((callback) => callback())
    expect(disconnect).toHaveBeenCalledOnce()
    expect(elements.every((element) => !element.classList.contains('reveal-pending'))).toBe(true)
  })
})
