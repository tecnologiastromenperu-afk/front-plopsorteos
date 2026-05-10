<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { prizes as catalogPrizes } from '@/data/content'
import winnerVisual from '@/assets/GANADORWEB.png'
import facebookIcon from '@/assets/facebook.png'
import instagramIcon from '@/assets/instagram.png'
import tiktokIcon from '@/assets/tiktok.png'

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string
const API_URL = import.meta.env.VITE_API_URL as string

type ValidationPrize = {
  type: string
  description: string
}

type ValidationResponse = {
  success: boolean
  message: string
  prize?: ValidationPrize
  reason?: string
}

defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'open-general-terms'): void
}>()

const formData = reactive({
  code: '',
  fullName: '',
  documentId: '',
  email: '',
  phone: '',
  product: '',
  acceptTerms: false,
})

const result = ref<ValidationResponse | null>(null)
const loading = ref(false)
const errorMessage = ref<string | null>(null)
const isWinner = computed(() => Boolean(result.value?.success && result.value?.prize))
const isInvalidCode = computed(() => result.value?.reason === 'invalid_code')
const isFormValid = computed(() =>
  Boolean(
    formData.code.trim() &&
    formData.fullName.trim() &&
    formData.documentId.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    formData.product &&
    formData.acceptTerms,
  ),
)
const reasonMessage = computed(() => {
  switch (result.value?.reason) {
    case 'max_uses_exceeded':
      return 'El código ya fué utilizado'
    case 'code_expired':
      return 'El código ya expiró'
    case 'invalid_code':
      return 'Código no ganador'
    default:
      return result.value?.reason ?? 'No fue posible validar el codigo en este momento.'
  }
})

const resultTitle = computed(() => {
  if (isWinner.value) {
    return '¡Guauuu!'
  }

  if (result.value?.reason === 'invalid_code') {
    return '¡Guau... casi!'
  }

  return 'Resultado de tu codigo'
})

const resultDescription = computed(() => {
  if (isWinner.value) {
    return result.value?.prize?.description ?? result.value?.message ?? ''
  }

  if (result.value?.reason === 'invalid_code') {
    return 'Tu codigo no resulto ganador en esta ocasion.'
  }

  return result.value?.message ?? ''
})

const resultSupportText = computed(() => {
  if (isWinner.value) {
    return `Nuestro equipo se pondra en contacto al correo ${formData.email} para coordinar la entrega de tu premio.`
  }

  if (result.value?.reason === 'invalid_code') {
    return 'Puedes seguirnos en nuestras redes sociales y postear una foto selfie con tu producto MAX-FL para participar por la segunda chance.'
  }

  return 'Si el problema persiste, vuelve a intentarlo o comunicate con soporte para revisar tu participacion.'
})

const resultPrizeImage = computed(() => {
  const prizeType = result.value?.prize?.type?.trim().toUpperCase()
  const prizeDescription = result.value?.prize?.description?.trim().toUpperCase()

  if (!prizeType && !prizeDescription) {
    return ''
  }

  const match = catalogPrizes.find((prize) => {
    const id = prize.id.trim().toUpperCase()
    const description = prize.description.trim().toUpperCase()
    const name = prize.name.trim().toUpperCase()

    return id === prizeType || id === prizeDescription || description === prizeType || description === prizeDescription || name === prizeType
  })

  return match?.image ?? ''
})

const executeRecaptcha = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    window.grecaptcha.ready(async () => {
      try {
        const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'validate_code' })
        resolve(token)
      } catch {
        reject(new Error('Error al verificar reCAPTCHA'))
      }
    })
  })
}

const handleSubmitCode = async () => {
  loading.value = true
  errorMessage.value = null
  result.value = null

  try {
    const recaptchaToken = await executeRecaptcha()

    const body = JSON.stringify({
      code: formData.code.trim().toUpperCase(),
      fullName: formData.fullName,
      documentId: formData.documentId,
      email: formData.email,
      phone: formData.phone,
      product: formData.product,
      recaptchaToken,
    })

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    })

    let data: ValidationResponse | null = null

    try {
      data = await response.json() as ValidationResponse
    } catch {
      throw new Error('La respuesta del servidor no es válida')
    }

    if (!response.ok) {
      if (data.reason || data.message) {
        result.value = data
        return
      }

      throw new Error(`Error del servidor (${response.status})`)
    }

    result.value = data
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : 'Ocurrió un error inesperado. Intenta nuevamente.'
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  emit('update:modelValue', false)
  result.value = null
  errorMessage.value = null
  formData.code = ''
  formData.fullName = ''
  formData.documentId = ''
  formData.email = ''
  formData.phone = ''
  formData.product = ''
  formData.acceptTerms = false
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 overflow-y-auto bg-black/60 p-3 backdrop-blur-sm sm:flex sm:items-center sm:justify-center sm:p-4"
    >
      <div
        class="mx-auto my-3 w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl max-sm:min-h-[calc(100dvh-1.5rem)] max-sm:rounded-3xl sm:my-6 sm:max-h-[calc(100dvh-2rem)] sm:p-8 overflow-y-auto"
      >

        <!-- Header del modal -->
        <div v-if="!result" class="text-center mb-6">
          <div
            class="mx-auto mb-1 flex h-20 w-30 items-center justify-center  bg-linear-to-br from-[#fdfdfd] to-[#fdfdfd]"
          >
            <img src="@/assets/logo_max.png" alt="Logo MAX" class="" />
          </div>
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Validar codigo</h2>
          <p class="text-gray-600 text-sm">Completa el formulario para validar tu codigo promocional</p>
        </div>

        <!-- Formulario -->
        <form v-if="!result" @submit.prevent="handleSubmitCode" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Codigo promocional *</label>
            <input
              v-model="formData.code"
              type="text"
              placeholder="Ej: WIN001"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004f9f] focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Nombre completo *</label>
            <input
              v-model="formData.fullName"
              type="text"
              placeholder="Juan Perez Garcia"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004f9f] focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Documento de identidad *</label>
            <input
              v-model="formData.documentId"
              type="text"
              placeholder="12345678"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004f9f] focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Correo electronico *</label>
            <input
              v-model="formData.email"
              type="email"
              placeholder="correo@ejemplo.com"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004f9f] focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Telefono *</label>
            <input
              v-model="formData.phone"
              type="tel"
              placeholder="+51 999 999 999"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004f9f] focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Producto adquirido *</label>
            <select
              v-model="formData.product"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004f9f] focus:border-transparent transition-all"
              required
            >
              <option value="">Selecciona un producto</option>
              <option value="MAX-FL GRANDE">MAX-FL GRANDE</option>
              <option value="MAX-FL MEDIANO">MAX-FL MEDIANO</option>
              <option value="MAX-FL PEQUENO">MAX-FL PEQUENO</option>
            </select>
          </div>
          <label class="flex items-start gap-3 pt-1">
            <input
              v-model="formData.acceptTerms"
              type="checkbox"
              class="mt-0.5 w-5 h-5 text-[#004f9f] rounded cursor-pointer"
              required
            />
            <span class="text-sm text-gray-700 cursor-pointer">
              Acepto los
              <button
                type="button"
                class="text-[#004f9f] font-semibold hover:underline"
                @click.prevent="emit('open-general-terms')"
              >
                terminos y condiciones
              </button>
              y la politica de privacidad
            </span>
          </label>

          <!-- Error message -->
          <div v-if="errorMessage" class="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            ⚠️ {{ errorMessage }}
          </div>

          <div class="flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row">
            <button
              type="button"
              @click="resetForm"
              :disabled="loading"
              class="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="loading || !isFormValid"
              class="flex-1 rounded-lg bg-linear-to-r from-[#004f9f] to-[#5C068C] px-6 py-3 font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span v-if="loading" class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Validando...
              </span>
              <span v-else>Validar codigo</span>
            </button>
          </div>

          <!-- reCAPTCHA badge notice -->
          <p class="text-center text-xs text-gray-400">
            Protegido por reCAPTCHA &mdash;
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" class="underline hover:text-gray-600">Privacidad</a>
            &middot;
            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" class="underline hover:text-gray-600">Términos</a>
          </p>
        </form>

        <!-- Resultado -->
        <div v-else class="py-2">
          <template v-if="isWinner">
            <div class="rounded-4xl bg-[#f3f4f6] p-3 sm:p-4">
              <div class="mx-auto max-w-4xl">
                <div class="flex flex-col items-center gap-4 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
                  <div class="relative z-10 w-full max-w-55 lg:pt-14">
                    <img :src="winnerVisual" alt="Mascota MAX-FL" class="w-full object-contain" />
                  </div>

                  <div class="relative w-full overflow-hidden rounded-[1.75rem] bg-[#0047ab] px-4 py-6 text-center text-white shadow-[0_18px_45px_rgba(0,41,110,0.28)] sm:px-6 lg:min-h-90 lg:px-10 lg:py-10">
                    <div class="confetti-layer pointer-events-none" aria-hidden="true">
                      <span class="confetti-piece confetti-piece--a" />
                      <span class="confetti-piece confetti-piece--b" />
                      <span class="confetti-piece confetti-piece--c" />
                      <span class="confetti-piece confetti-piece--d" />
                      <span class="confetti-piece confetti-piece--e" />
                      <span class="confetti-piece confetti-piece--f" />
                      <span class="confetti-piece confetti-piece--g" />
                      <span class="confetti-piece confetti-piece--h" />
                      <span class="confetti-piece confetti-piece--i" />
                      <span class="streamer streamer--left" />
                      <span class="streamer streamer--right" />
                    </div>

                    <div class="text-[2.2rem] font-black uppercase leading-none sm:text-6xl">
                      {{ resultTitle }}
                    </div>

                    <div class="mx-auto mt-6 flex min-h-33 w-full max-w-130 items-center justify-center rounded-3xl bg-white px-5 py-6 text-center text-xl font-black leading-tight text-[#111827] shadow-[0_10px_24px_rgba(0,0,0,0.18)] sm:text-[1.9rem]">
                      <div class="space-y-2">
                        <p class="text-sm font-bold uppercase tracking-[0.2em] text-[#0047ab]">Tu premio</p>
                        <p>{{ resultDescription }}</p>
                      </div>
                    </div>

                    <div class="mx-auto mt-6 max-w-135 rounded-3xl bg-white px-5 py-5 text-[#1f2937] shadow-[0_10px_24px_rgba(0,0,0,0.14)]">
                      <div v-if="resultPrizeImage" class="mb-4 overflow-hidden rounded-[1.25rem] bg-[#f7f8fb] p-4">
                        <img :src="resultPrizeImage" :alt="result?.prize?.description || result?.prize?.type || 'Premio ganado'" class="mx-auto max-h-44 w-auto object-contain" />
                      </div>

                      <p class="text-base font-bold leading-7 sm:text-lg">
                        {{ resultSupportText }}
                      </p>
                    </div>

                    <div class="mt-6 flex justify-center gap-5">
                      <a href="https://www.instagram.com/plopperu?igsh=czBnb3gxOXViajJo" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <img :src="instagramIcon" alt="Instagram" class="h-12 w-12 object-contain transition-transform hover:scale-110" />
                      </a>
                      <a href="https://www.facebook.com/share/1Du3Fbx5wF/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <img :src="facebookIcon" alt="Facebook" class="h-12 w-12 object-contain transition-transform hover:scale-110" />
                      </a>
                      <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                        <img :src="tiktokIcon" alt="TikTok" class="h-12 w-12 object-contain transition-transform hover:scale-110" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template v-else-if="isInvalidCode">
            <div class="rounded-4xl border border-amber-200 bg-linear-to-br from-[#fff7ed] via-[#fff3e0] to-[#ffe8c7] p-5 shadow-[0_18px_40px_rgba(180,100,0,0.16)] sm:p-6">
              <h3 class="text-center text-4xl font-black uppercase leading-none text-[#8a3f00] sm:text-5xl">¡Guau... casi!</h3>

              <div class="mt-5 rounded-3xl bg-white px-5 py-6 text-center shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
                <p class="text-xl font-black text-[#111827] sm:text-2xl">
                  Tu codigo no resulto ganador en esta ocasion
                </p>
              </div>

              <div class="mt-5 rounded-3xl border border-[#f2c07c] bg-white/90 px-5 py-5 text-[#5a3412] shadow-[0_8px_20px_rgba(120,64,0,0.12)]">
                <p class="text-lg font-black uppercase tracking-wide text-[#a44f00]">Pero tienes una segunda chance</p>
                <ol class="mt-3 space-y-2 text-sm font-semibold leading-6 sm:text-base">
                  <li>1. Postea una foto con tu producto MAX-FL en tus redes.</li>
                  <li>2. Etiqueta a PLOPPERU en tu publicación o historia.</li>
                  <li>3. Usa el hashtag #MaxFlSegundaChance.</li>
                </ol>
              </div>

              <div class="mt-5 flex justify-center gap-5">
                <a href="https://www.instagram.com/plopperu?igsh=czBnb3gxOXViajJo" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <img :src="instagramIcon" alt="Instagram" class="h-12 w-12 object-contain transition-transform hover:scale-110" />
                </a>
                <a href="https://www.facebook.com/share/1Du3Fbx5wF/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <img :src="facebookIcon" alt="Facebook" class="h-12 w-12 object-contain transition-transform hover:scale-110" />
                </a>
                <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <img :src="tiktokIcon" alt="TikTok" class="h-12 w-12 object-contain transition-transform hover:scale-110" />
                </a>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="rounded-4xl border border-white/15 bg-[#f3f4f6] p-5 text-center shadow-[0_12px_28px_rgba(0,0,0,0.12)] sm:p-6">
              <h3 class="text-3xl font-black text-[#1f2937] sm:text-4xl">Resultado de tu codigo</h3>
              <p class="mt-4 rounded-3xl bg-white px-5 py-5 text-lg font-bold text-[#334155]">
                {{ resultDescription }}
              </p>
              <p class="mt-4 text-sm font-semibold uppercase tracking-wide text-[#5C068C]">
                {{ reasonMessage }}
              </p>
            </div>
          </template>

          <button
            @click="resetForm"
            class="mt-5 w-full rounded-lg bg-linear-to-r from-[#004f9f] to-[#5C068C] px-8 py-3 font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.confetti-layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.confetti-piece,
.streamer {
  position: absolute;
  display: block;
  opacity: 0.95;
}

.confetti-piece {
  top: -12%;
  width: 12px;
  height: 22px;
  border-radius: 999px;
  animation: confetti-fall 3.8s linear infinite;
}

.confetti-piece--a {
  left: 8%;
  background: #ffd54f;
  animation-delay: 0s;
}

.confetti-piece--b {
  left: 22%;
  background: #ff7aa2;
  animation-delay: 0.45s;
}

.confetti-piece--c {
  left: 38%;
  background: #78f0ff;
  animation-delay: 0.9s;
}

.confetti-piece--d {
  left: 58%;
  background: #fff;
  animation-delay: 0.2s;
}

.confetti-piece--e {
  left: 74%;
  background: #b7ff65;
  animation-delay: 1.15s;
}

.confetti-piece--f {
  left: 88%;
  background: #ffb347;
  animation-delay: 0.7s;
}

.streamer {
  top: -6%;
  width: 140px;
  height: 140px;
  border-top: 5px solid rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  animation: streamer-wave 4.2s ease-in-out infinite;
}

.streamer--left {
  left: -8%;
  border-color: #ffd54f;
  transform: rotate(20deg);
}

.streamer--right {
  right: -10%;
  border-color: #ff7aa2;
  transform: rotate(-18deg) scaleX(-1);
  animation-delay: 0.6s;
}

@keyframes confetti-fall {
  0% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }

  100% {
    transform: translate3d(18px, 420px, 0) rotate(320deg);
  }
}

@keyframes streamer-wave {
  0%,
  100% {
    transform: translateY(0) rotate(18deg);
  }

  50% {
    transform: translateY(28px) rotate(30deg);
  }
}

.streamer--right {
  animation-name: streamer-wave-right;
}

@keyframes streamer-wave-right {
  0%,
  100% {
    transform: translateY(0) rotate(-18deg) scaleX(-1);
  }

  50% {
    transform: translateY(28px) rotate(-30deg) scaleX(-1);
  }
}
</style>
