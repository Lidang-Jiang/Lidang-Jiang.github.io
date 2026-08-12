<script setup lang="ts">
import { computed, type Component } from 'vue'
import { useI18n } from 'vue-i18n'
import { Calendar, Mail, Briefcase, DollarSign, MapPin, Globe, Clock } from 'lucide-vue-next'
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

interface BasicInfoItem {
  icon: Component
  label: string
  value?: string
  isLink?: boolean
  targetRoles?: string[]
  ariaLabel?: string
  wide?: boolean
  rightColumn?: boolean
}

const basicInfoItems = computed<BasicInfoItem[]>(() => [
  { icon: Calendar, label: t('cv.birthday'), value: profile.birthday },
  {
    icon: Mail,
    label: t('cv.email'),
    value: profile.emails.join(', '),
    rightColumn: true,
  },
  {
    icon: Briefcase,
    label: t('cv.position'),
    targetRoles: profile.targetRoles[lang.value],
    ariaLabel: profile.position[lang.value],
    wide: true,
  },
  { icon: DollarSign, label: t('cv.salary'), value: profile.salary[lang.value] },
  {
    icon: Clock,
    label: t('cv.status'),
    value: profile.employmentStatus[lang.value],
    rightColumn: true,
  },
  { icon: MapPin, label: t('cv.hometown'), value: profile.hometown[lang.value] },
  {
    icon: MapPin,
    label: t('cv.currentCity'),
    value: profile.currentCity[lang.value],
    rightColumn: true,
  },
  {
    icon: Globe,
    label: t('cv.website'),
    value: profile.website,
    isLink: true,
    wide: true,
  },
])
</script>

<template>
  <div class="py-14 sm:py-20">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <!-- Title & Download -->
      <SectionTitle :title="t('cv.title')" as="h1" />
      <div class="mb-12">
        <ResumeDownload />
      </div>

      <!-- Basic Info -->
      <section class="mb-16">
        <h2 class="mb-6 text-2xl font-semibold tracking-[-0.025em] text-ink">
          {{ t('cv.basicInfo') }}
        </h2>
        <dl class="grid border-t border-line sm:grid-cols-2">
          <div
            v-for="item in basicInfoItems"
            :key="item.label"
            class="flex min-w-0 items-start gap-3 border-b border-line py-4 sm:px-4"
            :class="[
              item.wide ? 'sm:col-span-2' : '',
              item.rightColumn ? 'sm:border-l' : '',
            ]"
          >
            <component
              :is="item.icon"
              :size="18"
              class="mt-0.5 shrink-0 text-accent"
              aria-hidden="true"
            />
            <div class="min-w-0">
              <dt class="text-xs font-medium text-muted">
                {{ item.label }}
              </dt>
              <dd class="mt-0.5 break-words text-sm text-ink">
                <ul
                  v-if="item.targetRoles"
                  class="grid grid-cols-2 gap-x-4 gap-y-1"
                  :aria-label="item.ariaLabel"
                >
                  <li
                    v-for="role in item.targetRoles"
                    :key="role"
                    class="min-w-0 break-words"
                  >
                    {{ role }}
                  </li>
                </ul>
                <a
                  v-else-if="item.isLink"
                  :href="item.value"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block break-all text-accent underline-offset-4 hover:underline"
                >
                  {{ item.value }}
                </a>
                <span v-else>{{ item.value }}</span>
              </dd>
            </div>
          </div>
        </dl>
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
        <div class="border-y border-line py-6">
          <p class="max-w-3xl whitespace-pre-line text-sm leading-[1.8] text-muted">
            {{ t('cv.selfEvaluation.content') }}
          </p>
        </div>
      </section>

      <!-- Publications list in CV -->
      <section>
        <SectionTitle :title="t('cv.publications.title')" />
        <ol class="border-t border-line">
          <li
            v-for="pub in enrichedPublications"
            :key="pub.id"
            class="border-b border-line py-5"
          >
            <p class="text-sm leading-relaxed text-ink">
              {{ pub.citation }}
            </p>
            <div class="mt-2 flex items-center gap-3">
              <span class="rounded-full border border-line bg-surface px-2.5 py-0.5 text-xs font-medium text-muted">
                {{ t('publications.impactFactor') }}={{ pub.impactFactor }}
              </span>
              <a
                :href="pub.doi"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex min-h-11 items-center text-xs font-medium text-accent underline-offset-4 hover:underline"
              >
                DOI
              </a>
              <a
                :href="pub.pdf"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex min-h-11 items-center text-xs font-medium text-accent underline-offset-4 hover:underline"
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
