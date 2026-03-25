<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import AboutSection from '@/components/home/AboutSection.vue'
import CollaborationSection from '@/components/home/CollaborationSection.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

useScrollReveal()
</script>

<template>
  <div>
    <HeroSection />
    <div class="reveal">
      <AboutSection />
    </div>
    <div class="reveal">
      <CollaborationSection />
    </div>
  </div>
</template>
