<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <router-link to="/" class="flex items-center hover:opacity-80 transition-opacity">
              <component :is="$lucide.Zap" class="h-8 w-8 text-blue-600 mr-2" />
              <span class="text-xl font-bold text-gray-900">FlashTech Admin</span>
            </router-link>
            <router-link to="/" class="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
              <component :is="$lucide.ArrowLeft" class="h-4 w-4 mr-1" />
              Về trang chủ
            </router-link>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-700">Xin chào, {{ currentUser.name }}</span>
            <button @click="logout" class="text-red-600 hover:text-red-800 flex items-center">
              <component :is="$lucide.LogOut" class="h-5 w-5 mr-1" />
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </header>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav class="flex space-x-8 mb-8">
        <button @click="activeAdminTab = 'projects'" :class="['px-3 py-2 font-medium text-sm rounded-md', activeAdminTab === 'projects' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700']">
          Quản lý dự án
        </button>
        <button @click="activeAdminTab = 'users'" :class="['px-3 py-2 font-medium text-sm rounded-md', activeAdminTab === 'users' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700']">
          Quản lý Admin
        </button>
      </nav>
      <div v-if="activeAdminTab === 'projects'">
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 class="text-lg font-medium text-gray-900">Quản lý dự án</h2>
            <div class="flex space-x-3">
              <button @click="resetDemoData" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 text-sm">
                <component :is="$lucide.RotateCcw" class="h-4 w-4 inline mr-2" />
                Reset Demo Data
              </button>
              <button @click="showProjectModal = true" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                <component :is="$lucide.Plus" class="h-4 w-4 inline mr-2" />
                Thêm dự án
              </button>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên dự án</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Công nghệ</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="project in projects" :key="project.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ project.title }}</td>
                  <td class="px-6 py-4 text-sm text-gray-500">{{ project.description.substring(0, 100) }}...</td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    <span v-for="tech in project.technologies.slice(0, 2)" :key="tech" class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-1">
                      {{ tech }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button @click="editProject(project)" class="text-indigo-600 hover:text-indigo-900 mr-4">
                      <component :is="$lucide.Edit" class="h-4 w-4" />
                    </button>
                    <button @click="deleteProject(project.id)" class="text-red-600 hover:text-red-900">
                      <component :is="$lucide.Trash2" class="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div v-if="activeAdminTab === 'users'">
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 class="text-lg font-medium text-gray-900">Quản lý Admin</h2>
            <button @click="showUserModal = true" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              <component :is="$lucide.Plus" class="h-4 w-4 inline mr-2" />
              Thêm Admin
            </button>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vai trò</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="user in users" :key="user.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.role }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="['inline-flex px-2 py-1 text-xs font-semibold rounded-full', user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']">
                      {{ user.status === 'active' ? 'Hoạt động' : 'Vô hiệu hóa' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button @click="editUser(user)" class="text-indigo-600 hover:text-indigo-900 mr-4">
                      <component :is="$lucide.Edit" class="h-4 w-4" />
                    </button>
                    <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-900">
                      <component :is="$lucide.Trash2" class="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div v-if="showProjectModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900">{{ editingProject ? 'Chỉnh sửa dự án' : 'Thêm dự án mới' }}</h2>
            <button @click="closeProjectModal" class="text-gray-400 hover:text-gray-600">
              <component :is="$lucide.X" class="h-6 w-6" />
            </button>
          </div>
          <form @submit.prevent="saveProject">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Tên dự án</label>
              <input v-model="projectForm.title" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
              <textarea v-model="projectForm.description" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Công nghệ (phân cách bằng dấu phẩy)</label>
              <input v-model="projectForm.technologiesString" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="React, Node.js, MongoDB">
            </div>
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">URL hình ảnh</label>
              <input v-model="projectForm.image" type="url" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div class="flex justify-end space-x-4">
              <button type="button" @click="closeProjectModal" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Hủy
              </button>
              <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                {{ editingProject ? 'Cập nhật' : 'Thêm' }}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div v-if="showUserModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900">{{ editingUser ? 'Chỉnh sửa Admin' : 'Thêm Admin mới' }}</h2>
            <button @click="closeUserModal" class="text-gray-400 hover:text-gray-600">
              <component :is="$lucide.X" class="h-6 w-6" />
            </button>
          </div>
          <form @submit.prevent="saveUser">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Tên</label>
              <input v-model="userForm.name" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input v-model="userForm.email" type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            </div>
            <div class="mb-4" v-if="!editingUser">
              <label class="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
              <input v-model="userForm.password" type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Vai trò</label>
              <select v-model="userForm.role" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
              <select v-model="userForm.status" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="active">Hoạt động</option>
                <option value="inactive">Vô hiệu hóa</option>
              </select>
            </div>
            <div class="flex justify-end space-x-4">
              <button type="button" @click="closeUserModal" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Hủy
              </button>
              <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                {{ editingUser ? 'Cập nhật' : 'Thêm' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  </template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const activeAdminTab = ref('projects')
const showProjectModal = ref(false)
const showUserModal = ref(false)
const editingProject = ref(null)
const editingUser = ref(null)
const projects = ref([])
const users = ref([])
const currentUser = ref({ name: 'Admin' })
const projectForm = ref({
  title: '',
  description: '',
  technologiesString: '',
  image: ''
})
const userForm = ref({
  name: '',
  email: '',
  password: '',
  role: 'admin',
  status: 'active'
})

const fetchProjects = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/projects', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    projects.value = response.data
  } catch (error) {
    console.error('Error fetching projects:', error)
  }
}

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/users', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    users.value = response.data
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

const fetchCurrentUser = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/auth/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    currentUser.value = response.data
  } catch (error) {
    console.error('Error fetching current user:', error)
  }
}

const editProject = (project) => {
  editingProject.value = project
  projectForm.value = {
    title: project.title,
    description: project.description,
    technologiesString: project.technologies.join(', '),
    image: project.image || ''
  }
  showProjectModal.value = true
}

const saveProject = async () => {
  const technologies = projectForm.value.technologiesString.split(',').map(tech => tech.trim()).filter(tech => tech)
  const projectData = {
    title: projectForm.value.title,
    description: projectForm.value.description,
    technologies,
    image: projectForm.value.image
  }
  try {
    if (editingProject.value) {
      await axios.put(`http://localhost:3000/api/projects/${editingProject.value.id}`, projectData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
    } else {
      await axios.post('http://localhost:3000/api/projects', projectData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
    }
    fetchProjects()
    closeProjectModal()
    alert(editingProject.value ? 'Dự án đã được cập nhật!' : 'Dự án mới đã được thêm!')
  } catch (error) {
    console.error('Error saving project:', error)
    alert('Có lỗi xảy ra khi lưu dự án!')
  }
}

const deleteProject = async (id) => {
  if (confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
    try {
      await axios.delete(`http://localhost:3000/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      fetchProjects()
      alert('Dự án đã được xóa!')
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Có lỗi xảy ra khi xóa dự án!')
    }
  }
}

const closeProjectModal = () => {
  showProjectModal.value = false
  editingProject.value = null
  projectForm.value = { title: '', description: '', technologiesString: '', image: '' }
}

const editUser = (user) => {
  editingUser.value = user
  userForm.value = {
    name: user.name,
    email: user.email,
    role: user.role.toLowerCase().replace(' ', '_'),
    status: user.status
  }
  showUserModal.value = true
}

const saveUser = async () => {
  try {
    if (editingUser.value) {
      await axios.put(`http://localhost:3000/api/users/${editingUser.value.id}`, userForm.value, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
    } else {
      await axios.post('http://localhost:3000/api/users', userForm.value, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
    }
    fetchUsers()
    closeUserModal()
    alert(editingUser.value ? 'Admin đã được cập nhật!' : 'Admin mới đã được thêm!')
  } catch (error) {
    console.error('Error saving user:', error)
    alert('Có lỗi xảy ra khi lưu admin!')
  }
}

const deleteUser = async (id) => {
  if (confirm('Bạn có chắc chắn muốn xóa admin này?')) {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      fetchUsers()
      alert('Admin đã được xóa!')
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Có lỗi xảy ra khi xóa admin!')
    }
  }
}

const closeUserModal = () => {
  showUserModal.value = false
  editingUser.value = null
  userForm.value = { name: '', email: '', password: '', role: 'admin', status: 'active' }
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/admin-login')
}

const resetDemoData = async () => {
  if (confirm('Bạn có chắc chắn muốn khôi phục dữ liệu demo? Tất cả dự án hiện tại sẽ bị xóa.')) {
    try {
      await axios.post('http://localhost:3000/api/projects/reset-demo', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      fetchProjects()
      alert('Dữ liệu demo đã được khôi phục!')
    } catch (error) {
      console.error('Error resetting demo data:', error)
      alert('Có lỗi xảy ra khi khôi phục dữ liệu demo!')
    }
  }
}

onMounted(() => {
  fetchProjects()
  fetchUsers()
  fetchCurrentUser()
})
</script>