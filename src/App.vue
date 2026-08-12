<script setup lang="ts">
import { onMounted } from 'vue'
import TheNavbar from '@/components/layout/TheNavbar.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import { useTheme } from '@/composables/useTheme'

const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>

<template>
  <div class="flex min-h-screen flex-col bg-canvas text-ink">
    <TheNavbar />
    <main id="main-content" class="flex-1 pt-16">
      <router-view v-slot="{ Component }">
        <Transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>
    <TheFooter />
  </div>
</template>
