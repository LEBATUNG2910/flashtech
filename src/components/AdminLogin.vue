<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-lg">
      <div class="flex justify-between items-center mb-6">
        <router-link to="/" class="flex items-center">
          <component :is="$lucide.Zap" class="h-8 w-8 text-blue-600 mr-2" />
          <span class="text-2xl font-bold text-gray-900">FlashTech Admin</span>
        </router-link>
      </div>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input v-model="loginForm.email" type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
          <input v-model="loginForm.password" type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
        </div>
        <button
        to="/admin" 
        type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
          Đăng nhập
    </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const loginForm = ref({
  email: '',
  password: ''
})

const login = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', loginForm.value)
    localStorage.setItem('token', response.data.token)
    router.push('/admin')
  } catch (error) {
    console.error('Login error:', error)
    alert('Email hoặc mật khẩu không đúng!')
  }
}
</script>