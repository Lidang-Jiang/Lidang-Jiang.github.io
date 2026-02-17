<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Github, Mail } from 'lucide-vue-next'

const { t } = useI18n()
const currentYear = new Date().getFullYear()

const socialLinks = [
  {
    icon: Github,
    href: 'https://github.com/Lidang-Jiang',
    label: 'GitHub',
  },
  {
    icon: Mail,
    href: 'mailto:765984881@qq.com',
    label: 'Email',
  },
]
</script>

<template>
  <footer class="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
    <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ t('footer.copyright', { year: currentYear }) }}
        </p>
        <div class="flex items-center gap-4">
          <a
            v-for="link in socialLinks"
            :key="link.label"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
            :aria-label="link.label"
          >
            <component :is="link.icon" :size="18" />
          </a>
          <span class="text-xs text-gray-400 dark:text-gray-500">
            {{ t('footer.builtWith') }}
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>
