<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { GraduationCap, Award } from 'lucide-vue-next'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { education } from '@/data/education'

const { t, locale } = useI18n()

const lang = computed(() => locale.value as 'en' | 'zh')
</script>

<template>
  <section>
    <SectionTitle :title="t('cv.education.title')" />

    <div class="space-y-0">
      <div
        v-for="(edu, index) in education"
        :key="index"
        class="relative pl-8 pb-8 last:pb-0"
      >
        <!-- Timeline line -->
        <div
          v-if="index < education.length - 1"
          class="absolute top-8 left-3 bottom-0 w-px bg-gray-200 dark:bg-gray-700"
        ></div>
        <!-- Timeline dot -->
        <div class="absolute top-2 left-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary-500 bg-white dark:bg-gray-950">
          <GraduationCap :size="12" class="text-primary-500" />
        </div>

        <div class="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50">
          <span class="text-sm font-medium text-primary-600 dark:text-primary-400">
            {{ edu.period }}
          </span>
          <h3 class="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
            {{ edu.school[lang] }}
          </h3>
          <p v-if="edu.degree" class="mt-0.5 text-sm text-gray-600 dark:text-gray-400">
            {{ edu.degree[lang] }}
            <span v-if="edu.major"> · {{ edu.major[lang] }}</span>
          </p>
          <p v-if="edu.department" class="text-sm text-gray-500 dark:text-gray-500">
            {{ edu.department[lang] }}
          </p>

          <ul v-if="edu.highlights" class="mt-3 space-y-1">
            <li
              v-for="(highlight, hIndex) in edu.highlights[lang]"
              :key="hIndex"
              class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
            >
              <Award :size="14" class="mt-0.5 shrink-0 text-amber-500" />
              {{ highlight }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
