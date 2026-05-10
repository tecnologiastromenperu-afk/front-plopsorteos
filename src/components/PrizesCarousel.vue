<script setup lang="ts">
import { onUnmounted, watch } from 'vue';
import emblaCarouselVue from 'embla-carousel-vue';
import { ArrowRight, ChevronLeft, ChevronRight, Gift } from 'lucide-vue-next';
import type { Prize } from '@/data/content';

defineProps<{
  prizes: Prize[];
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

const promoBadges = ['13%', '22%', '30%', 'S/89', 'S/39'];
const getPromoBadge = (index: number) => promoBadges[index % promoBadges.length];
</script>

<template>
  <section class="mt-0 rounded-[24px] border border-white/10 bg-[#090b0fcc] backdrop-blur-sm">
    <div class="flex justify-between items-center px-4 md:px-6 py-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/15">
          <Gift class="w-5 h-5 text-white/90" />
        </div>
        <div>
          <h2 class="font-bold text-white text-[20px] leading-none">Premios</h2>
          <p class="text-white/70 text-sm">Premios exclusivos</p>
        </div>
      </div>
      <button
        @click="emit('show-more')"
        class="flex items-center gap-1 md:gap-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white border border-white/25 px-3 md:px-6 py-2 text-sm md:text-base whitespace-nowrap"
      >
        <span>Mostrar más</span>
        <ArrowRight class="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </div>

    <div class="relative group px-3 md:px-6 pb-4 md:pb-6">
      <div class="overflow-hidden" ref="emblaRef">
        <div class="flex gap-4 md:gap-6">
          <div
            v-for="(prize, index) in prizes"
            :key="index"
            class="flex-[0_0_92%] sm:flex-[0_0_86%] md:flex-[0_0_calc(33.333%-16px)] min-w-0"
          >
            <div class="bg-[#12151c] border border-white/10 rounded-[20px] p-3 md:p-4 h-full shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
              <div class="w-full h-44 md:h-48 mb-3 flex items-center justify-center overflow-hidden rounded-[16px] bg-white">
                <img :src="prize.image" :alt="prize.name" class="w-full h-full object-cover" />
              </div>

              <div class="flex items-center gap-3">
                
                <div class="min-w-0 flex-1">
                  <h3 class="text-xl md:text-2xl text-white font-bold truncate">{{ prize.name }}</h3>
                  <p class="text-white/75 text-sm md:text-base leading-snug line-clamp-2">{{ prize.description }}</p>
                </div>

                
              </div>
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
