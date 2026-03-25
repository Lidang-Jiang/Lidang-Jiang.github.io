<script setup lang="ts">
defineProps<{
  label: string
  variant?: 'primary' | 'accent' | 'gray'
}>()
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors"
    :class="{
      'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300': variant === 'primary' || !variant,
      'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300': variant === 'accent',
      'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300': variant === 'gray',
    }"
  >
    {{ label }}
  </span>
</template>
