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
      path: '/',
      name: 'home',
      component: () => import('@/layout/main/views/MainPage.vue'),
      children: [
        {
          path: '/register',
          name: 'register',
          component: () => import('@/modules/register/views/FormRegister.vue'),
          meta: {
            requiresAuth: true,
            role: 'admin',
          }
        },
        {
          path: '/clientes',
          name: 'clientes',
          component: () => import('@/modules/catalogos/views/Clientes.vue'),
          meta: {
            requiresAuth: true,
            role: 'admin',
          }
        },
        {
          path: '/vehicles',
          name: 'vehicles',
          component: () => import('@/modules/catalogos/views/Vehicles.vue'),
          meta: {
            requiresAuth: true,
            role: 'admin',
          }
        },
        {
          path: '/spare',
          name: 'spare',
          component: () => import('@/modules/catalogos/views/Spare.vue'),
          meta: {
            requiresAuth: true,
            role: 'admin',
          }
        },
        {
          path: '/paquetes',
          name: 'paquetes',
          component: () => import('@/modules/catalogos/views/Paquetes.vue'),
          meta: {
            requiresAuth: true,
            role: 'admin',
          }
        },
        {
          path: '/servicios',
          name: 'servicios',
          component: () => import('@/modules/consultas/views/servicios.vue'),
          meta: {
            requiresAuth: true,
            role: 'admin',
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
            role: 'admin',
          }
        },
      ],
      meta: {
        requiresAuth: true,
      }
    },
    // {
    //   path: '/tablas',
    //   name: 'tablas',
    //   component: () => import('@/layout/main/views/MainPage.vue'),
    //   children: [
    //     {
    //       path: '/tabla',
    //       name: 'tabla',
    //       component: () => import('@/modules/tablas/interfaces/tabla.vue'),
    //       meta: {
    //         requiresAuth: true,
    //         role: 'admin',
    //       }
    //     }
    //   ],
    //   meta: {
    //     requiresAuth: true,
    //   }
    // },
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
