<script setup lang="ts">
import { ArrowUp } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { useBackToTop } from '@/composables/useBackToTop'

const { t } = useI18n()
const { isVisible, scrollToTop } = useBackToTop()
</script>

<template>
  <button
    v-if="isVisible"
    type="button"
    class="back-to-top fixed z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-accent shadow-soft transition-colors hover:border-accent hover:bg-accent-soft"
    :aria-label="t('nav.backToTop')"
    :title="t('nav.backToTop')"
    @click="scrollToTop"
  >
    <ArrowUp :size="22" aria-hidden="true" />
  </button>
</template>

<style scoped>
.back-to-top {
  right: calc(1rem + env(safe-area-inset-right, 0px));
  bottom: calc(1rem + env(safe-area-inset-bottom, 0px));
}
</style>
