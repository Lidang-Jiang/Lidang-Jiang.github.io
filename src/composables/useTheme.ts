import { ref, watch } from 'vue'

const isDark = ref(false)

function initTheme() {
  if (typeof window === 'undefined') return

  let stored: string | null = null
  try {
    stored = localStorage.getItem('theme')
  } catch {
    // 禁止读取存储时继续使用系统主题。
  }
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
  try {
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  } catch {
    // 禁止持久化时仍然更新当前页面。
  }
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
