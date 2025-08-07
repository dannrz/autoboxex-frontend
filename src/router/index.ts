import { useLoginGuard } from '@/guards/useLoginGuard';
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
      /* beforeEnter: (to, from, next) => {
        const comesFrom = from.name

        if (comesFrom !== '/' && comesFrom !== 'login') {
          next({ name: comesFrom });
        }

        next();
      } */
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/layout/main/views/MainPage.vue'),
      children: [
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/layout/main/views/MainPage.vue'),
          meta:{
            requiresAuth: true,
            role: 'admin',
          }
        }
      ],
      meta: {
        requiresAuth: true,
      }
    }
  ],
})

useLoginGuard(router);

export default router
