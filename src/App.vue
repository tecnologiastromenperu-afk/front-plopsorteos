<script setup lang="ts">
import { ref } from 'vue'
import type { Section } from './types'
import { prizes, winners } from './data/content'

import VideoBackground from './components/VideoBackground.vue'
import AppNav from './components/AppNav.vue'
import HeroSection from './components/HeroSection.vue'
import PrizesCarousel from './components/PrizesCarousel.vue'
import WinnersCarousel from './components/WinnersCarousel.vue'
import CountdownSection from './components/CountdownSection.vue'
import PrizesSection from './components/PrizesSection.vue'
import WinnersSection from './components/WinnersSection.vue'
import CodeModal from './components/CodeModal.vue'
import AppFooter from './components/AppFooter.vue'

const activeSection = ref<Section>('inicio')
const isModalOpen = ref(false)
</script>

<template>
  <div class="min-h-screen pb-20 md:pb-0">
    <VideoBackground />
    <AppNav v-model="activeSection" />

    <HeroSection
      v-if="activeSection === 'inicio'"
      @open-modal="isModalOpen = true"
    />

    <main class="relative z-10 container mx-auto px-4 py-8">
      <template v-if="activeSection === 'inicio'">
        <PrizesCarousel :prizes="prizes" @show-more="activeSection = 'premios'" />
        <WinnersCarousel :winners="winners" @show-more="activeSection = 'ganadores'" />
        <CountdownSection />
      </template>

      <PrizesSection v-else-if="activeSection === 'premios'" />
      <WinnersSection v-else-if="activeSection === 'ganadores'" />
    </main>

    <CodeModal v-model="isModalOpen" />
    <AppFooter />
  </div>
</template>
