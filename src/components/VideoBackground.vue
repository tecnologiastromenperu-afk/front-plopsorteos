<script setup lang="ts">
import { onMounted } from 'vue'
import fondoVideo from '@/assets/ANIMACION.webm'
import fondoPoster from '@/assets/fondoplop.png'

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

onMounted(() => {
  const videoElement = document.querySelector('video')
  if (videoElement) {
    videoElement.addEventListener('error', () => {
      console.warn('Video loading error, retrying...')
      videoElement.load()
    })
  }
})
</script>

<template>
  <div class="absolute inset-0 z-0 overflow-hidden">
    <video
      class="absolute inset-0 w-full h-full object-cover"
      :style="{ opacity: props.videoOpacity, zIndex: 0 }"
      :poster="fondoPoster"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      crossorigin="anonymous"
    >
      <source :src="fondoVideo" type="video/webm" />
    </video>
  </div>
</template>
