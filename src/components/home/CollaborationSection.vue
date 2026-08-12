<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Cpu, Globe, Bot, Wrench, Mail } from 'lucide-vue-next'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import {
  collaborationItemKeys,
  type CollaborationItemKey,
} from '@/data/collaboration'
import { profile } from '@/data/profile'

const { t } = useI18n()

const itemMeta = {
  aiInfra: {
    icon: Cpu,
  },
  embodiedAi: {
    icon: Bot,
  },
  systemsEngineering: {
    icon: Wrench,
  },
  web: {
    icon: Globe,
  },
} satisfies Record<CollaborationItemKey, { icon: typeof Cpu }>

const items = collaborationItemKeys.map((key) => ({
  key,
  ...itemMeta[key],
}))

const contactEmail = profile.publicEmail
</script>

<template>
  <section class="border-t border-line bg-surface py-16 sm:py-24">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <SectionTitle
        :title="t('collaboration.title')"
        :subtitle="t('collaboration.subtitle')"
      />

      <div class="grid border-t border-line sm:grid-cols-2">
        <div
          v-for="item in items"
          :key="item.key"
          class="border-b border-line py-8 sm:px-8 sm:even:border-l"
        >
          <div class="mb-5 text-accent">
            <component :is="item.icon" :size="22" aria-hidden="true" />
          </div>
          <h3 class="text-lg font-semibold tracking-[-0.015em] text-ink">
            {{ t(`collaboration.items.${item.key}.title`) }}
          </h3>
          <p class="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            {{ t(`collaboration.items.${item.key}.description`) }}
          </p>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="mt-10">
        <p class="text-sm text-muted">
          {{ t('collaboration.contactPrompt') }}
        </p>
        <a
          :href="`mailto:${contactEmail}`"
          class="mt-2 inline-flex min-h-11 max-w-full items-center gap-2 break-all font-medium text-accent underline-offset-4 transition-opacity hover:underline"
        >
          <Mail :size="16" aria-hidden="true" />
          <span>{{ contactEmail }}</span>
        </a>
      </div>
    </div>
  </section>
</template>
