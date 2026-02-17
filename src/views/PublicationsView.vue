<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import PublicationCard from '@/components/publications/PublicationCard.vue'
import { publications } from '@/data/publications'

const { t } = useI18n()
</script>

<template>
  <div class="py-16 sm:py-20">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <SectionTitle
        :title="t('publications.title')"
        :subtitle="t('publications.subtitle')"
      />

      <div class="space-y-6">
        <PublicationCard
          v-for="pub in publications"
          :key="pub.id"
          :publication="pub"
        />
      </div>
    </div>
  </div>
</template>
