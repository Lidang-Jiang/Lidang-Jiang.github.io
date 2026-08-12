import { ref, watch } from 'vue'

const isDark = ref(false)

function initTheme() {
  if (typeof window === 'undefined') return

  const stored = localStorage.getItem('theme')
  if (stored) {
    isDark.value = stored === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  applyTheme()
}

function applyTheme() {
  if (typeof document === 'undefined') return

  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  applyTheme()
}

export function useTheme() {
  if (typeof window !== 'undefined') {
    watch(isDark, applyTheme)
  }

  return {
    isDark,
    toggleTheme,
    initTheme,
  }
}
