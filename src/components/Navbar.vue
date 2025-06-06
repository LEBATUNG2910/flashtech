<script setup>
import { Menu } from 'lucide-vue-next'
import { RouterLink } from 'vue-router';
</script>
<template>
    <!-- Navigation -->
    <nav class="bg-white shadow-lg fixed w-full top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <Zap class="h-8 w-8 text-blue-600 mr-2" />
              <img src="@/assets/flash.png" alt="Logo" class="h-8 w-8 mr-2">
              <span class="text-2xl font-bold text-gray-900">FlashTech</span>
            </div>
          </div>
          <div class="hidden md:flex items-center space-x-8">
            <a href="#home" class="text-gray-700 hover:text-blue-600 transition-colors">Trang chủ</a>
            <a href="#services" class="text-gray-700 hover:text-blue-600 transition-colors">Dịch vụ</a>
            <a href="#projects" class="text-gray-700 hover:text-blue-600 transition-colors">Dự án</a>
            <a href="#about" class="text-gray-700 hover:text-blue-600 transition-colors">Về chúng tôi</a>
            <a href="#contact" class="text-gray-700 hover:text-blue-600 transition-colors">Liên hệ</a>
            <router-link
  to="/admin-login"
  class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
>
  Admin
</router-link>

          </div>
          <div class="md:hidden flex items-center">
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-700">
              <Menu class="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a href="#home" class="block px-3 py-2 text-gray-700">Trang chủ</a>
          <a href="#services" class="block px-3 py-2 text-gray-700">Dịch vụ</a>
          <a href="#projects" class="block px-3 py-2 text-gray-700">Dự án</a>
          <a href="#about" class="block px-3 py-2 text-gray-700">Về chúng tôi</a>
          <a href="#contact" class="block px-3 py-2 text-gray-700">Liên hệ</a>
          <button @click="showLoginModal = true" class="block w-full text-left px-3 py-2 text-blue-600">Admin</button>
        </div>
      </div>
    </nav>
</template>