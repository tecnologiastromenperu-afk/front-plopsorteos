<script setup lang="ts">
import { Gift, Home, Trophy } from 'lucide-vue-next'
import type { Component } from 'vue'
import logoCircle from '@/assets/logo_max.png'
import type { Section } from '@/types'

const props = defineProps<{ modelValue: Section }>()
const emit = defineEmits<{ (e: 'update:modelValue', section: Section): void }>()

const desktopItems: { section: Section; icon: Component; label: string }[] = [
  { section: 'inicio', icon: Home, label: 'Inicio' },
  { section: 'premios', icon: Gift, label: 'Premios' },
  { section: 'ganadores', icon: Trophy, label: 'Ganadores' },
]
</script>

<template>
  <!-- Logo circular flotante -->
  <div class="fixed left-4 md:left-6 top-4 md:top-8 z-50">
    <div class="w-50 h-16 md:w-50 md:h-16 rounded-full bg-[#e6edf0] flex items-center justify-center shadow-2xl bg-white/30">
      <img :src="logoCircle" alt="Logo Plopsorteos.com" class="w-40 md:w-40 h-20 md:h-20 object-contain" />
    </div>
  </div>

  <!-- Nav desktop: barra lateral izquierda -->
  <nav class="hidden md:block fixed left-6 top-32 z-50">
    <div class="bg-[#3d4447] rounded-[40px] py-6 px-3 shadow-2xl flex flex-col items-center gap-6">
      <button
        v-for="item in desktopItems"
        :key="item.section"
        @click="emit('update:modelValue', item.section)"
        class="group relative"
      >
        <div
          :class="[
            'w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300',
            props.modelValue === item.section
              ? 'bg-[#00d084] scale-110'
              : 'bg-transparent hover:bg-[#4a5154]',
          ]"
        >
          <component
            :is="item.icon"
            :class="[
              'w-6 h-6 transition-colors',
              props.modelValue === item.section
                ? 'text-[#2d3436]'
                : 'text-white/50 group-hover:text-white/80',
            ]"
          />
        </div>
        <!-- Tooltip al hover -->
        <span
          class="absolute left-20 top-1/2 -translate-y-1/2 bg-[#2d3436] text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        >
          {{ item.label }}
        </span>
      </button>
    </div>
  </nav>

  <!-- Nav mobile: barra inferior -->
  <nav class="md:hidden fixed bottom-0 left-0 right-0 z-50 rounded-t-4xl bg-[#000000] border-t border-white/5">
    <div class="grid grid-cols-3 gap-0 px-4 py-2">
      <!-- Premios – izquierda -->
      <button
        @click="emit('update:modelValue', 'premios')"
        class="flex flex-col items-center justify-center py-2 transition-all"
      >
        <div
          :class="[
            'flex items-center justify-center w-12 h-12 rounded-full transition-all',
            props.modelValue === 'premios' ? 'bg-gradient-to-br from-[#004f9f] to-[#5C068C] scale-110' : '',
          ]"
        >
          <Gift :class="props.modelValue === 'premios' ? 'w-6 h-6 text-white' : 'w-6 h-6 text-white/50'" />
        </div>
        <span :class="props.modelValue === 'premios' ? 'text-[10px] mt-1 text-white' : 'text-[10px] mt-1 text-white/50'">
          Premios
        </span>
      </button>

      <!-- Inicio – centro (más grande y elevado) -->
      <button
        @click="emit('update:modelValue', 'inicio')"
        class="flex flex-col items-center justify-center py-2 transition-all relative -mt-4"
      >
        <div
          :class="[
            'flex items-center justify-center w-16 h-16 rounded-full transition-all border-4',
            props.modelValue === 'inicio'
              ? 'bg-gradient-to-br from-[#004f9f] to-[#5C068C] border-[#000000] scale-110 shadow-lg shadow-[#004f9f]/50'
              : 'border-white/10',
          ]"
        >
          <Home :class="props.modelValue === 'inicio' ? 'w-7 h-7 text-white' : 'w-7 h-7 text-white/50'" />
        </div>
        <span :class="props.modelValue === 'inicio' ? 'text-[10px] mt-1 text-white' : 'text-[10px] mt-1 text-white/50'">
          Inicio
        </span>
      </button>

      <!-- Ganadores – derecha -->
      <button
        @click="emit('update:modelValue', 'ganadores')"
        class="flex flex-col items-center justify-center py-2 transition-all"
      >
        <div
          :class="[
            'flex items-center justify-center w-12 h-12 rounded-full transition-all',
            props.modelValue === 'ganadores' ? 'bg-gradient-to-br from-[#004f9f] to-[#5C068C] scale-110' : '',
          ]"
        >
          <Trophy :class="props.modelValue === 'ganadores' ? 'w-6 h-6 text-white' : 'w-6 h-6 text-white/50'" />
        </div>
        <span :class="props.modelValue === 'ganadores' ? 'text-[10px] mt-1 text-white' : 'text-[10px] mt-1 text-white/50'">
          Ganadores
        </span>
      </button>
    </div>
  </nav>
</template>
