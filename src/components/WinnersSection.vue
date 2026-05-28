<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { prizes as catalogPrizes } from '@/data/content'

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
const emptyMessage = 'Ve y compra tus productos favoritos, hay muchos premios aun por descubrir!!'
const PAGE_SIZE = 6

const winners = ref<Winner[]>([])
const loading = ref(false)
const currentPage = ref(1)

const totalPages = computed(() => Math.max(1, Math.ceil(winners.value.length / PAGE_SIZE)))
const paginatedWinners = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  return winners.value.slice(start, end)
})

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) {
    return
  }

  currentPage.value = page
}

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
  loading.value = true

  try {
    if (!WINNERS_API_URL) {
      winners.value = []
      currentPage.value = 1
      return
    }

    const response = await fetch(WINNERS_API_URL)

    if (!response.ok) {
      throw new Error(`Error del servidor (${response.status})`)
    }

    const payload = await response.json() as WinnersApiResponse
    winners.value = extractWinners(payload).map(normalizeWinner)
    currentPage.value = 1
  } catch {
    winners.value = []
    currentPage.value = 1
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  void fetchWinners()
})
</script>

<template>
  <section class="py-20">
    <h2 class="text-2xl font-bold text-white mb-3">Ganadores Recientes</h2>

    <div
      v-if="loading"
      class="max-w-5xl mx-auto rounded-[20px] border border-white/10 bg-white/5 p-8 text-center text-white/80"
    >
      Cargando ganadores...
    </div>

    <div
      v-else-if="winners.length === 0"
      class="max-w-5xl mx-auto rounded-[20px] border border-white/10 bg-white/5 p-8 text-center text-white"
    >
      {{ emptyMessage }}
    </div>

    <div v-else class="max-w-5xl mx-auto">
      <div class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-sm font-semibold text-white/90">
          Ya tenemos mas de  <span class="font-black text-white">{{ winners.length }}</span> ganadores, <br />
          ¿serás tú el próximo?
        </p>

        <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 text-white sm:justify-end">
          <button
            type="button"
            class="rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
          >
            Anterior
          </button>

          <span class="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-bold">
            Página {{ currentPage }} de {{ totalPages }}
          </span>

          <button
            type="button"
            class="rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
          >
            Siguiente
          </button>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div
          v-for="(winner, index) in paginatedWinners"
          :key="`${currentPage}-${index}`"
          class="bg-white rounded-[20px] p-6 shadow-xl"
        >
          <!-- Header de la tarjeta -->
          <div
            class="bg-linear-to-r from-[#004f9f] to-[#5C068C] text-white rounded-t-[12px] -mx-6 -mt-6 mb-4 px-4 py-2"
          >
            <h3 class="text-2xl font-bold">¡GANADOR!</h3>
          </div>

          <div class="flex gap-4">
            <!-- Imagen del premio -->
            <div class="w-32 h-32 rounded-[12px] overflow-hidden shrink-0 bg-gray-100">
              <img
                v-if="winner.prizeImage"
                :src="winner.prizeImage"
                :alt="winner.prize"
                class="w-full h-full object-cover"
              />
              <div v-else class="flex h-full w-full items-center justify-center px-2 text-center text-xs text-gray-500">
                Premio sin imagen
              </div>
            </div>

            <!-- Datos del ganador -->
            <div class="space-y-2">
              <div>
                <p class="text-xs text-gray-500 font-semibold">Premio:</p>
                <p class="text-sm text-gray-800 font-bold">{{ winner.prize }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 font-semibold">Nombre y apellido:</p>
                <p class="text-sm text-gray-800 font-bold">{{ winner.name }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 font-semibold">Descripción:</p>
                <p class="text-sm text-gray-800 font-bold">{{ winner.state }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 font-semibold">Numero de DNI:</p>
                <p class="text-sm text-gray-800 font-bold">{{ winner.dni }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="totalPages > 1" class="mt-8 flex items-center justify-center gap-2 text-white">
        <button
          type="button"
          class="rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          Anterior
        </button>

        <span class="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-bold">
          Página {{ currentPage }} de {{ totalPages }}
        </span>

        <button
          type="button"
          class="rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          Siguiente
        </button>
      </div>
    </div>
  </section>
</template>
