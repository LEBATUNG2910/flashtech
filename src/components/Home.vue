<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Navbar from '@/components/Navbar.vue'
import Hero from '@/components/Hero.vue'
import Services from '@/components/Services.vue'
import Projects from '@/components/Projects.vue'
import About from '@/components/About.vue'
import Contact from '@/components/Contact.vue'
import Footer from '@/components/Footer.vue'

const router = useRouter()
const showLoginModal = ref(false)
const loginForm = ref({ email: '', password: '' })
const projects = ref([])

const fetchProjects = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/projects')
    projects.value = response.data
  } catch (error) {
    console.error('Error fetching projects:', error)
  }
}

const redirectToLogin = () => {
  router.push('/admin-login')
}

const submitContact = async (contactData) => {
  try {
    await axios.post('http://localhost:3000/api/contact', contactData)
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.')
  } catch (error) {
    console.error('Error submitting contact:', error)
    alert('Có lỗi xảy ra khi gửi tin nhắn!')
  }
}

onMounted(fetchProjects)
</script>

<template>
  <div>
    <Navbar @show-login="showLoginModal = true" />
    <main>
      <Hero />
      <Services />
      <Projects :projects="projects" />
      <About />
      <Contact @submit-contact="submitContact" />
    </main>
    <Footer />
    <div v-if="showLoginModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Đăng nhập Admin</h2>
          <button @click="showLoginModal = false" class="text-gray-400 hover:text-gray-600">
            <component :is="$lucide.X" class="h-6 w-6" />
          </button>
        </div>
        <form @submit.prevent="redirectToLogin">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input v-model="loginForm.email" type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
          </div>
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
            <input v-model="loginForm.password" type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  </div>
</template>