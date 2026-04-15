<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Gift } from 'lucide-vue-next'

defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ (e: 'update:modelValue', val: boolean): void }>()

const winningCodes: Record<string, string> = {
  WIN001: 'Viaje todo pagado',
  WIN002: 'Tablet premium',
  WIN003: 'Set de productos',
  WIN004: 'Smartphone',
  WIN005: 'Auriculares Bluetooth',
}

const formData = reactive({
  code: '',
  fullName: '',
  documentId: '',
  email: '',
  phone: '',
  product: '',
  acceptTerms: false,
})

const result = ref<{ isWinner: boolean; prize?: string } | null>(null)

const handleSubmitCode = () => {
  const prize = winningCodes[formData.code.trim().toUpperCase()]
  result.value = prize ? { isWinner: true, prize } : { isWinner: false }
}

const resetForm = () => {
  emit('update:modelValue', false)
  result.value = null
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
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">

        <!-- Header del modal -->
        <div v-if="!result" class="text-center mb-6">
          <div
            class="w-16 h-16 bg-gradient-to-br from-[#004f9f] to-[#5C068C] rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Gift class="w-8 h-8 text-white" />
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
              <a href="#" class="text-[#004f9f] font-semibold hover:underline">terminos y condiciones</a>
              y la politica de privacidad
            </span>
          </label>

          <div class="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              @click="resetForm"
              class="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="flex-1 px-6 py-3 bg-gradient-to-r from-[#004f9f] to-[#5C068C] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              Validar codigo
            </button>
          </div>
        </form>

        <!-- Resultado -->
        <div v-else class="text-center py-4">
          <!-- Ganador -->
          <template v-if="result.isWinner">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-5xl">🎉</span>
            </div>
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              ¡Felicidades {{ formData.fullName }}!
            </h3>
            <p class="text-lg text-gray-700 mb-4">¡Tu codigo es ganador!</p>
            <div
              class="bg-gradient-to-br from-[#004f9f]/10 to-[#5C068C]/10 border-2 border-[#004f9f]/30 rounded-xl p-6 mb-4"
            >
              <p class="text-sm text-gray-600 mb-2 uppercase tracking-wide">Tu premio</p>
              <p class="text-xl font-bold text-gray-900">{{ result.prize }}</p>
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
            <h3 class="text-2xl font-bold text-gray-900 mb-3">¡Gracias por participar!</h3>
            <p class="text-lg text-gray-700 mb-6">Tu codigo no resulto ganador en esta ocasion.</p>
            <div class="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 mb-6">
              <p class="text-base font-semibold text-gray-900 mb-2">✨ ¡Pero aún puedes ganar!</p>
              <p class="text-sm text-gray-700">
                Postea una selfie con tu producto, etiquetanos en redes sociales y entras al sorteo adicional.
              </p>
            </div>
          </template>

          <button
            @click="resetForm"
            class="px-8 py-3 bg-gradient-to-r from-[#004f9f] to-[#5C068C] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all w-full"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>
