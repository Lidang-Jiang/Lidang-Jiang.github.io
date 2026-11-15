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
  <div data-project-timeline class="space-y-12 sm:space-y-14">
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

      <ol class="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        <li
          v-for="entry in group.entries"
          :key="entry.project.id"
          class="relative min-w-0 border-l border-line pl-5 sm:pl-6"
        >
          <span
            class="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-canvas"
            aria-hidden="true"
          />
          <p data-project-period class="mb-3 text-[13px] leading-relaxed text-muted tabular-nums">
            {{ formatProjectPeriod(entry.project.period, t('projects.present')) }}
          </p>
          <ProjectCard :project="entry.project" timeline />
        </li>
      </ol>
    </section>
  </div>
</template>
