import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './HomeView.vue'
import ProductsView from './ProductsView.vue'
import LoginView from './LoginView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/products', component: ProductsView },
  { path: '/contact', component: ProductsView },
  { path: '/auth/login', component: LoginView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router