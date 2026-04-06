<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import { projects } from '@/data/projects'
import {
  PROJECTS_OVERVIEW_PATH,
  PROJECT_CATEGORY_NAV_ITEMS,
  getProjectCategoryBySlug,
  getProjectCategoryPath,
  getProjectGroupBySlug,
  getProjectGroups,
  isProjectCategorySlug,
} from '@/utils/project-groups'

const { t, locale } = useI18n()
const route = useRoute()

const lang = computed(() => locale.value as 'en' | 'zh')
const activeCategorySlug = computed(() => {
  const slug = route.params.categorySlug

  return typeof slug === 'string' && isProjectCategorySlug(slug) ? slug : null
})

const activeCategory = computed(() =>
  activeCategorySlug.value
    ? getProjectCategoryBySlug(activeCategorySlug.value)
    : null,
)
const projectGroups = computed(() => getProjectGroups(projects))
const projectGroupByCategoryEn = computed(
  () =>
    new Map(
      projectGroups.value.map((group) => [group.category.en, group] as const),
    ),
)
const categoryCards = computed(() =>
  PROJECT_CATEGORY_NAV_ITEMS.map((item) => ({
    ...item,
    path: getProjectCategoryPath(item.slug),
    projectCount:
      projectGroupByCategoryEn.value.get(item.category.en)?.projects.length ?? 0,
  })),
)
const activeGroup = computed(() =>
  activeCategorySlug.value
    ? getProjectGroupBySlug(projects, activeCategorySlug.value)
    : null,
)
const isOverview = computed(() => activeCategorySlug.value === null)

const activeFilterClasses =
  'border-primary-200 bg-primary-50 text-primary-700 shadow-sm dark:border-primary-800/60 dark:bg-primary-900/30 dark:text-primary-300'
const inactiveFilterClasses =
  'border-gray-200 bg-white text-gray-600 hover:border-primary-200 hover:text-primary-600 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:border-primary-800/60 dark:hover:text-primary-300'
</script>

<template>
  <div class="py-16 sm:py-20">
    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <SectionTitle
        :title="t('projects.title')"
        :subtitle="t('projects.subtitle')"
      />

      <div class="space-y-10">
        <section class="space-y-4">
          <h2 class="text-xs font-semibold uppercase tracking-[0.16em] text-primary-600 dark:text-primary-400">
            {{ t('projects.browseByType') }}
          </h2>

          <div class="flex flex-wrap gap-2">
            <router-link
              :to="PROJECTS_OVERVIEW_PATH"
              class="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
              :class="isOverview ? activeFilterClasses : inactiveFilterClasses"
            >
              {{ t('projects.allCategories') }}
            </router-link>

            <router-link
              v-for="item in categoryCards"
              :key="item.slug"
              :to="item.path"
              class="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
              :class="activeCategory?.slug === item.slug ? activeFilterClasses : inactiveFilterClasses"
            >
              <span>{{ item.category[lang] }}</span>
              <span class="rounded-full bg-black/5 px-2 py-0.5 text-[11px] font-semibold dark:bg-white/10">
                {{ item.projectCount }}
              </span>
            </router-link>
          </div>
        </section>

        <section v-if="isOverview" class="space-y-6">
          <h2 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
            {{ t('projects.categoryOverview') }}
          </h2>

          <div class="grid gap-4 sm:grid-cols-2">
            <router-link
              v-for="item in categoryCards"
              :key="item.slug"
              :to="item.path"
              class="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-primary-800/60"
            >
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                    {{ item.category[lang] }}
                  </h3>
                  <p class="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {{ t('projects.projectCount', { count: item.projectCount }) }}
                  </p>
                </div>

                <span class="inline-flex min-w-10 justify-center rounded-full bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                  {{ item.projectCount }}
                </span>
              </div>

              <div class="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 transition-colors group-hover:text-primary-700 dark:text-primary-400 dark:group-hover:text-primary-300">
                {{ t('projects.exploreCategory') }}
                <ArrowRight :size="16" />
              </div>
            </router-link>
          </div>
        </section>

        <section v-else-if="activeGroup" class="space-y-6">
          <div class="space-y-2">
            <h2 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
              {{ activeGroup.category[lang] }}
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ t('projects.projectCount', { count: activeGroup.projects.length }) }}
            </p>
          </div>

          <div class="space-y-6">
            <ProjectCard
              v-for="project in activeGroup.projects"
              :key="project.id"
              :project="project"
            />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
