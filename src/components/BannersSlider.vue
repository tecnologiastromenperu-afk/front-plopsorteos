<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue';
import emblaCarouselVue from 'embla-carousel-vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

import banner1 from '@/assets/banner1.png';
import banner2 from '@/assets/banner2.png';
import banner3 from '@/assets/banner3.png';

type BannerSlide = {
  src: string;
  alt: string;
};

const banners: BannerSlide[] = [
  { src: banner1, alt: 'Banner informativo 1' },
  { src: banner2, alt: 'Banner informativo 2' },
  { src: banner3, alt: 'Banner informativo 3' },
];

const [emblaRef, emblaApi] = emblaCarouselVue({
  loop: true,
  align: 'center',
  slidesToScroll: 1,
  containScroll: 'trimSnaps',
});
void emblaRef;

const selectedIndex = ref(0);
const slideCount = computed(() => banners.length);

let autoplayTimer: ReturnType<typeof setInterval> | undefined;

const updateSelectedIndex = () => {
  selectedIndex.value = emblaApi.value?.selectedScrollSnap() ?? 0;
};

const startAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
  }

  autoplayTimer = setInterval(() => {
    emblaApi.value?.scrollNext();
  }, 5000);
};

watch(emblaApi, (api, oldApi) => {
  if (oldApi) {
    oldApi.off('select', updateSelectedIndex);
    oldApi.off('reInit', updateSelectedIndex);
  }

  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = undefined;
  }

  if (!api) return;

  updateSelectedIndex();
  api.on('select', updateSelectedIndex);
  api.on('reInit', updateSelectedIndex);
  startAutoplay();
});

onUnmounted(() => {
  if (emblaApi.value) {
    emblaApi.value.off('select', updateSelectedIndex);
    emblaApi.value.off('reInit', updateSelectedIndex);
  }

  if (autoplayTimer) {
    clearInterval(autoplayTimer);
  }
});

const scrollPrev = () => emblaApi.value?.scrollPrev();
const scrollNext = () => emblaApi.value?.scrollNext();
const scrollTo = (index: number) => emblaApi.value?.scrollTo(index);
</script>

<template>
  <section class="w-full rounded-[24px] border border-white/10 bg-[#090b0fcc] backdrop-blur-sm">
    <div class="flex justify-between items-center px-4 md:px-6 py-4">
      
    </div>

    <div class="relative group px-3 md:px-6 pb-4 md:pb-6">
      <div class="overflow-hidden" ref="emblaRef">
        <div class="flex">
          <div
            v-for="(banner, index) in banners"
            :key="index"
            class="flex-[0_0_100%] min-w-0"
          >
            <div class="bg-[#12151c] border border-white/10 rounded-[20px] p-2 md:p-3 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
              <div class="w-full aspect-[1280/620] sm:aspect-[1280/500] md:aspect-[1280/320] bg-black/25 rounded-[16px] overflow-hidden">
              <img
                :src="banner.src"
                :alt="banner.alt"
                class="w-full h-full object-contain"
              />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        @click="scrollPrev"
        class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Banner anterior"
      >
        <ChevronLeft class="w-6 h-6" />
      </button>
      <button
        @click="scrollNext"
        class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Banner siguiente"
      >
        <ChevronRight class="w-6 h-6" />
      </button>

      <div class="mt-4 flex justify-center gap-2">
        <button
          v-for="index in slideCount"
          :key="index"
          @click="scrollTo(index - 1)"
          :class="[
            'h-2.5 rounded-full transition-all',
            selectedIndex === index - 1 ? 'w-8 bg-white' : 'w-2.5 bg-white/30 hover:bg-white/55',
          ]"
          :aria-label="`Ir al banner ${index}`"
        />
      </div>
    </div>
  </section>
</template>