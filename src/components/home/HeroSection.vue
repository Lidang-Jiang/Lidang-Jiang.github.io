<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { MapPin, Github, BookOpen, FileText } from 'lucide-vue-next'
import { profile } from '@/data/profile'

const { t } = useI18n()

const socialLinks = [
  {
    icon: Github,
    href: profile.social.github,
    label: 'GitHub',
  },
  {
    icon: BookOpen,
    href: profile.social.scholar,
    label: 'Google Scholar',
  },
  {
    icon: FileText,
    href: profile.social.orcid,
    label: 'ORCID',
  },
]
</script>

<template>
  <section class="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white py-24 sm:py-32 dark:from-gray-900 dark:via-gray-950 dark:to-gray-950">
    <!-- Decorative gradient circles -->
    <div class="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-200/30 blur-3xl dark:bg-primary-800/20"></div>
    <div class="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary-100/40 blur-3xl dark:bg-primary-900/20"></div>

    <div class="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center text-center">
        <!-- Avatar -->
        <div class="mb-6 h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-xl ring-2 ring-primary-100 sm:h-40 sm:w-40 dark:border-gray-800 dark:ring-primary-900/50">
          <img
            :src="profile.avatar"
            :alt="t('hero.name')"
            class="h-full w-full object-cover"
          />
        </div>

        <!-- Name -->
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
          {{ t('hero.name') }}
        </h1>

        <!-- Title -->
        <p class="mt-3 text-lg font-medium text-primary-600 sm:text-xl dark:text-primary-400">
          {{ t('hero.title') }}
        </p>

        <!-- Location -->
        <div class="mt-3 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
          <MapPin :size="16" />
          <span>{{ t('hero.location') }}</span>
        </div>

        <!-- Social Links -->
        <div class="mt-6 flex items-center gap-3">
          <a
            v-for="link in socialLinks"
            :key="link.label"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-100 hover:text-primary-600 hover:shadow-md dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-primary-900/40 dark:hover:text-primary-400"
            :aria-label="link.label"
            :title="link.label"
          >
            <component :is="link.icon" :size="18" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
