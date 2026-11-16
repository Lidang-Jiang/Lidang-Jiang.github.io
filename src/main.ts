import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'
import { createSiteI18n } from './i18n'
import { getProjectCategoryPaths } from './utils/project-groups'
import './assets/styles/main.css'

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, isClient, routePath }) => {
    app.use(createSiteI18n(routePath))

    if (isClient) {
      // GA4 页面访问统计。
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
