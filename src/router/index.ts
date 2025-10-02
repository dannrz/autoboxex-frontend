import { createRouter, createWebHistory } from 'vue-router'
import { useLoginGuard } from '@/guards/useLoginGuard';
import LoginView from '@/layout/login/views/LoginView.vue'

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
    },
    {
      path: '/change-password',
      name: 'change-password',
      component: () => import('@/layout/login/views/ChangePasswordView.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/layout/main/views/MainPage.vue'),
      children: [
        {
          path: '/processes/service',
          name: 'register',
          component: () => import('@/modules/register/views/FormRegister.vue'),
          meta: {
            requiresAuth: true,
            roles: ['admin', 'admtivo'],
          }
        },
        {
          path: '/user/:user',
          name: 'profile',
          component: () => import('@/modules/user/views/ProfileView.vue'),
          meta: {
            requiresAuth: true,
          }
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('@/modules/user/views/AdminUsers.vue'),
          meta: {
            requiresAuth: true,
            roles: ['admin', 'admtivo'],
          }
        },
        {
          path: '/password-requests',
          name: 'password-requests',
          component: () => import('@/modules/user/views/PasswordRequests.vue'),
          meta: {
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
      component: () => import('@/layout/errors/views/401Page.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/layout/errors/views/404Page.vue'),
      meta: {
        requiresAuth: true,
      }
    }
  ],
})

useLoginGuard(router);

export default router
