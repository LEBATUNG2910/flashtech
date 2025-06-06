<template>
  <section id="home" class="pt-16 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 class="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Giải pháp phần mềm 
            <span class="text-blue-600">chuyên nghiệp</span>
          </h1>
          <p class="text-xl text-gray-600 mb-8">
            FlashTech - Đối tác tin cậy trong việc phát triển phần mềm, ứng dụng web và mobile. 
            Chúng tôi biến ý tưởng của bạn thành hiện thực với công nghệ tiên tiến.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold">
              Bắt đầu dự án
            </button>
            <button class="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors text-lg font-semibold">
              Xem portfolio
            </button>
          </div>
        </div>
        <div class="relative">
          <div class="bg-white rounded-2xl shadow-2xl p-8">
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-blue-100 rounded-lg p-4 text-center">
                <component :is="$lucide.Code" class="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p class="font-semibold">Web Development</p>
              </div>
              <div class="bg-green-100 rounded-lg p-4 text-center">
                <component :is="$lucide.Smartphone" class="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p class="font-semibold">Mobile Apps</p>
              </div>
              <div class="bg-purple-100 rounded-lg p-4 text-center">
                <component :is="$lucide.Database" class="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p class="font-semibold">Backend Systems</p>
              </div>
              <div class="bg-orange-100 rounded-lg p-4 text-center">
                <component :is="$lucide.Palette" class="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p class="font-semibold">UI/UX Design</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>