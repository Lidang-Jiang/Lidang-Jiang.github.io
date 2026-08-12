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
  <footer class="border-t border-line bg-canvas">
    <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p class="text-sm text-muted">
          {{ t('footer.copyright', { year: currentYear }) }}
        </p>
        <div class="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
          <a
            v-for="link in socialLinks"
            :key="link.label"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted transition-colors duration-200 hover:bg-accent-soft hover:text-accent"
            :aria-label="link.label"
          >
            <component :is="link.icon" :size="18" aria-hidden="true" />
          </a>
          <span class="text-xs text-muted">
            {{ t('footer.builtWith') }}
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>
