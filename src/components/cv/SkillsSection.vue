<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { skills } from '@/data/skills'

const { t, locale } = useI18n()

const lang = computed(() => locale.value as 'en' | 'zh')

function levelColor(level?: string): string {
  switch (level) {
    case 'expert':
      return 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300'
    case 'proficient':
      return 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
    case 'basic':
      return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
    default:
      return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
  }
}
</script>

<template>
  <section>
    <SectionTitle :title="t('cv.skills.title')" />

    <div class="grid gap-6 sm:grid-cols-2">
      <div
        v-for="category in skills"
        :key="category.category.en"
        class="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900/50"
      >
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          {{ category.category[lang] }}
        </h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="item in category.items"
            :key="item.name"
            class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 hover:scale-105"
            :class="levelColor(item.level)"
          >
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
