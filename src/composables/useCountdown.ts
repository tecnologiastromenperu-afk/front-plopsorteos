import { reactive, onMounted, onUnmounted } from 'vue'

export function useCountdown(targetDateStr = '2026-12-31T23:59:59') {
  const timeLeft = reactive({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  let timer: ReturnType<typeof setInterval> | undefined

  const update = () => {
    const dist = new Date(targetDateStr).getTime() - Date.now()
    if (dist <= 0) {
      timeLeft.days = timeLeft.hours = timeLeft.minutes = timeLeft.seconds = 0
      return
    }
    timeLeft.days = Math.floor(dist / 86400000)
    timeLeft.hours = Math.floor((dist % 86400000) / 3600000)
    timeLeft.minutes = Math.floor((dist % 3600000) / 60000)
    timeLeft.seconds = Math.floor((dist % 60000) / 1000)
  }

  onMounted(() => { update(); timer = setInterval(update, 1000) })
  onUnmounted(() => { if (timer) clearInterval(timer) })

  return { timeLeft }
}
