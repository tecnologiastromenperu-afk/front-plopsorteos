<script setup lang="ts">
import { Facebook, Instagram, Mail, Phone } from 'lucide-vue-next'
import logo from '@/assets/logo.png'
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
              <Mail class="w-4 h-4 flex-shrink-0" />
              <span>fumiplop@plopperu.pe</span>
            </a>
            <a
              href="tel:902725464"
              class="flex items-center gap-2 text-gray-300 text-sm hover:text-white transition-colors"
            >
              <Phone class="w-4 h-4 flex-shrink-0" />
              <span>902 725 464</span>
            </a>
          </div>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="text-white font-bold text-sm uppercase tracking-wider mb-4">INFORMACION LEGAL</h3>
          <div class="space-y-3">
            <a href="#" class="block text-gray-300 text-sm hover:text-white transition-colors">
              Terminos y condiciones
            </a>
            <a href="#" class="block text-gray-300 text-sm hover:text-white transition-colors">
              Politica de privacidad
            </a>
            <a href="#" class="block text-gray-300 text-sm hover:text-white transition-colors">
              Reglamento
            </a>
          </div>
        </div>

        <!-- Redes sociales -->
        <div>
          <h3 class="text-white font-bold text-sm uppercase tracking-wider mb-4">SIGUENOS</h3>
          <div class="flex gap-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-300 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook class="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-300 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram class="w-6 h-6" />
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
