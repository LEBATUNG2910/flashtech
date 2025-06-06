<template>
  <section id="services" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Dịch vụ của chúng tôi</h2>
        <p class="text-xl text-gray-600">Giải pháp toàn diện cho mọi nhu cầu phát triển phần mềm</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border">
          <div class="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
            <component :is="$lucide.Globe" class="h-8 w-8 text-blue-600" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Web Development</h3>
          <p class="text-gray-600 mb-6">Phát triển website và ứng dụng web hiện đại với công nghệ tiên tiến như React, Vue, Angular.</p>
          <ul class="text-gray-600 space-y-2">
            <li>• Responsive Design</li>
            <li>• Progressive Web Apps</li>
            <li>• E-commerce Solutions</li>
          </ul>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border">
          <div class="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
            <component :is="$lucide.Smartphone" class="h-8 w-8 text-green-600" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Mobile Development</h3>
          <p class="text-gray-600 mb-6">Ứng dụng mobile native và cross-platform cho iOS và Android với hiệu suất tối ưu.</p>
          <ul class="text-gray-600 space-y-2">
            <li>• React Native</li>
            <li>• Flutter</li>
            <li>• Native iOS/Android</li>
          </ul>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border">
          <div class="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
            <component :is="$lucide.Server" class="h-8 w-8 text-purple-600" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Backend & API</h3>
          <p class="text-gray-600 mb-6">Hệ thống backend mạnh mẽ, API RESTful và GraphQL cho ứng dụng của bạn.</p>
          <ul class="text-gray-600 space-y-2">
            <li>• Node.js, Python, Java</li>
            <li>• Database Design</li>
            <li>• Cloud Integration</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>