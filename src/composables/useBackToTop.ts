import { onMounted, onUnmounted, ref } from 'vue'

export function useBackToTop() {
  const isVisible = ref(false)

  function updateVisibility() {
    isVisible.value = window.scrollY > 400
  }

  function scrollToTop() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('main-content')?.focus({ preventScroll: true })
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' })
  }

  onMounted(() => {
    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateVisibility)
  })

  return { isVisible, scrollToTop }
}
