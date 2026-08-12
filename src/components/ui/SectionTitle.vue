<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  as?: 'h1' | 'h2'
}>()
</script>

<template>
  <div class="mb-10 max-w-3xl sm:mb-12">
    <component
      :is="as ?? 'h2'"
      class="text-3xl font-semibold leading-tight tracking-[-0.03em] text-ink sm:text-4xl"
    >
      {{ title }}
    </component>
    <p v-if="subtitle" class="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
      {{ subtitle }}
    </p>
  </div>
</template>
