<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { MapPin, Github, BookOpen, FileText, ArrowRight } from 'lucide-vue-next'
import { profile } from '@/data/profile'

const { t, locale } = useI18n()

const lang = computed(() => locale.value as 'en' | 'zh')

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
  <section class="border-b border-line py-16 sm:py-24 lg:py-28">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="grid items-center gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] lg:gap-20">
        <div class="max-w-3xl">
          <p class="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted">
            <MapPin :size="16" class="shrink-0" aria-hidden="true" />
            <span>{{ profile.location[lang] }}</span>
          </p>

          <h1 class="text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-ink sm:text-6xl">
            {{ profile.name[lang] }}
          </h1>

          <ul
            class="mt-6 grid max-w-2xl grid-cols-2 gap-x-4 gap-y-1 text-lg leading-relaxed text-muted sm:gap-x-8 sm:text-xl"
            :aria-label="profile.title[lang]"
          >
            <li
              v-for="role in profile.targetRoles[lang]"
              :key="role"
              class="min-w-0 break-words"
            >
              {{ role }}
            </li>
          </ul>

          <div class="mt-8 flex flex-wrap gap-3">
            <router-link
              to="/cv"
              class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90 dark:text-canvas"
            >
              {{ t('hero.viewResume') }}
              <ArrowRight :size="16" aria-hidden="true" />
            </router-link>
            <router-link
              to="/projects"
              class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              {{ t('hero.viewProjects') }}
            </router-link>
          </div>

          <nav class="mt-8 flex items-center gap-2" :aria-label="t('hero.socialLinks')">
            <a
              v-for="link in socialLinks"
              :key="link.label"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
              :aria-label="link.label"
              :title="link.label"
            >
              <component :is="link.icon" :size="18" aria-hidden="true" />
            </a>
          </nav>
        </div>

        <div class="mx-auto w-full max-w-sm lg:mx-0 lg:justify-self-end">
          <div class="aspect-[4/5] overflow-hidden rounded-[18px] border border-line bg-surface shadow-soft">
            <img
              :src="profile.avatar"
              :alt="profile.name[lang]"
              width="753"
              height="858"
              fetchpriority="high"
              class="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
