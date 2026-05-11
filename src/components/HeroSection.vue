<script setup lang="ts">
const emit = defineEmits<{ (e: 'open-modal'): void }>()
</script>

<template>
  <header class="relative w-full h-full flex items-center justify-center z-10">
    <div class="container mx-auto px-8 md:px-8 lg:px-10">
      <div class="max-w-6xl mx-auto text-center translate-y-1 sm:translate-y-12 md:translate-y-0">
        <p
          class="text-xl md:text-2xl font-black mb-10 uppercase opacity-90"
          style="color: white; text-shadow: -1px -1px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000"
        >
         GANA CON TUS PRODUCTOS FAVORITOS
        </p>

        <button
          @click="emit('open-modal')"
          class="bg-gradient-to-r from-[#004f9f] to-[#5C068C] text-white px-12 py-4 rounded-full font-black text-lg hover:scale-105 transition-all transform shadow-2xl uppercase tracking-wider border-4 border-white/30 hover:border-white/50 opacity-90 hover:opacity-100"
          style="text-shadow: -1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000"
        >
          ¡INGRESA TU CODIGO!
        </button>
      </div>
    </div>
  </header>
</template>
