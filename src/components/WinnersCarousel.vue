<script setup lang="ts">
import { onUnmounted, watch } from 'vue';
import emblaCarouselVue from 'embla-carousel-vue';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import type { Winner } from '@/data/content';

defineProps<{
  winners: Winner[];
}>();

const emit = defineEmits<{
  (e: 'show-more'): void;
}>();

const [emblaRef, emblaApi] = emblaCarouselVue({
  loop: true,
  align: 'center',
  slidesToScroll: 1,
  containScroll: 'trimSnaps',
});
void emblaRef;

let autoplayTimer: ReturnType<typeof setInterval> | undefined;

watch(emblaApi, (api) => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = undefined;
  }
  if (!api) return;
  autoplayTimer = setInterval(() => api.scrollNext(), 3000);
});

onUnmounted(() => {
  if (autoplayTimer) clearInterval(autoplayTimer);
});

const scrollPrev = () => emblaApi.value?.scrollPrev();
const scrollNext = () => emblaApi.value?.scrollNext();
</script>

<template>
  <section class="mt-20 rounded-[20px] bg-[#00000033]">
    <div class="flex justify-between items-center px-6 py-4">
      <h2 class="font-bold text-white text-[20px]">Ellos ya ganaron</h2>
      <button
        @click="emit('show-more')"
        class="flex items-center gap-1 md:gap-2 bg-white/20 hover:bg-white/30 rounded-full transition-all text-white border border-white/30 px-3 md:px-6 py-2 text-sm md:text-base whitespace-nowrap"
      >
        <span>Ver mas</span>
        <ArrowRight class="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </div>

    <div class="relative group px-6 pb-6">
      <div class="overflow-hidden" ref="emblaRef">
        <div class="flex gap-6 md:gap-8">
          <div
            v-for="(winner, index) in winners"
            :key="index"
            class="flex-[0_0_85%] md:flex-[0_0_calc(33.333%-21px)] min-w-0"
          >
            <div class="bg-white/20 backdrop-blur-sm rounded-[20px] p-6 text-center h-full">
              <div class="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-white">
                {{ winner.name.charAt(0) }}
              </div>
              <h3 class="text-xl text-white mb-2 font-bold">{{ winner.name }}</h3>
              <p class="text-white/80 mb-1">Gano: {{ winner.prize }}</p>
              <p class="text-white/60 text-sm">{{ winner.date }}</p>
            </div>
          </div>
        </div>
      </div>

      <button
        @click="scrollPrev"
        class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Anterior"
      >
        <ChevronLeft class="w-6 h-6" />
      </button>
      <button
        @click="scrollNext"
        class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Siguiente"
      >
        <ChevronRight class="w-6 h-6" />
      </button>
    </div>
  </section>
</template>
