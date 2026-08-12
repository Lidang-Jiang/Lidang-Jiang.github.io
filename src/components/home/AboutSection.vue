<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import SectionTitle from '@/components/ui/SectionTitle.vue'

const { t } = useI18n()
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <SectionTitle :title="t('about.title')" />

      <div class="max-w-3xl space-y-6 text-base leading-[1.8] text-muted sm:text-lg">
        <p>{{ t('about.p1') }}</p>
        <p>{{ t('about.p2') }}</p>
        <p>{{ t('about.p3') }}</p>
      </div>
    </div>
  </section>
</template>
