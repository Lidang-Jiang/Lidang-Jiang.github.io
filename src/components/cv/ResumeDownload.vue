<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Download } from "lucide-vue-next";

const { t } = useI18n();

const resumes = [
  {
    label: "cv.downloadEn",
    href: "/files/resume-en.pdf",
  },
  {
    label: "cv.downloadZh",
    href: "/files/resume-zh.pdf",
  },
];
</script>

<template>
  <div class="flex flex-wrap justify-center gap-4">
    <a
      v-for="resume in resumes"
      :key="resume.label"
      :href="resume.href"
      target="_blank"
      class="inline-flex items-center gap-2 rounded-xl border border-primary-200 bg-primary-50 px-5 py-2.5 text-sm font-medium text-primary-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-100 hover:shadow-md dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-300 dark:hover:bg-primary-900/50"
    >
      <Download :size="16" />
      {{ t(resume.label) }}
    </a>
  </div>
</template>
