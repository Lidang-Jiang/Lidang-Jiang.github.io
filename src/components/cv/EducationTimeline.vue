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
        class="relative pl-9 pb-10 last:pb-0"
      >
        <!-- Timeline line -->
        <div
          v-if="index < education.length - 1"
          class="absolute top-8 bottom-0 left-3.5 w-px bg-line"
        ></div>
        <!-- Timeline dot -->
        <div class="absolute top-1 left-1 flex h-5 w-5 items-center justify-center rounded-full border border-accent bg-canvas">
          <GraduationCap :size="12" class="text-accent" aria-hidden="true" />
        </div>

        <div class="border-b border-line pb-8">
          <span class="text-sm font-medium text-accent">
            {{ edu.period }}
          </span>
          <h3 class="mt-1 text-lg font-semibold tracking-[-0.015em] text-ink">
            {{ edu.school[lang] }}
          </h3>
          <p v-if="edu.degree" class="mt-1 text-sm text-muted">
            {{ edu.degree[lang] }}
            <span v-if="edu.major"> · {{ edu.major[lang] }}</span>
          </p>
          <p v-if="edu.department" class="text-sm text-muted">
            {{ edu.department[lang] }}
          </p>

          <ul v-if="edu.highlights" class="mt-3 space-y-1">
            <li
              v-for="(highlight, hIndex) in edu.highlights[lang]"
              :key="hIndex"
              class="flex items-start gap-2 text-sm text-muted"
            >
              <Award :size="14" class="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              {{ highlight }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
