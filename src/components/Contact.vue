<template>
  <section id="contact" class="py-20 bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4">Liên hệ với chúng tôi</h2>
        <p class="text-xl text-gray-300">Sẵn sàng biến ý tưởng của bạn thành hiện thực</p>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 class="text-2xl font-bold mb-6">Thông tin liên hệ</h3>
          <div class="space-y-6">
            <div class="flex items-center">
              <component :is="$lucide.MapPin" class="h-6 w-6 text-blue-400 mr-4" />
              <div>
                <p class="font-semibold">Địa chỉ</p>
                <p class="text-gray-300">123 Đường ABC, Quận 1, TP.HCM</p>
              </div>
            </div>
            <div class="flex items-center">
              <component :is="$lucide.Phone" class="h-6 w-6 text-blue-400 mr-4" />
              <div>
                <p class="font-semibold">Điện thoại</p>
                <p class="text-gray-300">+84 123 456 789</p>
              </div>
            </div>
            <div class="flex items-center">
              <component :is="$lucide.Mail" class="h-6 w-6 text-blue-400 mr-4" />
              <div>
                <p class="font-semibold">Email</p>
                <p class="text-gray-300">contact@flashtech.vn</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <form @submit.prevent="submitContact" class="space-y-6">
            <div>
              <label class="block text-sm font-medium mb-2">Họ tên</label>
              <input v-model="contactForm.name" type="text" class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Email</label>
              <input v-model="contactForm.email" type="email" class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Tin nhắn</label>
              <textarea v-model="contactForm.message" rows="4" class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required></textarea>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Gửi tin nhắn
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const contactForm = ref({
  name: '',
  email: '',
  message: ''
})

const submitContact = () => {
  const contactData = { ...contactForm.value }
  contactForm.value = { name: '', email: '', message: '' }
  emit('submit-contact', contactData)
}

defineEmits(['submit-contact'])
</script>