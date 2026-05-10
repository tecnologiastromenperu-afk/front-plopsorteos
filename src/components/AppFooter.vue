<script setup lang="ts">
import { Facebook, Instagram, Mail, Phone } from 'lucide-vue-next'
import logo from '@/assets/logo.png'

const emit = defineEmits<{
  (e: 'open-general-terms'): void
  (e: 'open-second-chance-terms'): void
}>()
</script>

<template>
  <footer class="relative z-10 bg-[#000000] border-t border-white/10">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

        <!-- Contacto -->
        <div>
          <h3 class="text-white font-bold text-sm uppercase tracking-wider mb-4">CONTACTANOS</h3>
          <div class="space-y-3">
            <a
              href="mailto:fumiplop@plopperu.pe"
              class="flex items-center gap-2 text-gray-300 text-sm hover:text-white transition-colors"
            >
              <Mail class="w-4 h-4 shrink-0" />
              <span>fumiplop@plopperu.pe</span>
            </a>
            <a
              href="tel:902725464"
              class="flex items-center gap-2 text-gray-300 text-sm hover:text-white transition-colors"
            >
              <Phone class="w-4 h-4 shrink-0" />
              <span>902 725 464</span>
            </a>
          </div>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="text-white font-bold text-sm uppercase tracking-wider mb-4">INFORMACION LEGAL</h3>
          <div class="space-y-3">
            <button
              type="button"
              class="block text-left text-gray-300 text-sm hover:text-white transition-colors"
              @click="emit('open-general-terms')"
            >
              Terminos y condiciones
            </button>
            
            <button
              type="button"
              class="block text-left text-gray-300 text-sm hover:text-white transition-colors"
              @click="emit('open-second-chance-terms')"
            >
              Terminos segunda chance
            </button>
          </div>
        </div>

        <!-- Redes sociales -->
        <div>
          <h3 class="text-white font-bold text-sm uppercase tracking-wider mb-4">SIGUENOS</h3>
          <div class="flex gap-4">
            <a
              href="https://www.facebook.com/share/1Du3Fbx5wF/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-300 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook class="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/plopperu?igsh=czBnb3gxOXViajJo"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-300 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram class="w-6 h-6" />
            </a>
             <a
              href="https://www.tiktok.com/@plop_peru?_r=1&_t=ZS-96FFUBCLuQm"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-300 hover:text-white transition-colors"
              aria-label="TikTok"
            >
              <svg
                class="h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.193v13.402a2.896 2.896 0 0 1-2.896 2.895 2.897 2.897 0 0 1-2.897-2.895 2.897 2.897 0 0 1 2.897-2.896c.273 0 .53.04.776.11V9.369a6.223 6.223 0 0 0-.776-.05A6.09 6.09 0 0 0 3.64 15.41a6.09 6.09 0 0 0 6.09 6.09 6.09 6.09 0 0 0 6.09-6.09V8.56a8.002 8.002 0 0 0 4.68 1.498V6.866a4.76 4.76 0 0 1-.91-.18Z" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Logo y copyright -->
        <div class="flex flex-col items-center md:items-start gap-2">
          <img :src="logo" alt="Logo Plopsorteos.com" class="h-10" />
          <p class="text-gray-400 text-xs">© 2026 Todos los derechos reservados</p>
          <p class="text-gray-500 text-xs">
            Desarrollado por
            <a
              href="https://solumcode.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-300 hover:text-white transition-colors"
            >
              Solumcode.com
            </a>
          </p>
        </div>

      </div>
    </div>
  </footer>
</template>
