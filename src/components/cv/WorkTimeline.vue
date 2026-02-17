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
        class="relative pl-8 pb-8 last:pb-0"
      >
        <!-- Timeline line -->
        <div
          v-if="index < workExperiences.length - 1"
          class="absolute top-8 left-3 bottom-0 w-px bg-gray-200 dark:bg-gray-700"
        ></div>
        <!-- Timeline dot -->
        <div class="absolute top-2 left-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary-500 bg-white dark:bg-gray-950">
          <Briefcase :size="12" class="text-primary-500" />
        </div>

        <div class="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50">
          <span class="text-sm font-medium text-primary-600 dark:text-primary-400">
            {{ work.period }}
          </span>
          <h3 class="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
            {{ work.company[lang] }}
          </h3>
          <p class="mt-0.5 text-sm text-gray-600 dark:text-gray-400">
            {{ work.position[lang] }}
          </p>
          <p v-if="work.description" class="mt-2 text-sm text-gray-500 dark:text-gray-500">
            {{ work.description[lang] }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
