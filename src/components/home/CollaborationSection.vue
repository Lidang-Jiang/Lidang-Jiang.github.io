<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Cpu, Globe, BrainCircuit, MessageSquare, Mail } from 'lucide-vue-next'
import SectionTitle from '@/components/ui/SectionTitle.vue'

const { t } = useI18n()

const items = [
  {
    key: 'ai',
    icon: Cpu,
    color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400',
  },
  {
    key: 'web',
    icon: Globe,
    color: 'text-green-500 bg-green-100 dark:bg-green-900/30 dark:text-green-400',
  },
  {
    key: 'aiApp',
    icon: BrainCircuit,
    color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400',
  },
  {
    key: 'consulting',
    icon: MessageSquare,
    color: 'text-amber-500 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400',
  },
]

const contactEmail = '2021223075161@alu.scu.edu.cn'
</script>

<template>
  <section class="bg-gray-50 py-16 sm:py-20 dark:bg-gray-900/50">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <SectionTitle
        :title="t('collaboration.title')"
        :subtitle="t('collaboration.subtitle')"
      />

      <div class="grid gap-6 sm:grid-cols-2">
        <div
          v-for="item in items"
          :key="item.key"
          class="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800/50"
        >
          <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110" :class="item.color">
            <component :is="item.icon" :size="24" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ t(`collaboration.items.${item.key}.title`) }}
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {{ t(`collaboration.items.${item.key}.description`) }}
          </p>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="mt-10 text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ t('collaboration.contactPrompt') }}
        </p>
        <a
          :href="`mailto:${contactEmail}`"
          class="mt-2 inline-flex items-center gap-2 text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          <Mail :size="16" />
          <span>{{ contactEmail }}</span>
        </a>
      </div>
    </div>
  </section>
</template>
