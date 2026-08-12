import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'
import { i18n } from './i18n'
import { getProjectCategoryPaths } from './utils/project-groups'
import './assets/styles/main.css'

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, isClient }) => {
    app.use(i18n)

    if (isClient) {
      // Restore language preference
      const savedLang = localStorage.getItem('lang')
      if (savedLang && (savedLang === 'en' || savedLang === 'zh')) {
        i18n.global.locale.value = savedLang
      }

      // GA4 page view tracking
      router.afterEach((to) => {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
          window.gtag('config', 'G-QD3Z5S371D', {
            page_path: to.fullPath,
          })
        }
      })
    }
  },
)

export function includedRoutes(_paths: string[], routes: { name?: unknown; path: string }[]) {
  return routes.flatMap((route) => {
    if (route.name === 'project-category') {
      return getProjectCategoryPaths()
    }

    return route.path
  })
}
