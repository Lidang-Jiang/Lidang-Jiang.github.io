<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme'

const { t } = useI18n()
const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <button
    type="button"
    class="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted transition-colors duration-200 hover:bg-accent-soft hover:text-accent"
    :aria-label="isDark ? t('theme.toLight') : t('theme.toDark')"
    @click="toggleTheme"
  >
    <Moon v-if="!isDark" :size="18" />
    <Sun v-else :size="18" />
  </button>
</template>
