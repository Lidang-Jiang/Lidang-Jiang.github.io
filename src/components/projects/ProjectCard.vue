<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ChevronDown, ChevronUp, Github, ExternalLink, Calendar, User } from 'lucide-vue-next'
import Badge from '@/components/ui/Badge.vue'
import type { Project } from '@/types/project'

const props = defineProps<{
  project: Project
}>()

const { t, locale } = useI18n()

const lang = computed(() => locale.value as 'en' | 'zh')
const expanded = ref(false)

const title = computed(() => props.project.title[lang.value])
const background = computed(() => props.project.background[lang.value])
const contributions = computed(() => props.project.contributions[lang.value])
const achievements = computed(() => props.project.achievements?.[lang.value])
const role = computed(() => props.project.role?.[lang.value])
const module = computed(() => props.project.module?.[lang.value])
</script>

<template>
  <article class="group rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50">
    <!-- Header (always visible) -->
    <div class="p-6">
      <div class="mb-3 flex flex-wrap items-center gap-2">
        <div class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Calendar :size="14" />
          {{ project.period }}
        </div>
        <div v-if="role" class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <User :size="14" />
          {{ role }}
        </div>
      </div>

      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        {{ title }}
      </h3>

      <p v-if="module" class="mt-1 text-sm text-primary-600 dark:text-primary-400">
        {{ module }}
      </p>

      <p class="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
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
      <div class="mt-4 flex items-center gap-3">
        <a
          v-if="project.github"
          :href="project.github"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 text-xs text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
        >
          <Github :size="14" />
          {{ t('projects.viewSource') }}
        </a>
        <a
          v-if="project.demo"
          :href="project.demo"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 text-xs text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
        >
          <ExternalLink :size="14" />
          {{ t('projects.viewDemo') }}
        </a>
        <button
          class="ml-auto inline-flex items-center gap-1 text-xs font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          @click="expanded = !expanded"
        >
          {{ expanded ? t('projects.showLess') : t('projects.showMore') }}
          <ChevronUp v-if="expanded" :size="14" />
          <ChevronDown v-else :size="14" />
        </button>
      </div>
    </div>

    <!-- Expandable Details -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-[1000px] opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="max-h-[1000px] opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div v-if="expanded" class="overflow-hidden border-t border-gray-100 dark:border-gray-700">
        <div class="space-y-4 p-6">
          <!-- Contributions -->
          <div>
            <h4 class="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
              {{ t('projects.contributions') }}
            </h4>
            <ul class="space-y-2">
              <li
                v-for="(item, index) in contributions"
                :key="index"
                class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
              >
                <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500"></span>
                {{ item }}
              </li>
            </ul>
          </div>

          <!-- Achievements -->
          <div v-if="achievements">
            <h4 class="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
              {{ t('projects.achievements') }}
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ achievements }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </article>
</template>
