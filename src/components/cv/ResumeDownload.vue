<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Download } from 'lucide-vue-next'

const { t } = useI18n()

const resumes = [
  {
    label: 'cv.downloadEn',
    href: '/files/resume-en.pdf',
  },
  {
    label: 'cv.downloadZh',
    href: '/files/resume-zh.pdf',
  },
]
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <a
      v-for="resume in resumes"
      :key="resume.label"
      :href="resume.href"
      target="_blank"
      rel="noopener noreferrer"
      class="button-secondary"
    >
      <Download :size="16" aria-hidden="true" />
      {{ t(resume.label) }}
    </a>
  </div>
</template>
