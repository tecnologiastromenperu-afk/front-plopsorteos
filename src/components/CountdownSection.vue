<script setup lang="ts">
import { useCountdown } from '@/composables/useCountdown'

const emit = defineEmits<{ (e: 'open-second-chance-terms'): void }>()

const { timeLeft } = useCountdown()


const steps = [
  'Síguenos en nuestras redes sociales',
  'Tómate una selfie con tu producto MAX-FL favorito',
  'Publica la foto en tus redes sociales',
  'Etiquéta a la cuenta oficial de PLOPPERÚ y usa el hashtag #MiProductoFavorito',
  'Entrarás automáticamente al sorteo adicional',
  
]

const countdownUnits = [
  { key: 'days' as const, label: 'Días' },
  { key: 'hours' as const, label: 'Horas' },
  { key: 'minutes' as const, label: 'Min' },
  { key: 'seconds' as const, label: 'Seg' },
]
</script>

<template>
  <section class="mt-8 md:mt-10 rounded-3xl border border-white/10 bg-[#090b0fcc] backdrop-blur-sm">
    <!-- Header -->
    <div class="px-4 md:px-6 py-4 text-center">
      <h2 class="font-bold text-white text-[20px] leading-none mb-2">Sorteo Segunda Oportunidad</h2>
      <p class="text-white/70 text-sm">Otra chance para ganar increíbles premios</p>
    </div>

    <!-- Card Countdown -->
    <div class="px-3 md:px-6 pb-4 md:pb-6">
      <div class="bg-[#12151c] border border-white/10 rounded-[20px] p-4 md:p-6">
        <!-- Header con gradiente -->
        <div class="bg-linear-to-r from-[#004f9f] to-[#5C068C] text-white rounded-[12px] -mx-4 md:-mx-6 -mt-4 md:-mt-6 mb-6 px-4 md:px-6 py-3 text-center">
          <span class="font-bold text-sm md:text-base uppercase tracking-wide">POSTEA TU SELFIE Y ETIQUÉTANOS HASTA EL</span>
          <div class="mt-2 text-center text-sm font-semibold">26 de junio de 2026, 11:59 PM </div>
        </div>

        <!-- Grid Countdown -->
        <div class="grid grid-cols-4 gap-3 md:gap-4 mb-6">
          <div v-for="unit in countdownUnits" :key="unit.key" class="text-center">
            <div class="bg-linear-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-3 md:p-4 mb-2">
              <div class="text-2xl md:text-3xl font-bold text-white">{{ timeLeft[unit.key] }}</div>
            </div>
            <div class="text-xs font-semibold text-white/70 uppercase">{{ unit.label }}</div>
          </div>
        </div>

        <!-- Descripción -->
        <p class="text-sm md:text-base text-white/90 mb-4 text-center">
          ¡No te preocupes! Aún tienes la oportunidad de ganar premios increíbles. <br />
          ¡Los sorteos se realizarán todos los sábados desde el 16 de mayo hasta el 26 de junio!
        </p>

        <!-- Steps Section -->
        <div class="bg-white/5 rounded-[12px] border border-white/10 p-4 md:p-5">
          <h4 class="text-base md:text-lg font-bold text-white mb-4">Cómo participar:</h4>
          <ol class="space-y-2 md:space-y-3 text-white/85 text-sm md:text-base">
            <li v-for="(step, i) in steps" :key="i" class="flex items-start gap-3">
              <span
                class="shrink-0 w-5 h-5 md:w-6 md:h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs md:text-sm font-bold text-white"
              >
                {{ i + 1 }}
              </span>
              <span class="pt-0.5">{{ step }}</span>
            </li>
          </ol>
        </div>

        <!-- Footer note -->
        <p class="text-white/70 text-center text-xs md:text-sm mt-4">
          ¡Participa cuantas veces quieras!
        </p>

        <div class="mt-3 text-center">
          <button
            type="button"
            class="text-sm font-semibold text-blue-500 transition hover:text-white hover:underline"
            @click="emit('open-second-chance-terms')"
          >
            Ver términos de la segunda chance
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
