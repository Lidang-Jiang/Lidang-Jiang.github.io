<script setup lang="ts">
import { ArrowRight, LayoutGrid, List } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import ProjectTimeline from '@/components/projects/ProjectTimeline.vue'
import { projects } from '@/data/projects'
import {
  PROJECTS_OVERVIEW_PATH,
  PROJECT_CATEGORIES_PATH,
  PROJECT_CATEGORY_NAV_ITEMS,
  getProjectCategoryPath,
  getProjectGroupBySlug,
  getProjectGroups,
} from '@/utils/project-groups'
import { getProjectTimeline } from '@/utils/project-timeline'

const { t, locale } = useI18n()
const route = useRoute()
const lang = computed(() => locale.value as 'en' | 'zh')
const isTimeline = computed(() => route.name === 'projects')
const activeSlug = computed(() =>
  typeof route.params.categorySlug === 'string' ? route.params.categorySlug : null,
)
const activeGroup = computed(() => activeSlug.value
  ? getProjectGroupBySlug(projects, activeSlug.value)
  : null,
)
const groups = getProjectGroups(projects)
const timeline = getProjectTimeline(projects)
const categoryCards = PROJECT_CATEGORY_NAV_ITEMS.map((item) => ({
  ...item,
  path: getProjectCategoryPath(item.slug),
  count: groups.find((group) => group.category.en === item.category.en)?.projects.length ?? 0,
}))
const activeMode = 'bg-surface text-ink shadow-[0_1px_4px_rgb(0_0_0/8%)]'
const inactiveMode = 'text-muted hover:text-ink'
</script>

<template>
  <div class="py-14 sm:py-20">
    <div class="site-shell">
      <header class="mb-10 sm:mb-14">
        <h1 class="page-heading max-w-4xl">{{ t('projects.title') }}</h1>
        <p class="page-intro mt-5">{{ t('projects.subtitle') }}</p>
        <nav
          :aria-label="t('projects.views')"
          class="mt-8 inline-flex max-w-full gap-1 rounded-full border border-line bg-line/35 p-1"
        >
          <router-link
            :to="PROJECTS_OVERVIEW_PATH"
            :aria-current="isTimeline ? 'page' : undefined"
            class="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors"
            :class="isTimeline ? activeMode : inactiveMode"
          >
            <List :size="16" aria-hidden="true" />
            {{ t('projects.timeline') }}
          </router-link>
          <router-link
            :to="PROJECT_CATEGORIES_PATH"
            :aria-current="!isTimeline ? 'page' : undefined"
            class="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors"
            :class="!isTimeline ? activeMode : inactiveMode"
          >
            <LayoutGrid :size="16" aria-hidden="true" />
            {{ t('projects.categories') }}
          </router-link>
        </nav>
      </header>

      <div v-if="isTimeline">
        <p class="mb-8 border-t border-line pt-6 text-sm text-muted">
          {{ t('projects.timelineDescription') }}
        </p>
        <ProjectTimeline :groups="timeline" />
      </div>

      <div v-else class="space-y-10">
        <nav :aria-label="t('projects.browseByType')" class="flex flex-wrap gap-2 border-t border-line pt-6">
          <router-link
            :to="PROJECT_CATEGORIES_PATH"
            class="inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm transition-colors"
            :class="!activeSlug ? 'border-accent bg-accent-soft text-accent' : 'border-line text-muted hover:text-ink'"
          >
            {{ t('projects.allCategories') }}
          </router-link>
          <router-link
            v-for="item in categoryCards"
            :key="item.slug"
            :to="item.path"
            class="inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors"
            :class="activeSlug === item.slug ? 'border-accent bg-accent-soft text-accent' : 'border-line text-muted hover:text-ink'"
          >
            <span>{{ item.category[lang] }}</span>
            <span class="text-xs tabular-nums">{{ item.count }}</span>
          </router-link>
        </nav>

        <section v-if="!activeGroup">
          <h2 class="mb-6 text-2xl font-semibold tracking-[-0.025em] text-ink">
            {{ t('projects.categoryOverview') }}
          </h2>
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <router-link
              v-for="item in categoryCards"
              :key="item.slug"
              :to="item.path"
              class="group flex flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent/40 sm:p-8"
            >
              <p class="text-sm text-muted">{{ t('projects.projectCount', { count: item.count }) }}</p>
              <h3 class="mt-4 text-xl font-semibold leading-snug tracking-[-0.02em] text-ink sm:text-2xl">
                {{ item.category[lang] }}
              </h3>
              <span class="mt-auto inline-flex min-h-11 items-center gap-2 pt-6 text-sm font-medium text-accent">
                {{ t('projects.exploreCategory') }}
                <ArrowRight :size="16" aria-hidden="true" />
              </span>
            </router-link>
          </div>
        </section>

        <section v-else :key="activeSlug ?? ''" class="space-y-6">
          <div class="space-y-3">
            <h2 class="text-2xl font-semibold tracking-[-0.025em] text-ink sm:text-3xl">
              {{ activeGroup.category[lang] }}
            </h2>
            <p class="text-sm text-muted">{{ t('projects.projectCount', { count: activeGroup.projects.length }) }}</p>
          </div>
          <div class="space-y-5">
            <ProjectCard v-for="project in activeGroup.projects" :key="project.id" :project="project" />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
