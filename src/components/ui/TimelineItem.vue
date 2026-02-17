<script setup lang="ts">
defineProps<{
  period: string
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="relative pl-8 pb-8 last:pb-0">
    <!-- Timeline line -->
    <div class="absolute top-2 left-3 -bottom-2 w-px bg-gray-200 last:hidden dark:bg-gray-700"></div>
    <!-- Timeline dot -->
    <div class="absolute top-2 left-1 h-4 w-4 rounded-full border-2 border-primary-500 bg-white dark:bg-gray-950"></div>

    <div>
      <span class="text-sm font-medium text-primary-600 dark:text-primary-400">
        {{ period }}
      </span>
      <h3 class="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
        {{ title }}
      </h3>
      <p v-if="subtitle" class="mt-0.5 text-sm text-gray-600 dark:text-gray-400">
        {{ subtitle }}
      </p>
      <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        <slot />
      </div>
    </div>
  </div>
</template>
