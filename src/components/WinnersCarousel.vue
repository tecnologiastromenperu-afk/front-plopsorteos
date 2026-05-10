<script setup lang="ts">
import { onUnmounted, watch, onMounted, ref } from 'vue';
import emblaCarouselVue from 'embla-carousel-vue';
import { ArrowRight, ChevronLeft, ChevronRight, Trophy, UserRound } from 'lucide-vue-next';
import { prizes as catalogPrizes } from '@/data/content';

type Winner = {
  name: string
  prize: string
  prizeImage: string
  state: string
  dni: string
}

type WinnerApiRecord = Record<string, unknown>
type WinnersApiResponse = WinnerApiRecord[] | { winners?: WinnerApiRecord[]; data?: WinnerApiRecord[] }

const WINNERS_API_URL = import.meta.env.VITE_WINNERS_API_URL as string | undefined

const emit = defineEmits<{
  (e: 'show-more'): void;
}>();

const winners = ref<Winner[]>([])

const toText = (value: unknown, fallback = 'N/A') => {
  if (typeof value === 'string' && value.trim()) {
    return value.trim()
  }
  return fallback
}

const findPrizeImage = (prizeType: unknown): string => {
  if (typeof prizeType !== 'string' || !prizeType.trim()) return ''
  const match = catalogPrizes.find(
    (p) => p.id.toUpperCase().trim() === (prizeType as string).toUpperCase().trim()
  )
  return match?.image ?? ''
}

const normalizeWinner = (winner: WinnerApiRecord): Winner => {
  const prizeObj = winner.prize as Record<string, unknown> | undefined
  const prizeType = prizeObj?.type ?? winner.prizeType ?? winner.prize_type
  const prizeDescription = prizeObj?.description ?? winner.prizeDescription ?? winner.prize_description

  return {
    name: toText(winner.name ?? winner.fullName ?? winner.nombre),
    prize: toText(prizeType),
    prizeImage: findPrizeImage(prizeType),
    state: toText(prizeDescription),
    dni: '***' + toText(winner.dni ?? winner.documentId ?? winner.documento),
  }
}

const extractWinners = (payload: WinnersApiResponse): WinnerApiRecord[] => {
  if (Array.isArray(payload)) {
    return payload
  }
  if (Array.isArray(payload.winners)) {
    return payload.winners
  }
  if (Array.isArray(payload.data)) {
    return payload.data
  }
  return []
}

const fetchWinners = async () => {
  try {
    if (!WINNERS_API_URL) {
      winners.value = []
      return
    }
    const response = await fetch(WINNERS_API_URL)
    if (!response.ok) {
      throw new Error(`Error del servidor (${response.status})`)
    }
    const payload = await response.json() as WinnersApiResponse
    winners.value = extractWinners(payload).map(normalizeWinner)
  } catch {
    winners.value = []
  }
}

onMounted(() => {
  void fetchWinners()
})

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
  <section v-if="winners.length > 0" class="mt-8 md:mt-10 rounded-[24px] border border-white/10 bg-[#090b0fcc] backdrop-blur-sm">
    <div class="flex justify-between items-center px-4 md:px-6 py-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/15">
          <Trophy class="w-5 h-5 text-white/90" />
        </div>
        <div>
          <h2 class="font-bold text-white text-[20px] leading-none">Ganadores</h2>
          <p class="text-white/70 text-sm">Ellos ya ganaron</p>
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
            v-for="(winner, index) in winners"
            :key="index"
            class="flex-[0_0_92%] sm:flex-[0_0_86%] md:flex-[0_0_calc(33.333%-16px)] min-w-0"
          >
            <div class="bg-[#12151c] border border-white/10 rounded-[20px] p-3 md:p-4 h-full shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
              <div class="w-full h-44 md:h-48 mb-3 flex items-center justify-center overflow-hidden rounded-[16px] bg-white/5">
                <img :src="winner.prizeImage" :alt="winner.prize" class="w-full h-full object-cover" />
              </div>

              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full bg-[#4b2ea8] flex items-center justify-center shrink-0 border border-white/20 text-white">
                  <UserRound class="w-6 h-6" />
                </div>

                <div class="min-w-0 flex-1">
                  <h3 class="text-xl md:text-2xl text-white font-bold truncate">{{ winner.name }}</h3>
                  <p class="text-white/75 text-sm md:text-base leading-snug line-clamp-2">{{ winner.prize }}</p>
                </div>

                <div class="shrink-0 rounded-xl bg-white/10 border border-white/15 px-3 py-2 text-right">
                  <p class="text-[11px] text-white/70 uppercase tracking-wide">DNI</p>
                  <p class="text-white font-extrabold text-sm md:text-base">{{ winner.dni }}</p>
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
