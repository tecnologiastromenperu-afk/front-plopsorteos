<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

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
  if (result.value?.reason === 'invalid_code') {
    return '¡Gracias por participar!'
  }

  return 'Resultado de tu codigo'
})

const resultDescription = computed(() => {
  if (result.value?.reason === 'invalid_code') {
    return 'Tu codigo no resulto ganador en esta ocasion.'
  }

  return result.value?.message ?? ''
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
        <div v-else class="text-center py-4">
          <!-- Ganador -->
          <template v-if="isWinner">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-5xl">🎉</span>
            </div>
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              ¡Felicidades {{ formData.fullName }}!
            </h3>
            <p class="text-lg text-gray-700 mb-4">{{ result?.message }}</p>
            <div
              class="mb-4 rounded-xl border-2 border-[#004f9f]/30 bg-linear-to-br from-[#004f9f]/10 to-[#5C068C]/10 p-6"
            >
              <p class="text-sm text-gray-600 mb-2 uppercase tracking-wide">Tu premio</p>
              <p class="text-sm font-semibold text-[#004f9f] uppercase tracking-wide">{{ result?.prize?.type }}</p>
              <p class="text-xl font-bold text-gray-900">{{ result?.prize?.description }}</p>
            </div>
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p class="text-sm text-gray-700">
                📧 Nos pondremos en contacto al correo
                <span class="font-semibold text-[#004f9f]">{{ formData.email }}</span>
                para coordinar la entrega de tu premio.
              </p>
            </div>
          </template>

          <!-- No ganador -->
          <template v-else>
            <div class="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-5xl">🎁</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">{{ resultTitle }}</h3>
            <p class="text-lg text-gray-700 mb-3">{{ resultDescription }}</p>
            <div class="mb-6 rounded-xl border-2 border-amber-200 bg-linear-to-br from-amber-50 to-orange-50 p-6">
              <p class="text-base font-semibold text-gray-900 mb-2">{{ reasonMessage }}</p>
              <p class="text-sm text-gray-700">
                <span v-if="result?.reason === 'invalid_code'">
                  Postea una selfie con tu producto, etiquetanos en redes sociales y entras al sorteo adicional.
                </span>
                <span v-else>
                  Si el problema persiste, vuelve a intentarlo o comunícate con soporte para revisar tu participación.
                </span>
              </p>
            </div>
          </template>

          <button
            @click="resetForm"
            class="w-full rounded-lg bg-linear-to-r from-[#004f9f] to-[#5C068C] px-8 py-3 font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>
