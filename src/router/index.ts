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
      meta: {
        requiresAuth: false
      },
      beforeEnter: (to, from, next) => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken && to.name === 'login') {
          next({ name: 'home' });
        } else {
          next();
        }
      }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/layout/main/views/MainPage.vue'),
      children: [
        
      ],
      meta: {
        requiresAuth: true
      },
    
    }
  ],
})

/* router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const accessToken = localStorage.getItem("access_token");

  if (requiresAuth && !accessToken) {
    next({ name: 'login' });
  } else {
    next();
  }
}); */

export default router
