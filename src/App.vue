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
import BannersSlider from './components/BannersSlider.vue'
import PrizesSection from './components/PrizesSection.vue'
import WinnersSection from './components/WinnersSection.vue'
import CodeModal from './components/CodeModal.vue'
import AppFooter from './components/AppFooter.vue'

const activeSection = ref<Section>('inicio')
const isModalOpen = ref(false)
</script>

<template>
  <div class="min-h-screen bg-[#03193a] pb-20 md:pb-0">
    <div v-if="activeSection === 'inicio'" class="relative isolate h-screen w-full overflow-hidden">
      <VideoBackground class="absolute inset-0 z-0" :video-opacity="1" :overlay-opacity="0" />
      <div
        class="absolute bottom-0 left-0 right-0 h-[280px] sm:h-[360px] md:h-[440px] lg:h-[500px] z-10 pointer-events-none"
        style="background: linear-gradient(to bottom, transparent, #0E0E0F)"
      />
      <HeroSection
        class="absolute inset-0 z-20"
        @open-modal="isModalOpen = true"
      />
    </div>

    <AppNav v-model="activeSection" />
    
    <main class="relative z-20 container mx-auto px-4 py-8">
      <template v-if="activeSection === 'inicio'">
        <PrizesCarousel
          class="-mt-16 sm:-mt-20 md:-mt-28 lg:-mt-36 relative z-30"
          :prizes="prizes"
          @show-more="activeSection = 'premios'"
        />
        <BannersSlider />
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
