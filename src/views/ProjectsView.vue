<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import { projects } from '@/data/projects'

const { t } = useI18n()
</script>

<template>
  <div class="py-16 sm:py-20">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <SectionTitle
        :title="t('projects.title')"
        :subtitle="t('projects.subtitle')"
      />

      <div class="space-y-6">
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>
  </div>
</template>
