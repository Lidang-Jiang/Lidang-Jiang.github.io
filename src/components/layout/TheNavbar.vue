<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Menu, X } from 'lucide-vue-next'
import ThemeToggle from './ThemeToggle.vue'

const { t, locale } = useI18n()
const mobileMenuOpen = ref(false)

const navLinks = [
  { name: 'nav.home', to: '/', exact: true },
  { name: 'nav.publications', to: '/publications', exact: false },
  { name: 'nav.cv', to: '/cv', exact: false },
  { name: 'nav.projects', to: '/projects', exact: false },
]

function toggleLanguage() {
  const newLang = locale.value === 'en' ? 'zh' : 'en'
  locale.value = newLang
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('lang', newLang)
  }
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/50 bg-white/80 backdrop-blur-lg dark:border-gray-700/50 dark:bg-gray-900/80"
  >
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo / Name -->
        <router-link
          to="/"
          class="text-lg font-semibold text-gray-900 transition-colors hover:text-primary-600 dark:text-white dark:hover:text-primary-400"
          @click="closeMobileMenu"
        >
          Lidang Jiang
        </router-link>

        <!-- Desktop Nav -->
        <div class="hidden items-center gap-1 md:flex">
          <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            :exact="link.exact"
            class="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
            :active-class="link.exact ? '' : '!text-primary-600 !bg-primary-50 dark:!text-primary-400 dark:!bg-primary-900/30'"
            :exact-active-class="link.exact ? '!text-primary-600 !bg-primary-50 dark:!text-primary-400 dark:!bg-primary-900/30' : ''"
          >
            {{ t(link.name) }}
          </router-link>

          <div class="ml-2 flex items-center gap-1 border-l border-gray-200 pl-2 dark:border-gray-700">
            <ThemeToggle />
            <button
              class="rounded-lg px-2 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              @click="toggleLanguage"
            >
              {{ locale === 'en' ? '中' : 'EN' }}
            </button>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            class="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <Menu v-if="!mobileMenuOpen" :size="20" />
            <X v-else :size="20" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="mobileMenuOpen" class="border-t border-gray-200 py-3 md:hidden dark:border-gray-700">
          <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            :exact="link.exact"
            class="block rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
            :active-class="link.exact ? '' : '!text-primary-600 !bg-primary-50 dark:!text-primary-400 dark:!bg-primary-900/30'"
            :exact-active-class="link.exact ? '!text-primary-600 !bg-primary-50 dark:!text-primary-400 dark:!bg-primary-900/30' : ''"
            @click="closeMobileMenu"
          >
            {{ t(link.name) }}
          </router-link>
          <button
            class="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
            @click="toggleLanguage"
          >
            {{ locale === 'en' ? '切换到中文' : 'Switch to English' }}
          </button>
        </div>
      </Transition>
    </div>
  </nav>
</template>
