<script setup lang="ts">
import { winners } from '@/data/content'
</script>

<template>
  <section class="py-20">
    <h2 class="text-2xl font-bold text-white mb-6">Ganadores Recientes</h2>

    <div class="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      <div
        v-for="(winner, index) in winners"
        :key="index"
        class="bg-white rounded-[20px] p-6 shadow-xl"
      >
        <!-- Header de la tarjeta -->
        <div
          class="bg-gradient-to-r from-[#004f9f] to-[#5C068C] text-white rounded-t-[12px] -mx-6 -mt-6 mb-4 px-4 py-2"
        >
          <h3 class="text-2xl font-bold">¡GANADOR!</h3>
        </div>

        <div class="flex gap-4">
          <!-- Imagen del premio -->
          <div class="w-32 h-32 rounded-[12px] overflow-hidden shrink-0">
            <img
              :src="winner.prizeImage"
              :alt="winner.prize"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Datos del ganador -->
          <div class="space-y-2">
            <div>
              <p class="text-xs text-gray-500 font-semibold">Estado Premio:</p>
              <p class="text-sm text-gray-800 font-bold">Descubierto</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 font-semibold">Nombre y apellido:</p>
              <p class="text-sm text-gray-800 font-bold">{{ winner.name }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 font-semibold">Departamento:</p>
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
  </section>
</template>
