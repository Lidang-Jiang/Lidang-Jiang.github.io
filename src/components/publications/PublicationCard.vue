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
  <article class="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800/50">
    <div class="flex flex-col sm:flex-row">
      <!-- Paper Image -->
      <div class="relative h-48 shrink-0 overflow-hidden sm:h-auto sm:w-56">
        <img
          :src="publication.image"
          :alt="publication.title"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <!-- Content -->
      <div class="flex-1 p-6">
        <div class="mb-2 flex items-center gap-2">
          <span class="rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-semibold text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
            {{ publication.journal }}
          </span>
          <span class="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
            {{ t('publications.impactFactor') }}={{ publication.impactFactor }}
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400">
            {{ publication.year }}
          </span>
        </div>

        <h3 class="text-lg font-semibold leading-snug text-gray-900 dark:text-white">
          {{ publication.title }}
        </h3>

        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {{ publication.authors }}
        </p>

        <p class="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {{ abstract }}
        </p>

        <div class="mt-4 flex items-center gap-3">
          <a
            :href="publication.doi"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 rounded-lg bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 transition-colors hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-300 dark:hover:bg-primary-900/50"
          >
            <ExternalLink :size="14" />
            {{ t('publications.viewPaper') }}
          </a>
          <a
            :href="publication.pdf"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            <FileText :size="14" />
            {{ t('publications.downloadPdf') }}
          </a>
        </div>
      </div>
    </div>
  </article>
</template>
