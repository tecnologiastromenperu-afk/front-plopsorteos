<script setup lang="ts">
import fondoVideo from '@/assets/fondo.webm'
</script>

<template>
  <div class="fixed inset-0 w-full h-full z-0">
    <video
      class="absolute top-0 left-0 w-full h-full object-cover"
      autoplay
      muted
      loop
      playsinline
    >
      <source :src="fondoVideo" type="video/webm" />
    </video>
    <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90" />
  </div>
</template>
