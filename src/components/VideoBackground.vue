<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import videoDesktop from '@/assets/ANIMACION.webm'
import videoMobile from '@/assets/ANIMACION_VERTICAL.mp4'
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

const videoRef = ref<HTMLVideoElement | null>(null)
const isMobile = ref(false)
const currentVideo = ref(videoDesktop)
const currentType = ref('video/webm')

const updateVideo = () => {
  const mobile = window.matchMedia('(max-width: 768px)').matches
  if (mobile !== isMobile.value) {
    isMobile.value = mobile
    currentVideo.value = mobile ? videoMobile : videoDesktop
    currentType.value = mobile ? 'video/mp4' : 'video/webm'
  }
}

watch(currentVideo, () => {
  if (videoRef.value) {
    videoRef.value.load()
  }
})

onMounted(() => {
  isMobile.value = window.matchMedia('(max-width: 768px)').matches
  currentVideo.value = isMobile.value ? videoMobile : videoDesktop
  currentType.value = isMobile.value ? 'video/mp4' : 'video/webm'

  window.addEventListener('resize', updateVideo)

  if (videoRef.value) {
    videoRef.value.addEventListener('error', () => {
      console.warn('Video loading error, retrying...')
      videoRef.value?.load()
    })
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateVideo)
})
</script>

<template>
  <div class="absolute inset-0 z-0 overflow-hidden">
    <video
      ref="videoRef"
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
      <source :src="currentVideo" :type="currentType" />
    </video>
  </div>
</template>
