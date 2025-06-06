import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import * as lucideIcons from 'lucide-vue-next'

import App from './App.vue'
import Home from './components/Home.vue'
import AdminLogin from './components/AdminLogin.vue'
import AdminDashboard from './components/AdminDashboard.vue'

// Define routes
const routes = [
  { path: '/', component: Home },
  { path: '/admin-login', component: AdminLogin },
  { path: '/admin', component: AdminDashboard, meta: { requiresAuth: true } }
]

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  }
})

// Auth guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    next('/admin-login')
  } else {
    next()
  }
})

// Create and mount app
const app = createApp(App)

app.use(router)

// Register all Lucide icons globally
app.use({
  install(app) {
    app.config.globalProperties.$lucide = lucideIcons
  }
})

app.mount('#app')
