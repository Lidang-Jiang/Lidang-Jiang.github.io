<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import SectionTitle from '@/components/ui/SectionTitle.vue'

const { t } = useI18n()
</script>

<template>
  <section class="py-16 sm:py-20">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <SectionTitle :title="t('about.title')" />

      <div class="space-y-5 text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-400">
        <p>{{ t('about.p1') }}</p>
        <p>{{ t('about.p2') }}</p>
        <p>{{ t('about.p3') }}</p>
      </div>
    </div>
  </section>
</template>
