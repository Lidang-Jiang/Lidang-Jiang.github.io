<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="mb-10 text-center">
    <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="mt-3 text-lg text-gray-600 dark:text-gray-400">
      {{ subtitle }}
    </p>
    <div class="mx-auto mt-4 h-1 w-16 rounded-full bg-primary-500"></div>
  </div>
</template>
