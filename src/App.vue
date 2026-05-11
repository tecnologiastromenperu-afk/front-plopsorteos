<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Section } from './types'
import { prizes } from './data/content'
import { termsContent, termsPdfNames, termsPdfUrls, termsTitles, type TermsKind } from './data/terms'

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
import TermsModal from './components/TermsModal.vue'

const activeSection = ref<Section>('inicio')
const isModalOpen = ref(false)
const activeTerms = ref<TermsKind | null>(null)

const openTerms = (kind: TermsKind) => {
  activeTerms.value = kind
}

const closeTerms = () => {
  activeTerms.value = null
}

const activeTermsTitle = computed(() => (activeTerms.value ? termsTitles[activeTerms.value] : ''))
const activeTermsContent = computed(() => (activeTerms.value ? termsContent[activeTerms.value] : ''))
const activeTermsPdfUrl = computed(() => (activeTerms.value ? termsPdfUrls[activeTerms.value] : ''))
const activeTermsPdfName = computed(() => (activeTerms.value ? termsPdfNames[activeTerms.value] : ''))
</script>

<template>
  <div class="min-h-screen bg-[#03193a] pb-20 md:pb-0 relative">
    <div v-if="activeSection === 'inicio'" class="relative isolate h-screen w-full overflow-hidden">
      <VideoBackground class="absolute inset-0 z-0" :video-opacity="1" :overlay-opacity="0" />
      <div
        class="absolute bottom-0 left-0 right-0 h-70 sm:h-90 md:h-110 lg:h-125 z-10 pointer-events-none"
        style="background: linear-gradient(to bottom, transparent, #0E0E0F)"
      />
      <HeroSection
        class="absolute inset-0 z-20"
        @open-modal="isModalOpen = true"
      />
    </div>

    <!-- BannersSlider positioned at the bottom of the video -->
    <template v-if="activeSection === 'inicio'">
      <div class="absolute left-0 right-0 top-[90vh] z-150 pointer-events-auto -translate-y-1">
        <div class="container mx-auto px-4">
          <BannersSlider />
        </div>
      </div>
    </template>

    <AppNav v-model="activeSection" />
    
    <main class="relative z-20 container mx-auto px-4 py-8">
      <template v-if="activeSection === 'inicio'">
        <PrizesCarousel
          class="mt-36 sm:mt-40 md:mt-52 lg:mt-56 xl:mt-100"
          :prizes="prizes"
          @show-more="activeSection = 'premios'"
        />
        <WinnersCarousel @show-more="activeSection = 'ganadores'" />

        <CountdownSection @open-second-chance-terms="openTerms('second-chance')" />
      </template>

      <template v-else-if="activeSection === 'premios'">
        <BannersSlider class="mt-[71px] mb-[-50px]" />
        <PrizesSection />
      </template>
      <template v-else-if="activeSection === 'ganadores'">
        <BannersSlider class="mt-[71px] mb-[-50px]" />
        <WinnersSection />
      </template>
    </main>   
    
    <CodeModal v-model="isModalOpen" @open-general-terms="openTerms('general')" />
    <AppFooter
      @open-general-terms="openTerms('general')"
      @open-second-chance-terms="openTerms('second-chance')"
    />
    <TermsModal
      :model-value="activeTerms !== null"
      :title="activeTermsTitle"
      :content="activeTermsContent"
      :download-url="activeTermsPdfUrl"
      :download-name="activeTermsPdfName"
      @update:modelValue="closeTerms"
    />
  </div>
</template>
