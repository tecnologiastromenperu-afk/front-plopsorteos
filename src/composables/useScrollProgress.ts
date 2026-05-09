import { ref, onMounted, onUnmounted } from 'vue'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

export function useScrollProgress() {
  const scrollProgress = ref(0)
  let rafId: number | null = null

  const updateProgress = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight

    if (maxScroll <= 0) {
      scrollProgress.value = 0
      return
    }

    scrollProgress.value = clamp01(window.scrollY / maxScroll)
  }

  const onScroll = () => {
    if (rafId !== null) {
      return
    }

    rafId = window.requestAnimationFrame(() => {
      updateProgress()
      rafId = null
    })
  }

  onMounted(() => {
    updateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)

    if (rafId !== null) {
      window.cancelAnimationFrame(rafId)
      rafId = null
    }
  })

  return { scrollProgress }
}
