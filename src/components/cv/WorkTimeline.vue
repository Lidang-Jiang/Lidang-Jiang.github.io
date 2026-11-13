<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { workExperiences } from '@/data/work'

const { t, locale } = useI18n()

const lang = computed(() => locale.value as 'en' | 'zh')
</script>

<template>
  <section>
    <SectionTitle :title="t('cv.work.title')" />

    <ol class="border-b border-line">
      <li
        v-for="(work, index) in workExperiences"
        :key="index"
        class="cv-entry"
      >
        <p class="pt-1 text-sm font-medium text-muted">{{ work.period[lang] }}</p>
        <div class="min-w-0">
          <h3 class="text-xl font-semibold tracking-[-0.025em] text-ink">
            {{ work.company[lang] }}
          </h3>
          <p
            v-if="work.position?.[lang]"
            class="mt-2 text-base text-muted"
          >
            {{ work.position[lang] }}
          </p>
          <p v-if="work.description" class="mt-3 max-w-3xl text-base leading-[1.8] text-muted">
            {{ work.description[lang] }}
          </p>
        </div>
      </li>
    </ol>
  </section>
</template>
