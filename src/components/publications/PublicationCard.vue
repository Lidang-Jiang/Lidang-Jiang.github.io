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
  <article class="border-t border-line py-8 sm:py-10">
    <div class="grid gap-6 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-10 lg:grid-cols-[192px_minmax(0,1fr)] lg:gap-14">
      <!-- 论文封面在移动端保持紧凑 -->
      <div class="h-40 w-32 shrink-0 overflow-hidden rounded-xl border border-line bg-surface sm:h-50 sm:w-40 lg:h-60 lg:w-48">
        <img
          :src="publication.image"
          :alt="publication.title"
          width="320"
          height="400"
          loading="lazy"
          class="h-full w-full object-contain"
        />
      </div>

      <!-- 论文内容 -->
      <div class="min-w-0 flex-1">
        <div class="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span class="text-[13px] font-semibold text-accent">
            {{ publication.journal }}
          </span>
          <span class="rounded-full border border-line bg-surface px-2.5 py-0.5 text-[13px] font-medium text-muted">
            {{ t('publications.impactFactor') }}={{ publication.impactFactor }}
          </span>
          <span class="text-[13px] text-muted">
            {{ publication.year }}
          </span>
        </div>

        <h2 class="text-xl font-semibold leading-snug tracking-[-0.025em] text-ink sm:text-2xl">
          {{ publication.title }}
        </h2>

        <p class="mt-3 text-sm leading-relaxed text-muted">
          {{ publication.authors }}
        </p>

        <p class="mt-5 max-w-3xl text-base leading-[1.8] text-muted">
          {{ abstract }}
        </p>

        <div class="mt-6 flex flex-wrap items-center gap-3">
          <a
            :href="publication.doi"
            target="_blank"
            rel="noopener noreferrer"
            class="button-primary"
          >
            <ExternalLink :size="16" aria-hidden="true" />
            {{ t('publications.viewPaper') }}
          </a>
          <a
            :href="publication.pdf"
            target="_blank"
            rel="noopener noreferrer"
            class="button-secondary"
          >
            <FileText :size="16" aria-hidden="true" />
            {{ t('publications.downloadPdf') }}
          </a>
        </div>
      </div>
    </div>
  </article>
</template>
