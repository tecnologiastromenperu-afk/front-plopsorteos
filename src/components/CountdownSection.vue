<script setup lang="ts">
import { useCountdown } from '@/composables/useCountdown'

const { timeLeft } = useCountdown()

const steps = [
  'Toma una selfie con tu producto favorito',
  'Publica la foto en tus redes sociales',
  'Etiquetanos y usa el hashtag #MiProductoFavorito',
  'Entrarás automaticamente al sorteo adicional',
  'Siguenos en nuestras redes sociales',
]

const countdownUnits = [
  { key: 'days' as const, label: 'Dias' },
  { key: 'hours' as const, label: 'Horas' },
  { key: 'minutes' as const, label: 'Min' },
  { key: 'seconds' as const, label: 'Seg' },
]
</script>

<template>
  <section class="mt-20 mb-20">
    <h2 class="text-2xl font-bold text-white mb-6">Sorteo segunda oportunidad</h2>

    <div class="max-w-3xl mx-auto bg-white/20 backdrop-blur-sm rounded-[20px] p-6 text-center">
      <!-- Tarjeta de cuenta regresiva -->
      <div class="mb-6 max-w-md mx-auto">
        <div class="bg-white rounded-[20px] p-6 shadow-xl">
          <div class="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-[12px] -mx-6 -mt-6 mb-4 px-4 py-3">
            <span class="font-bold text-lg">FECHA DEL SORTEO</span>
            <div class="text-center mt-2 text-sm font-semibold">31 de Diciembre, 2026</div>
          </div>

          <div class="grid grid-cols-4 gap-2">
            <div v-for="unit in countdownUnits" :key="unit.key" class="text-center">
              <div class="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-3 mb-1">
                <div class="text-3xl font-bold text-purple-600">{{ timeLeft[unit.key] }}</div>
              </div>
              <div class="text-xs font-semibold text-gray-600 uppercase">{{ unit.label }}</div>
            </div>
          </div>
        </div>
      </div>

      <h3 class="text-2xl font-bold text-white mb-4">¿No ganaste esta vez?</h3>
      <p class="text-lg text-white/90 mb-6">
        ¡No te preocupes! Aún tienes la oportunidad de ganar premios increíbles.
      </p>

      <div class="bg-white/20 rounded-[20px] p-6 mb-6 text-left">
        <h4 class="text-xl font-bold text-white mb-4">Como participar:</h4>
        <ol class="space-y-3 text-white/90">
          <li v-for="(step, i) in steps" :key="i" class="flex items-start gap-3">
            <span
              class="flex-shrink-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold"
            >
              {{ i + 1 }}
            </span>
            <span>{{ step }}</span>
          </li>
        </ol>
      </div>

      <p class="text-white/80 text-sm">
        El sorteo se realizara mensualmente. ¡Participa cuantas veces quieras!
      </p>
    </div>
  </section>
</template>
