<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import TheNavbar from '@/components/layout/TheNavbar.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import BackToTop from '@/components/layout/BackToTop.vue'
import { useSiteSeo } from '@/composables/useSiteSeo'
import { useTheme } from '@/composables/useTheme'
import { getHomeLocale, readSavedLocale, saveLocale } from '@/i18n'

const { initTheme } = useTheme()
const { t, locale } = useI18n()
const route = useRoute()
useSiteSeo()

watch(() => route.path, (path) => {
  const homeLocale = getHomeLocale(path)
  if (homeLocale) locale.value = homeLocale
}, { immediate: true, flush: 'sync' })

onMounted(() => {
  if (!getHomeLocale(route.path)) {
    locale.value = readSavedLocale() ?? locale.value
  }
  saveLocale(locale.value)
  watch(locale, saveLocale, { flush: 'sync' })
  initTheme()
})
</script>

<template>
  <div class="flex min-h-screen flex-col bg-canvas text-ink">
    <a href="#main-content" class="skip-link">{{ t('nav.skipToContent') }}</a>
    <TheNavbar />
    <main id="main-content" tabindex="-1" class="flex-1 pt-16">
      <router-view v-slot="{ Component }">
        <Transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>
    <TheFooter />
    <BackToTop />
  </div>
</template>
