<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Calendar, Phone, Mail, Briefcase, DollarSign, MapPin, Globe } from 'lucide-vue-next'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ResumeDownload from '@/components/cv/ResumeDownload.vue'
import EducationTimeline from '@/components/cv/EducationTimeline.vue'
import WorkTimeline from '@/components/cv/WorkTimeline.vue'
import SkillsSection from '@/components/cv/SkillsSection.vue'
import { profile } from '@/data/profile'
import { publications } from '@/data/publications'
import { useImpactFactors } from '@/composables/useImpactFactors'

const { t, locale } = useI18n()

const issns = publications.map(p => p.issn).filter(Boolean) as string[]
const { impactFactors } = useImpactFactors(issns)

const enrichedPublications = computed(() =>
  publications.map(pub => ({
    ...pub,
    impactFactor: (pub.issn && impactFactors.value.get(pub.issn)) ?? pub.impactFactor,
  }))
)

const lang = computed(() => locale.value as 'en' | 'zh')

const basicInfoItems = computed(() => [
  { icon: Calendar, label: t('cv.birthday'), value: profile.birthday },
  { icon: Phone, label: t('cv.phone'), value: profile.phone },
  { icon: Mail, label: t('cv.email'), value: profile.emails.join(', ') },
  { icon: Briefcase, label: t('cv.position'), value: profile.position[lang.value] },
  { icon: DollarSign, label: t('cv.salary'), value: profile.salary[lang.value] },
  { icon: MapPin, label: t('cv.hometown'), value: profile.hometown[lang.value] },
  { icon: MapPin, label: t('cv.currentCity'), value: profile.currentCity[lang.value] },
  { icon: Globe, label: t('cv.website'), value: profile.website, isLink: true },
])
</script>

<template>
  <div class="py-16 sm:py-20">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <!-- Title & Download -->
      <SectionTitle :title="t('cv.title')" />
      <div class="mb-12">
        <ResumeDownload />
      </div>

      <!-- Basic Info -->
      <section class="mb-16">
        <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          {{ t('cv.basicInfo') }}
        </h2>
        <div class="grid gap-4 sm:grid-cols-2">
          <div
            v-for="item in basicInfoItems"
            :key="item.label"
            class="flex items-start gap-3 rounded-lg border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900/50"
          >
            <component
              :is="item.icon"
              :size="18"
              class="mt-0.5 shrink-0 text-primary-500"
            />
            <div>
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400">
                {{ item.label }}
              </p>
              <a
                v-if="item.isLink"
                :href="item.value"
                target="_blank"
                class="text-sm text-primary-600 hover:underline dark:text-primary-400"
              >
                {{ item.value }}
              </a>
              <p v-else class="text-sm text-gray-900 dark:text-white">
                {{ item.value }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Education -->
      <div class="mb-16">
        <EducationTimeline />
      </div>

      <!-- Work Experience -->
      <div class="mb-16">
        <WorkTimeline />
      </div>

      <!-- Skills -->
      <div class="mb-16">
        <SkillsSection />
      </div>

      <!-- Self Evaluation -->
      <section class="mb-16">
        <SectionTitle :title="t('cv.selfEvaluation.title')" />
        <div class="rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900/50">
          <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {{ t('cv.selfEvaluation.content') }}
          </p>
        </div>
      </section>

      <!-- Publications list in CV -->
      <section>
        <SectionTitle :title="t('cv.publications.title')" />
        <ol class="space-y-4">
          <li
            v-for="pub in enrichedPublications"
            :key="pub.id"
            class="rounded-xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900/50"
          >
            <p class="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {{ pub.citation }}
            </p>
            <div class="mt-2 flex items-center gap-3">
              <span class="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                {{ t('publications.impactFactor') }}={{ pub.impactFactor }}
              </span>
              <a
                :href="pub.doi"
                target="_blank"
                class="text-xs text-primary-600 hover:underline dark:text-primary-400"
              >
                DOI
              </a>
              <a
                :href="pub.pdf"
                target="_blank"
                class="text-xs text-primary-600 hover:underline dark:text-primary-400"
              >
                PDF
              </a>
            </div>
          </li>
        </ol>
      </section>
    </div>
  </div>
</template>
