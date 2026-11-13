<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Cpu, Globe, Bot, Wrench, Mail } from 'lucide-vue-next'
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
  <section class="bg-surface py-16 sm:py-24">
    <div class="site-shell">
      <div class="mb-12 max-w-3xl">
        <h2 class="section-heading">{{ t('collaboration.title') }}</h2>
        <p class="page-intro">{{ t('collaboration.subtitle') }}</p>
      </div>

      <div class="grid gap-x-16 gap-y-10 md:grid-cols-2">
        <div
          v-for="item in items"
          :key="item.key"
          class="border-t border-line pt-7"
        >
          <div class="mb-4 text-muted">
            <component :is="item.icon" :size="24" :stroke-width="1.5" aria-hidden="true" />
          </div>
          <h3 class="text-xl font-semibold tracking-[-0.02em] text-ink">
            {{ t(`collaboration.items.${item.key}.title`) }}
          </h3>
          <p class="mt-3 max-w-xl text-base leading-[1.8] text-muted">
            {{ t(`collaboration.items.${item.key}.description`) }}
          </p>
        </div>
      </div>

      <!-- 联系入口 -->
      <div class="mt-14 border-t border-line pt-8 sm:flex sm:items-center sm:justify-between sm:gap-8">
        <p class="text-base text-muted">
          {{ t('collaboration.contactPrompt') }}
        </p>
        <a
          :href="`mailto:${contactEmail}`"
          class="mt-2 inline-flex min-h-11 max-w-full items-center gap-2 break-all text-base font-medium text-accent underline-offset-4 transition-opacity hover:underline sm:mt-0"
        >
          <Mail :size="18" class="shrink-0" aria-hidden="true" />
          <span>{{ contactEmail }}</span>
        </a>
      </div>
    </div>
  </section>
</template>
