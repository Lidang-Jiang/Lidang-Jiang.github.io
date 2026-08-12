<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Briefcase } from 'lucide-vue-next'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { workExperiences } from '@/data/work'

const { t, locale } = useI18n()

const lang = computed(() => locale.value as 'en' | 'zh')
</script>

<template>
  <section>
    <SectionTitle :title="t('cv.work.title')" />

    <div class="space-y-0">
      <div
        v-for="(work, index) in workExperiences"
        :key="index"
        class="relative pl-9 pb-10 last:pb-0"
      >
        <!-- Timeline line -->
        <div
          v-if="index < workExperiences.length - 1"
          class="absolute top-8 bottom-0 left-3.5 w-px bg-line"
        ></div>
        <!-- Timeline dot -->
        <div class="absolute top-1 left-1 flex h-5 w-5 items-center justify-center rounded-full border border-accent bg-canvas">
          <Briefcase :size="12" class="text-accent" aria-hidden="true" />
        </div>

        <div class="border-b border-line pb-8">
          <span class="text-sm font-medium text-accent">
            {{ work.period[lang] }}
          </span>
          <h3 class="mt-1 text-lg font-semibold tracking-[-0.015em] text-ink">
            {{ work.company[lang] }}
          </h3>
          <p
            v-if="work.position?.[lang]"
            class="mt-1 text-sm text-muted"
          >
            {{ work.position[lang] }}
          </p>
          <p v-if="work.description" class="mt-2 text-sm leading-relaxed text-muted">
            {{ work.description[lang] }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
