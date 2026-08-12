<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'
import { useDisclosure } from '@/composables/useDisclosure'
import ThemeToggle from './ThemeToggle.vue'

const { t, locale } = useI18n()
const route = useRoute()
const menuButton = ref<HTMLButtonElement | null>(null)
const {
  isOpen: mobileMenuOpen,
  toggle: toggleMobileMenu,
  close: closeMobileMenu,
  handleKeydown,
} = useDisclosure()

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

function handleWindowKeydown(event: KeyboardEvent) {
  if (!handleKeydown(event)) return

  void nextTick(() => menuButton.value?.focus())
}

watch(() => route.fullPath, closeMobileMenu)

onMounted(() => window.addEventListener('keydown', handleWindowKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleWindowKeydown))
</script>

<template>
  <nav
    :aria-label="t('nav.primary')"
    class="fixed inset-x-0 top-0 z-50 border-b border-line bg-surface/90 shadow-soft backdrop-blur-xl"
  >
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo / Name -->
        <router-link
          to="/"
          class="inline-flex min-h-11 items-center rounded-md text-base font-semibold tracking-[-0.02em] text-ink transition-colors duration-200 hover:text-accent"
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
            class="relative inline-flex min-h-11 items-center px-3 text-sm font-medium text-muted transition-colors duration-200 after:absolute after:inset-x-3 after:bottom-0 after:h-px after:origin-center after:scale-x-0 after:bg-accent after:transition-transform hover:text-ink"
            :active-class="link.exact ? '' : '!text-accent after:!scale-x-100'"
            :exact-active-class="link.exact ? '!text-accent after:!scale-x-100' : ''"
          >
            {{ t(link.name) }}
          </router-link>

          <div class="ml-2 flex items-center gap-1 border-l border-line pl-2">
            <ThemeToggle />
            <button
              type="button"
              class="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-2 text-sm font-semibold text-muted transition-colors duration-200 hover:bg-accent-soft hover:text-accent"
              :aria-label="t('nav.switchLanguage')"
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
            ref="menuButton"
            type="button"
            class="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted transition-colors duration-200 hover:bg-accent-soft hover:text-accent"
            :aria-label="mobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')"
            :aria-expanded="mobileMenuOpen"
            aria-controls="mobile-navigation"
            @click="toggleMobileMenu"
          >
            <Menu v-if="!mobileMenuOpen" :size="20" />
            <X v-else :size="20" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div
          v-show="mobileMenuOpen"
          id="mobile-navigation"
          class="border-t border-line py-3 md:hidden"
        >
          <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-muted transition-colors duration-200 hover:bg-accent-soft hover:text-ink"
            :active-class="link.exact ? '' : '!bg-accent-soft !text-accent'"
            :exact-active-class="link.exact ? '!bg-accent-soft !text-accent' : ''"
            @click="closeMobileMenu"
          >
            {{ t(link.name) }}
          </router-link>
          <button
            type="button"
            class="mt-1 flex min-h-11 w-full items-center rounded-lg px-3 text-left text-sm font-medium text-muted transition-colors duration-200 hover:bg-accent-soft hover:text-ink"
            @click="toggleLanguage"
          >
            {{ locale === 'en' ? '切换到中文' : 'Switch to English' }}
          </button>
        </div>
      </Transition>
    </div>
  </nav>
</template>
