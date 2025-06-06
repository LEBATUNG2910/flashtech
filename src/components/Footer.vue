<template>
  <footer class="bg-gray-900 text-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <router-link to="/" class="flex items-center mb-4">
            <component :is="$lucide.Zap" class="h-8 w-8 text-blue-400 mr-2" />
            <span class="text-2xl font-bold">FlashTech</span>
          </router-link>
          <p class="text-gray-300">
            Đối tác tin cậy trong việc phát triển phần mềm và ứng dụng chuyên nghiệp.
          </p>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Dịch vụ</h3>
          <ul class="space-y-2 text-gray-300">
            <li>Web Development</li>
            <li>Mobile Apps</li>
            <li>Backend Systems</li>
            <li>UI/UX Design</li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Công ty</h3>
          <ul class="space-y-2 text-gray-300">
            <li>Về chúng tôi</li>
            <li>Đội ngũ</li>
            <li>Tuyển dụng</li>
            <li>Liên hệ</li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Liên hệ</h3>
          <div class="space-y-2 text-gray-300">
            <p>123 Đường ABC, Quận 1, TP.HCM</p>
            <p>+84 123 456 789</p>
            <p>contact@flashtech.vn</p>
          </div>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>© 2025 FlashTech. Tất cả quyền được bảo lưu.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>