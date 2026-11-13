<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  as?: 'h1' | 'h2'
}>()
</script>

<template>
  <div class="mb-8 max-w-3xl sm:mb-10">
    <component
      :is="as ?? 'h2'"
      :class="as === 'h1' ? 'page-heading' : 'section-heading'"
    >
      {{ title }}
    </component>
    <p v-if="subtitle" class="page-intro">
      {{ subtitle }}
    </p>
  </div>
</template>
