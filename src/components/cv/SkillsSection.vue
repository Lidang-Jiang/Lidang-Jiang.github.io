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
      return 'border-accent/30 bg-accent-soft text-accent'
    case 'proficient':
      return 'border-line bg-surface text-ink'
    case 'basic':
      return 'border-line bg-canvas text-muted'
    default:
      return 'border-line bg-canvas text-muted'
  }
}
</script>

<template>
  <section>
    <SectionTitle :title="t('cv.skills.title')" />

    <div class="grid border-t border-line sm:grid-cols-2">
      <div
        v-for="category in skills"
        :key="category.category.en"
        class="border-b border-line py-6 sm:px-6 sm:even:border-l"
      >
        <h3 class="mb-4 text-base font-semibold text-ink">
          {{ category.category[lang] }}
        </h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="item in category.items"
            :key="item.name"
            class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium"
            :class="levelColor(item.level)"
          >
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
