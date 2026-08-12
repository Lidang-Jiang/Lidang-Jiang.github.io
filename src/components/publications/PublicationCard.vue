<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ExternalLink, FileText } from 'lucide-vue-next'
import type { Publication } from '@/types/publication'

const props = defineProps<{
  publication: Publication
}>()

const { t, locale } = useI18n()

const lang = computed(() => locale.value as 'en' | 'zh')

const abstract = computed(() => props.publication.abstract[lang.value])
</script>

<template>
  <article class="border-t border-line py-8 first:pt-0">
    <div class="flex flex-col gap-6 sm:flex-row sm:gap-8">
      <!-- Paper Image -->
      <div class="aspect-[4/5] w-full shrink-0 overflow-hidden rounded-xl border border-line bg-canvas sm:w-40">
        <img
          :src="publication.image"
          :alt="publication.title"
          width="320"
          height="400"
          loading="lazy"
          class="h-full w-full object-contain"
        />
      </div>

      <!-- Content -->
      <div class="min-w-0 flex-1">
        <div class="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span class="text-xs font-semibold text-accent">
            {{ publication.journal }}
          </span>
          <span class="rounded-full border border-line bg-surface px-2.5 py-0.5 text-xs font-medium text-muted">
            {{ t('publications.impactFactor') }}={{ publication.impactFactor }}
          </span>
          <span class="text-xs text-muted">
            {{ publication.year }}
          </span>
        </div>

        <h2 class="text-lg font-semibold leading-snug tracking-[-0.015em] text-ink">
          {{ publication.title }}
        </h2>

        <p class="mt-2 text-sm text-muted">
          {{ publication.authors }}
        </p>

        <p class="mt-4 text-sm leading-relaxed text-muted">
          {{ abstract }}
        </p>

        <div class="mt-5 flex flex-wrap items-center gap-2">
          <a
            :href="publication.doi"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white transition-opacity duration-200 hover:opacity-90 dark:text-canvas"
          >
            <ExternalLink :size="14" aria-hidden="true" />
            {{ t('publications.viewPaper') }}
          </a>
          <a
            :href="publication.pdf"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-line bg-surface px-4 py-2 text-xs font-semibold text-ink transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            <FileText :size="14" aria-hidden="true" />
            {{ t('publications.downloadPdf') }}
          </a>
        </div>
      </div>
    </div>
  </article>
</template>
