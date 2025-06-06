<template>
  <section id="projects" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Dự án tiêu biểu</h2>
        <p class="text-xl text-gray-600">Những sản phẩm chúng tôi tự hào đã tạo ra</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="project in projects" :key="project.id" class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div class="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <img v-if="project.image" :src="project.image" :alt="project.title" class="w-full h-full object-cover" />
            <div v-else class="text-white text-6xl">
              <component :is="$lucide.Briefcase" />
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ project.title }}</h3>
            <p class="text-gray-600 mb-4">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="tech in project.technologies" :key="tech" class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {{ tech }}
              </span>
            </div>
            <button class="text-blue-600 hover:text-blue-800 font-semibold">
              Xem chi tiết →
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  projects: {
    type: Array,
    required: true
  }
})
</script>