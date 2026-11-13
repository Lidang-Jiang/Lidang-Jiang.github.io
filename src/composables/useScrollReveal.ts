import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal() {
  let observer: IntersectionObserver | null = null
  let elements: Element[] = []

  const showAll = () => {
    elements.forEach((element) => element.classList.remove('reveal-pending'))
  }

  onMounted(() => {
    if (
      typeof window === 'undefined'
      || typeof IntersectionObserver === 'undefined'
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return

    elements = Array.from(document.querySelectorAll('.reveal'))

    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.remove('reveal-pending')
              observer?.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
      )

      elements.forEach((element) => {
        observer?.observe(element)
        element.classList.add('reveal-pending')
      })
    } catch {
      // 动画仅作增强，初始化失败时仍展示全部内容。
      observer?.disconnect()
      showAll()
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
    showAll()
  })
}
