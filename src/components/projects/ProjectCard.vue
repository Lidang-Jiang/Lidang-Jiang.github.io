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

const props = defineProps<{
  project: Project
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
</script>

<template>
  <article class="rounded-xl border border-line bg-surface">
    <!-- Header (always visible) -->
    <div class="p-5 sm:p-6">
      <div class="mb-3 flex flex-wrap items-center gap-2">
        <div class="flex items-center gap-1.5 text-xs text-muted">
          <Calendar :size="14" aria-hidden="true" />
          {{ project.period }}
        </div>
        <div
          v-if="projectType"
          class="flex items-center gap-1.5 text-xs text-muted"
        >
          <Tag :size="14" aria-hidden="true" />
          {{ t('projects.projectType') }}: {{ projectType }}
        </div>
        <div v-if="role" class="flex items-center gap-1.5 text-xs text-muted">
          <User :size="14" aria-hidden="true" />
          {{ t('projects.role') }}: {{ role }}
        </div>
        <div
          v-if="project.githubStars"
          class="flex items-center gap-1.5 text-xs text-muted"
        >
          <Star :size="14" aria-hidden="true" />
          {{ t('projects.githubStars') }}: {{ project.githubStars }}
        </div>
      </div>

      <h3 :id="titleId" class="text-lg font-semibold tracking-[-0.015em] text-ink">
        {{ title }}
      </h3>

      <p v-if="module" class="mt-1 text-sm font-medium text-accent">
        {{ module }}
      </p>

      <p class="mt-3 text-sm leading-relaxed text-muted">
        {{ background }}
      </p>

      <!-- Tech Stack -->
      <div class="mt-4 flex flex-wrap gap-1.5">
        <Badge
          v-for="tech in project.techStack"
          :key="tech"
          :label="tech"
        />
      </div>

      <!-- Links + Expand -->
      <div class="mt-4 flex flex-wrap items-center gap-2">
        <a
          v-if="project.github"
          :href="project.github"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-muted transition-colors duration-200 hover:bg-accent-soft hover:text-accent"
        >
          <Github :size="14" aria-hidden="true" />
          {{ t('projects.viewSource') }}
        </a>
        <a
          v-if="project.demo"
          :href="project.demo"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-muted transition-colors duration-200 hover:bg-accent-soft hover:text-accent"
        >
          <ExternalLink :size="14" aria-hidden="true" />
          {{ t('projects.viewDemo') }}
        </a>
        <button
          type="button"
          class="ml-auto inline-flex min-h-11 items-center gap-1 rounded-lg px-2 text-xs font-semibold text-accent transition-colors duration-200 hover:bg-accent-soft"
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

    <!-- Expandable Details -->
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
        <div class="space-y-5 p-5 sm:p-6">
          <!-- Contributions -->
          <div>
            <h4 class="mb-2 text-sm font-semibold text-ink">
              {{ t('projects.contributions') }}
            </h4>
            <ul class="space-y-2">
              <li
                v-for="(item, index) in contributions"
                :key="index"
                class="flex items-start gap-2 text-sm leading-relaxed text-muted"
              >
                <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"></span>
                {{ item }}
              </li>
            </ul>
          </div>

          <!-- Achievements -->
          <div v-if="achievements">
            <h4 class="mb-2 text-sm font-semibold text-ink">
              {{ t('projects.achievements') }}
            </h4>
            <p class="text-sm leading-relaxed text-muted">
              {{ achievements }}
            </p>
          </div>

          <!-- Pull Requests -->
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
