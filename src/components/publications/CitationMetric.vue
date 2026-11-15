<script setup lang="ts">
import { ExternalLink } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import type { CitationMetric } from '@/types/citation'

defineProps<{ metric?: CitationMetric }>()
const { t, n } = useI18n()
</script>

<template>
  <span data-citation-metric class="inline-flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
    <template v-if="metric">
      <a
        :href="metric.citedByUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex min-h-11 items-center gap-1.5 text-[13px] font-medium text-accent underline-offset-4 hover:underline"
      >
        <span>{{ metric.source }} · {{ t('publications.citedBy', { count: n(metric.count) }) }}<span
          v-if="metric.estimated"
          :title="t('publications.citationsEstimated')"
          :aria-label="t('publications.citationsEstimated')"
        >*</span></span>
        <ExternalLink :size="12" class="shrink-0" aria-hidden="true" />
      </a>
      <span class="text-xs text-muted">
        {{ t('publications.citationsUpdated') }}
        <time :datetime="metric.verifiedAt">{{ metric.verifiedAt }}</time>
      </span>
    </template>
    <span v-else class="text-[13px] text-muted">{{ t('publications.citationsUnavailable') }}</span>
  </span>
</template>
