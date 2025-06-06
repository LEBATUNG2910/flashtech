<template>
  <section id="about" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-4xl font-bold text-gray-900 mb-6">Về FlashTech</h2>
          <p class="text-lg text-gray-600 mb-6">
            Với hơn 5 năm kinh nghiệm trong lĩnh vực phát triển phần mềm, FlashTech đã trở thành 
            đối tác tin cậy của hàng trăm doanh nghiệp từ startup đến tập đoàn lớn.
          </p>
          <p class="text-lg text-gray-600 mb-8">
            Chúng tôi chuyên về outsourcing phần mềm với đội ngũ developer giàu kinh nghiệm, 
            cam kết mang đến giải pháp tối ưu và hiệu quả nhất cho khách hàng.
          </p>
          <div class="grid grid-cols-2 gap-8">
            <div class="text-center">
              <div class="text-3xl font-bold text-blue-600 mb-2">100+</div>
              <div class="text-gray-600">Dự án hoàn thành</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div class="text-gray-600">Khách hàng hài lòng</div>
            </div>
          </div>
        </div>
        <div class="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
          <div class="grid grid-cols-2 gap-6">
            <div class="text-center">
              <component :is="$lucide.Users" class="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 class="font-semibold text-gray-900 mb-2">Đội ngũ chuyên nghiệp</h4>
              <p class="text-sm text-gray-600">20+ developers kinh nghiệm</p>
            </div>
            <div class="text-center">
              <component :is="$lucide.Clock" class="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h4 class="font-semibold text-gray-900 mb-2">Giao hàng đúng hạn</h4>
              <p class="text-sm text-gray-600">98% dự án on-time</p>
            </div>
            <div class="text-center">
              <component :is="$lucide.Shield" class="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h4 class="font-semibold text-gray-900 mb-2">Bảo mật cao</h4>
              <p class="text-sm text-gray-600">Tuân thủ tiêu chuẩn quốc tế</p>
            </div>
            <div class="text-center">
              <component :is="$lucide.Headphones" class="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h4 class="font-semibold text-gray-900 mb-2">Hỗ trợ 24/7</h4>
              <p class="text-sm text-gray-600">Luôn sẵn sàng hỗ trợ</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Phần hiển thị thành viên -->
      <div class="mt-16">
        <h3 class="text-3xl font-bold text-gray-900 mb-8 text-center">Đội ngũ thành viên</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="member in members" :key="member.id" class="bg-white rounded-xl shadow-lg p-6 text-center">
            <div class="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl">
              {{ member.name.charAt(0) }}
            </div>
            <h4 class="text-xl font-semibold text-gray-900 mb-2">{{ member.name }}</h4>
            <p class="text-gray-600">{{ member.position || 'Thành viên' }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const members = ref([])

const fetchMembers = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/members')
    members.value = response.data
  } catch (error) {
    console.error('Error fetching members:', error)
  }
}

onMounted(fetchMembers)
</script>