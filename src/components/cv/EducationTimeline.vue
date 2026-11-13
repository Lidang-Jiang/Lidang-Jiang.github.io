<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Award } from 'lucide-vue-next'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { education } from '@/data/education'

const { t, locale } = useI18n()

const lang = computed(() => locale.value as 'en' | 'zh')
</script>

<template>
  <section>
    <SectionTitle :title="t('cv.education.title')" />

    <ol class="border-b border-line">
      <li
        v-for="(edu, index) in education"
        :key="index"
        class="cv-entry"
      >
        <p class="pt-1 text-sm font-medium text-muted">{{ edu.period }}</p>
        <div class="min-w-0">
          <h3 class="text-xl font-semibold tracking-[-0.025em] text-ink">
            {{ edu.school[lang] }}
          </h3>
          <p v-if="edu.degree" class="mt-2 text-base text-muted">
            {{ edu.degree[lang] }}
            <span v-if="edu.major"> · {{ edu.major[lang] }}</span>
          </p>
          <p v-if="edu.department" class="text-base text-muted">
            {{ edu.department[lang] }}
          </p>

          <ul v-if="edu.highlights" class="mt-4 space-y-2">
            <li
              v-for="(highlight, hIndex) in edu.highlights[lang]"
              :key="hIndex"
              class="flex items-start gap-2 text-base leading-relaxed text-muted"
            >
              <Award :size="16" class="mt-1 shrink-0 text-muted" aria-hidden="true" />
              {{ highlight }}
            </li>
          </ul>
        </div>
      </li>
    </ol>
  </section>
</template>
