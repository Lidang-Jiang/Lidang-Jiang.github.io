<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import {
  formatProjectPeriod,
  type ProjectTimelineGroup,
} from '@/utils/project-timeline'

defineProps<{ groups: ProjectTimelineGroup[] }>()
const { t } = useI18n()

function groupTitle(key: string): string {
  if (key === 'ongoing') return t('projects.ongoing')
  if (key === 'unknown') return t('projects.unknownDate')
  return key
}
</script>

<template>
  <div data-project-timeline class="space-y-14 sm:space-y-20">
    <section v-for="group in groups" :key="group.key" :aria-labelledby="`timeline-${group.key}`">
      <div class="mb-6 flex items-baseline gap-4 md:mb-8">
        <h2
          :id="`timeline-${group.key}`"
          class="text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl"
        >
          {{ groupTitle(group.key) }}
        </h2>
        <span class="text-sm text-muted">{{ t('projects.projectCount', { count: group.entries.length }) }}</span>
      </div>

      <ol class="space-y-6">
        <li
          v-for="entry in group.entries"
          :key="entry.project.id"
          class="relative grid min-w-0 grid-cols-[12px_minmax(0,1fr)] gap-x-3 md:grid-cols-[148px_12px_minmax(0,1fr)] md:gap-x-6"
        >
          <div class="hidden pt-7 text-[13px] leading-relaxed text-muted tabular-nums md:block">
            {{ formatProjectPeriod(entry.project.period, t('projects.present')) }}
          </div>
          <div class="relative flex justify-center" aria-hidden="true">
            <span class="absolute inset-y-0 w-px bg-line" />
            <span class="relative mt-8 h-2.5 w-2.5 rounded-full border-2 border-accent bg-canvas" />
          </div>
          <ProjectCard :project="entry.project" timeline />
        </li>
      </ol>
    </section>
  </div>
</template>
