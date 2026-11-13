<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="site-shell grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
      <h2 class="section-heading">{{ t('about.title') }}</h2>

      <div class="max-w-3xl space-y-6 text-base leading-[1.9] text-muted sm:text-lg">
        <p>{{ t('about.p1') }}</p>
        <p>{{ t('about.p2') }}</p>
        <p>{{ t('about.p3') }}</p>
      </div>
    </div>
  </section>
</template>
