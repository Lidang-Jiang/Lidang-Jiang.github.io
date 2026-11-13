<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { MapPin, Github, GitFork, BookOpen, FileText, ArrowRight } from 'lucide-vue-next'
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
    icon: GitFork,
    href: profile.social.gitcode,
    label: 'GitCode',
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
  <section class="bg-surface py-14 sm:py-20 lg:py-24">
    <div class="site-shell">
      <div class="grid items-center gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)] lg:gap-16">
        <div class="min-w-0 max-w-3xl">
          <p class="mb-6 inline-flex items-start gap-2 text-sm font-medium leading-relaxed text-muted">
            <MapPin :size="16" class="shrink-0" aria-hidden="true" />
            <span>{{ profile.location[lang] }}</span>
          </p>

          <h1 class="text-[44px] font-semibold leading-[1.08] tracking-[-0.045em] text-ink sm:text-[64px] lg:text-[72px]">
            {{ profile.name[lang] }}
          </h1>

          <ul
            class="mt-7 flex max-w-xl flex-wrap gap-x-3 gap-y-1.5 text-base leading-relaxed text-muted sm:text-lg"
            :aria-label="profile.title[lang]"
          >
            <li
              v-for="(role, index) in profile.targetRoles[lang]"
              :key="role"
              class="flex min-w-0 items-baseline gap-3 break-words"
            >
              <span v-if="index > 0" class="text-line" aria-hidden="true">/</span>
              {{ role }}
            </li>
          </ul>

          <div class="mt-9 flex flex-wrap gap-3">
            <router-link
              to="/cv"
              class="button-primary"
            >
              {{ t('hero.viewResume') }}
              <ArrowRight :size="16" aria-hidden="true" />
            </router-link>
            <router-link
              to="/projects"
              class="button-secondary"
            >
              {{ t('hero.viewProjects') }}
            </router-link>
          </div>

          <nav class="mt-7 flex flex-wrap items-center gap-x-5 gap-y-1" :aria-label="t('hero.socialLinks')">
            <a
              v-for="link in socialLinks"
              :key="link.label"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm font-medium text-muted underline-offset-4 transition-colors duration-200 hover:text-accent hover:underline"
              :aria-label="link.label"
              :title="link.label"
            >
              <component :is="link.icon" :size="16" aria-hidden="true" />
              <span>{{ link.label }}</span>
            </a>
          </nav>
        </div>

        <div class="mx-auto w-full max-w-[300px] sm:max-w-[340px] lg:mx-0 lg:justify-self-end">
          <div class="aspect-[7/8] overflow-hidden rounded-2xl bg-canvas">
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
