import LoginView from '@/layout/login/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
      name: 'main',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/layout/menu/views/MainPage.vue'),
      children: [
        // { path: '', component: () => import('@/layout/menu/views/MainPage.vue') },
      ]
    }
  ],
})

export default router
