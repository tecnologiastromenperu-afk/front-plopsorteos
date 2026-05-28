<script setup lang="ts">
const emit = defineEmits<{ (e: 'open-modal'): void }>()
</script>

<template>
  <header class="relative w-full h-full flex items-center justify-center z-10">
    <div class="container mx-auto px-8 md:px-8 lg:px-10">
      <div class="max-w-6xl mx-auto text-center translate-y-1 sm:translate-y-12 md:translate-y-0">
        <button
          @click="emit('open-modal')"
          class="cta-button bg-linear-to-r from-[#004f9f] to-[#5C068C] text-white px-18 py-6 rounded-full font-black text-lg hover:scale-105 transition-all transform shadow-2xl uppercase tracking-wider border-4 border-white/30 hover:border-white/50 opacity-90 hover:opacity-100 mt-100"
        >
          ¡INGRESA TU CODIGO!
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.cta-button {
  position: relative;
  isolation: isolate;
  text-shadow: -1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000;
}

.cta-button::before {
  content: '';
  position: absolute;
  inset: -10px;
  border-radius: 9999px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.85) 0%, rgba(92, 6, 140, 0.5) 45%, rgba(0, 79, 159, 0.25) 70%, rgba(0, 0, 0, 0) 100%);
  filter: blur(10px);
  z-index: -1;
  pointer-events: none;
  animation: auraPulse 1.8s ease-in-out infinite;
}

.cta-button:hover::before {
  animation-duration: 2s;
  filter: blur(12px);
}

@keyframes auraPulse {
  0%,
  100% {
    opacity: 0.75;
    transform: scale(0.98);
  }

  50% {
    opacity: 1;
    transform: scale(1.06);
  }
}
</style>
