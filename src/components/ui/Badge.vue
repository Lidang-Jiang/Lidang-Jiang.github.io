<script setup lang="ts">
defineProps<{
  label: string
  variant?: 'primary' | 'accent' | 'gray'
}>()
</script>

<template>
  <span
    class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium"
    :class="{
      'border-accent/25 bg-accent-soft text-accent': variant === 'primary' || !variant,
      'border-accent/40 bg-surface text-accent': variant === 'accent',
      'border-line bg-canvas text-muted': variant === 'gray',
    }"
  >
    {{ label }}
  </span>
</template>
