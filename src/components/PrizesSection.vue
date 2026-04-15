<script setup lang="ts">
import { ref, computed } from 'vue'
import { prizes, selfiePrizes, type Prize } from '@/data/content'
import type { PrizeFilter } from '@/types'

const prizeFilter = ref<PrizeFilter>('todos')
const visiblePrizesCount = ref(9)

const filterOptions: { value: PrizeFilter; label: string }[] = [
  { value: 'todos', label: 'Todos los premios' },
  { value: 'descubiertos', label: 'Premios descubiertos' },
  { value: 'por-descubrir', label: 'Premios por descubrir' },
]

// Los primeros 30 índices son "descubiertos"
const discoveredIndices = computed(
  () => new Set(Array.from({ length: Math.min(30, prizes.length) }, (_, i) => i)),
)

const filteredPrizes = computed(() =>
  prizes.filter((_, index) => {
    const isDiscovered = discoveredIndices.value.has(index)
    if (prizeFilter.value === 'descubiertos') return isDiscovered
    if (prizeFilter.value === 'por-descubrir') return !isDiscovered
    return true
  }),
)

const visiblePrizes = computed(() => filteredPrizes.value.slice(0, visiblePrizesCount.value))
const hasMorePrizes = computed(() => filteredPrizes.value.length > visiblePrizesCount.value)

const isDiscoveredPrize = (prize: Prize) =>
  discoveredIndices.value.has(prizes.indexOf(prize))

const showMorePrizes = () => {
  visiblePrizesCount.value += 9
}
</script>

<template>
  <!-- Grid de premios con filtros -->
  <section class="py-20">
    <div class="max-w-5xl mx-auto">
      <h2 class="text-2xl font-bold text-white mb-6">Premios Disponibles</h2>

      <!-- Filtros -->
      <div class="flex flex-wrap gap-3 mb-8">
        <button
          v-for="opt in filterOptions"
          :key="opt.value"
          @click="prizeFilter = opt.value"
          :class="[
            'px-6 py-3 rounded-full font-semibold transition-all',
            prizeFilter === opt.value
              ? 'bg-white text-purple-600'
              : 'bg-white/20 text-white hover:bg-white/30',
          ]"
        >
          {{ opt.label }}
        </button>
      </div>

      <!-- Grid de premios -->
      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="(prize, index) in visiblePrizes"
          :key="index"
          class="bg-white/20 backdrop-blur-sm rounded-[20px] p-6 text-center relative"
        >
          <div
            v-if="isDiscoveredPrize(prize)"
            class="absolute top-4 right-4 bg-gradient-to-r from-[#004f9f] to-[#5C068C] text-white px-3 py-1 rounded-full text-xs font-bold"
          >
            DESCUBIERTO
          </div>
          <div class="w-full h-48 mb-4 overflow-hidden rounded-[12px]">
            <img :src="prize.image" :alt="prize.name" class="w-full h-full object-cover" />
          </div>
          <h3 class="text-2xl font-bold text-white mb-2">{{ prize.name }}</h3>
          <p class="text-white/90">{{ prize.description }}</p>
        </div>

        <div v-if="hasMorePrizes" class="flex items-center justify-center md:col-span-3">
          <button
            @click="showMorePrizes"
            class="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
          >
            Ver mas premios
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Sorteo selfie -->
  <section class="pb-20">
    <h2 class="text-2xl font-bold text-white mb-6">Sorteo Postea tu selfie</h2>
    <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      <div
        v-for="(prize, index) in selfiePrizes"
        :key="index"
        class="bg-white/20 backdrop-blur-sm rounded-[20px] p-6 text-center"
      >
        <div class="w-full h-48 mb-4 overflow-hidden rounded-[12px]">
          <img :src="prize.image" :alt="prize.name" class="w-full h-full object-cover" />
        </div>
        <h3 class="text-2xl font-bold text-white mb-2">{{ prize.name }}</h3>
        <p class="text-white/90">{{ prize.description }}</p>
      </div>
    </div>
  </section>
</template>
