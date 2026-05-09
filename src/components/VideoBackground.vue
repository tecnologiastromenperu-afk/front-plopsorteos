<script setup lang="ts">
import fondoVideo from '@/assets/fondo.webm'

const props = withDefaults(
  defineProps<{
    videoOpacity?: number
    overlayOpacity?: number
  }>(),
  {
    videoOpacity: 1,
    overlayOpacity: 0,
  },
)
</script>

<template>
  <div class="absolute inset-0 z-0 overflow-hidden">
    <video
      class="absolute inset-0 w-full h-full object-cover"
      :style="{ opacity: props.videoOpacity, zIndex: 0 }"
      autoplay
      muted
      loop
      playsinline
      poster="@/assets/fondo.png"
    >
      <source :src="fondoVideo" type="video/webm" />
    </video>
  </div>
</template>
