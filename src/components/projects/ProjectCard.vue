<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  ChevronDown,
  ChevronUp,
  Github,
  ExternalLink,
  Calendar,
  User,
  Tag,
  Star,
} from 'lucide-vue-next'
import Badge from '@/components/ui/Badge.vue'
import { useDisclosure } from '@/composables/useDisclosure'
import type { Project } from '@/types/project'
import { PROJECT_CATEGORY_NAV_ITEMS, getProjectCategoryPath } from '@/utils/project-groups'
import { formatProjectPeriod } from '@/utils/project-timeline'

const props = defineProps<{
  project: Project
  timeline?: boolean
}>()

const { t, locale } = useI18n()

const lang = computed(() => locale.value as 'en' | 'zh')
const { isOpen: expanded, toggle } = useDisclosure()

const title = computed(() => props.project.title[lang.value])
const background = computed(() => props.project.background[lang.value])
const contributions = computed(() => props.project.contributions[lang.value])
const achievements = computed(() => props.project.achievements?.[lang.value])
const projectType = computed(() => props.project.projectType?.[lang.value])
const role = computed(() => props.project.role?.[lang.value])
const module = computed(() => props.project.module?.[lang.value])
const pullRequests = computed(() => props.project.pullRequests ?? [])
const titleId = computed(() => `project-title-${props.project.id}`)
const detailsId = computed(() => `project-details-${props.project.id}`)
const period = computed(() => formatProjectPeriod(props.project.period, t('projects.present')))
const category = computed(() => PROJECT_CATEGORY_NAV_ITEMS.find(
  (item) => item.category.en === props.project.category?.en,
))
</script>

<template>
  <article class="min-w-0 rounded-2xl border border-line bg-surface">
    <!-- 首部始终展示，详细贡献可按需展开。 -->
    <div class="p-5 sm:p-7">
      <div class="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <router-link
          v-if="timeline && category"
          :to="getProjectCategoryPath(category.slug)"
          class="inline-flex min-h-11 items-center text-[13px] font-medium leading-relaxed text-accent hover:underline"
        >
          {{ category.category[lang] }}
        </router-link>
        <div
          class="flex items-center gap-1.5 text-[13px] text-muted tabular-nums"
          :class="{ 'md:hidden': timeline }"
        >
          <Calendar :size="14" aria-hidden="true" />
          {{ period }}
        </div>
        <div
          v-if="projectType"
          class="flex items-start gap-1.5 text-[13px] text-muted"
        >
          <Tag :size="14" class="mt-1 shrink-0" aria-hidden="true" />
          {{ t('projects.projectType') }}: {{ projectType }}
        </div>
        <div v-if="role" class="flex items-start gap-1.5 text-[13px] text-muted">
          <User :size="14" class="mt-1 shrink-0" aria-hidden="true" />
          {{ t('projects.role') }}: {{ role }}
        </div>
        <div
          v-if="project.githubStars"
          class="flex items-center gap-1.5 text-[13px] text-muted"
        >
          <Star :size="14" aria-hidden="true" />
          {{ t('projects.githubStars') }}: {{ project.githubStars }}
        </div>
      </div>

      <h3 :id="titleId" class="break-words text-xl font-semibold leading-snug tracking-[-0.025em] text-ink sm:text-2xl">
        {{ title }}
      </h3>

      <p v-if="module" class="mt-3 text-sm font-medium leading-relaxed text-ink">
        {{ module }}
      </p>

      <p class="mt-4 text-base leading-relaxed text-muted">
        {{ background }}
      </p>

      <!-- 技术栈保持完整展示。 -->
      <div class="mt-5 flex flex-wrap gap-1.5">
        <Badge
          v-for="tech in project.techStack"
          :key="tech"
          :label="tech"
        />
      </div>

      <!-- 外链与展开操作。 -->
      <div class="mt-5 flex flex-wrap items-center gap-2">
        <a
          v-if="project.github"
          :href="project.github"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-[13px] font-medium text-muted transition-colors duration-200 hover:bg-accent-soft hover:text-accent"
        >
          <Github :size="14" aria-hidden="true" />
          {{ t('projects.viewSource') }}
        </a>
        <a
          v-if="project.demo"
          :href="project.demo"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-[13px] font-medium text-muted transition-colors duration-200 hover:bg-accent-soft hover:text-accent"
        >
          <ExternalLink :size="14" aria-hidden="true" />
          {{ t('projects.viewDemo') }}
        </a>
        <button
          type="button"
          class="ml-auto inline-flex min-h-11 items-center gap-1 rounded-lg px-2 text-[13px] font-semibold text-accent transition-colors duration-200 hover:bg-accent-soft"
          :aria-expanded="expanded"
          :aria-controls="detailsId"
          @click="toggle"
        >
          {{ expanded ? t('projects.showLess') : t('projects.showMore') }}
          <ChevronUp v-if="expanded" :size="14" aria-hidden="true" />
          <ChevronDown v-else :size="14" aria-hidden="true" />
        </button>
      </div>
    </div>

    <!-- 详情沿用可访问的展开关系。 -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <div
        v-show="expanded"
        :id="detailsId"
        role="region"
        :aria-labelledby="titleId"
        class="border-t border-line"
      >
        <div class="space-y-6 p-5 sm:p-7">
          <!-- 核心贡献。 -->
          <div>
            <h4 class="mb-2 text-sm font-semibold text-ink">
              {{ t('projects.contributions') }}
            </h4>
            <ul class="space-y-2">
              <li
                v-for="(item, index) in contributions"
                :key="index"
                class="flex items-start gap-2 text-base leading-relaxed text-muted"
              >
                <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"></span>
                {{ item }}
              </li>
            </ul>
          </div>

          <!-- 项目成果。 -->
          <div v-if="achievements">
            <h4 class="mb-2 text-sm font-semibold text-ink">
              {{ t('projects.achievements') }}
            </h4>
            <p class="text-base leading-relaxed text-muted">
              {{ achievements }}
            </p>
          </div>

          <!-- 开源贡献链接。 -->
          <div v-if="pullRequests.length">
            <h4 class="mb-2 text-sm font-semibold text-ink">
              {{ t('projects.pullRequests') }}
            </h4>
            <div class="flex flex-wrap gap-2">
              <a
                v-for="pullRequest in pullRequests"
                :key="pullRequest.url"
                :href="pullRequest.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs font-medium text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                <ExternalLink :size="12" aria-hidden="true" />
                PR #{{ pullRequest.number }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </article>
</template>
