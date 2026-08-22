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
        requiresAuth: false,
        title: "Autoboxex - Iniciar sesión"
      },
    },
    {
      path: '/change-password',
      name: 'change-password',
      component: () => import('@/layout/login/views/ChangePasswordView.vue'),
      meta: {
        requiresAuth: false,
        title: "Cambiar contraseña"
      }
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/layout/main/views/MainPage.vue'),
      children: [
        {
          path: 'processes',
          children: [
            {
              path: 'service',
              name: 'register',
              component: () => import('@/modules/processes/service/views/FormRegister.vue'),
              meta: {
                title: "Procesos - Servicio",
              }
            }
          ],
          meta: {
            requiresAuth: true,
            roles: ['admin', 'admtivo'],
          }
        },
        {
          path: 'catalogs',
          children: [
            {
              path: 'brands',
              name: 'brands',
              component: () => import('@/modules/catalogs/brands/views/BrandsView.vue'),
              meta: {
                title: "Catálogos - Marcas",
              }
            },
            {
              path: 'models',
              name: 'models',
              component: () => import('@/modules/catalogs/models/views/ModelsView.vue'),
              meta: {
                title: "Catálogos - Modelos",
              }
            },
            {
              path: 'spare-parts',
              name: 'refacs',
              component: () => import('@/modules/catalogs/refacs/views/RefacsView.vue'),
              meta: {
                title: "Catálogos - Refacciones",
              }
            },
            {
              path: 'packages',
              name: 'packages',
              component: () => import('@/modules/catalogs/packages/views/PackageView.vue'),
              meta: {
                title: "Catálogos - Paquetes",
              }
            },
            {
              path: 'clients',
              name: 'clients',
              component: () => import('@/modules/catalogs/client/views/ClientsView.vue'),
              meta: {
                title: "Catálogos - Clientes",
              }
            },
          ],
          meta: {
            requiresAuth: true,
            roles: ['admin', 'admtivo'],
          }
        },
        {
          path: 'consults',
          children:[
            {
              path: 'service',
              name: 'service',
              component: () => import('@/modules/consults/service/views/ServiceView.vue'),
            }
          ]
        },
        {
          path: '/user/:user',
          name: 'profile',
          component: () => import('@/modules/user/views/ProfileView.vue'),
          meta: {
            requiresAuth: true,
            ownOnly: true,
            title: "Perfil de usuario"
          }
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('@/modules/user/views/AdminUsers.vue'),
          meta: {
            requiresAuth: true,
            roles: ['admin', 'admtivo'],
            title: "Administrar Usuarios"
          }
        },
        {
          path: '/password-requests',
          name: 'password-requests',
          component: () => import('@/modules/user/views/PasswordRequests.vue'),
          meta: {
            requiresAuth: true,
            roles: ['admin', 'admtivo'],
            title: "Solicitudes de cambio de contraseña"
          }
        }
      ],
      meta: {
        requiresAuth: true,
        title: "Inicio"
      }
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('@/layout/errors/views/401Page.vue'),
      meta: {
        requiresAuth: true,
        title: "No autorizado"
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/layout/errors/views/404Page.vue'),
      meta: {
        requiresAuth: true,
        title: "Página no encontrada"
      }
    }
  ],
})

useLoginGuard(router);

export default router
