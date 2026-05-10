<script setup lang="ts">
defineProps<{
  modelValue: boolean
  title: string
  content: string
  downloadUrl: string
  downloadName: string
}>()

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

const close = () => emit('update:modelValue', false)
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 bg-black/70 p-3 backdrop-blur-sm sm:flex sm:items-center sm:justify-center sm:p-4"
      @click.self="close"
    >
      <div class="mx-auto flex max-h-[calc(100dvh-1.5rem)] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0f1118] shadow-2xl">
        <div class="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
          <h2 class="pr-4 text-lg font-bold text-white sm:text-2xl">{{ title }}</h2>
          <div class="flex items-center gap-2">
            <a
              :href="downloadUrl"
              :download="downloadName"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Descargar PDF
            </a>
            <button
              type="button"
              class="rounded-full border border-white/15 px-3 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
              @click="close"
            >
              Cerrar
            </button>
          </div>
        </div>

        <div class="overflow-y-auto px-5 py-4 sm:px-6 sm:py-5">
          <div class="whitespace-pre-wrap text-sm leading-7 text-white/85 sm:text-base">
            {{ content }}
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
