<script setup lang="ts">
defineProps<{
  period: string
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="relative pl-9 pb-10 last:pb-0">
    <!-- Timeline line -->
    <div class="absolute top-5 bottom-0 left-3.5 w-px bg-line last:hidden"></div>
    <!-- Timeline dot -->
    <div class="absolute top-1.5 left-1.5 h-4 w-4 rounded-full border border-accent bg-canvas"></div>

    <div>
      <span class="text-sm font-medium text-accent">
        {{ period }}
      </span>
      <h3 class="mt-1 text-lg font-semibold text-ink">
        {{ title }}
      </h3>
      <p v-if="subtitle" class="mt-0.5 text-sm text-muted">
        {{ subtitle }}
      </p>
      <div class="mt-2 text-sm text-muted">
        <slot />
      </div>
    </div>
  </div>
</template>
