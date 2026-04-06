import type { RouteRecordRaw } from 'vue-router'
import { isProjectCategorySlug } from '@/utils/project-groups'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/cv',
    name: 'cv',
    component: () => import('@/views/CvView.vue'),
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/views/ProjectsView.vue'),
  },
  {
    path: '/projects/:categorySlug',
    name: 'project-category',
    component: () => import('@/views/ProjectsView.vue'),
    beforeEnter: (to) => {
      const slug = to.params.categorySlug
      return typeof slug === 'string' && isProjectCategorySlug(slug)
        ? true
        : { name: 'projects' }
    },
  },
  {
    path: '/publications',
    name: 'publications',
    component: () => import('@/views/PublicationsView.vue'),
  },
]
