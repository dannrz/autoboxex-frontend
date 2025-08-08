import { useLoginGuard } from '@/guards/useLoginGuard';
import LoginView from '@/layout/login/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: '/',
      name: 'home',
      component: () => import('@/layout/main/views/MainPage.vue'),
      children: [
        {
          path: '/register',
          name: 'register',
          component: () => import('@/modules/register/views/FormRegister.vue'),
          meta:{
            requiresAuth: true,
            role: 'admin',
          }
        }
      ],
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('@/layout/errors/views/401Page.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/layout/errors/views/404Page.vue')
    }
  ],
})

useLoginGuard(router);

export default router
