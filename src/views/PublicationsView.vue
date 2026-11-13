<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import PublicationCard from '@/components/publications/PublicationCard.vue'
import { publications } from '@/data/publications'
import { useImpactFactors } from '@/composables/useImpactFactors'

const { t } = useI18n()

const issns = publications.map(p => p.issn).filter(Boolean) as string[]
const { impactFactors } = useImpactFactors(issns)

const enrichedPublications = computed(() =>
  publications.map((pub) => {
    const impactFactor = pub.issn
      ? impactFactors.value.get(pub.issn)
      : undefined

    return {
      ...pub,
      impactFactor: impactFactor ?? pub.impactFactor,
    }
  }),
)
</script>

<template>
  <div class="py-14 sm:py-20">
    <div class="site-shell">
      <SectionTitle
        :title="t('publications.title')"
        :subtitle="t('publications.subtitle')"
        as="h1"
      />

      <div class="mt-12 border-b border-line sm:mt-16">
        <PublicationCard
          v-for="pub in enrichedPublications"
          :key="pub.id"
          :publication="pub"
        />
      </div>
    </div>
  </div>
</template>
