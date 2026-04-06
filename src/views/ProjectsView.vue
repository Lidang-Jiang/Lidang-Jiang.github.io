<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import { projects } from '@/data/projects'
import { getProjectGroups } from '@/utils/project-groups'

const { t, locale } = useI18n()

const lang = computed(() => locale.value as 'en' | 'zh')
const projectGroups = computed(() => getProjectGroups(projects))
</script>

<template>
  <div class="py-16 sm:py-20">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <SectionTitle
        :title="t('projects.title')"
        :subtitle="t('projects.subtitle')"
      />

      <div class="space-y-10">
        <section
          v-for="group in projectGroups"
          :key="group.category.en"
          class="space-y-6"
        >
          <h2 class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white sm:text-xl">
            {{ group.category[lang] }}
          </h2>

          <div class="space-y-6">
            <ProjectCard
              v-for="project in group.projects"
              :key="project.id"
              :project="project"
            />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
