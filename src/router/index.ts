import { useLogin } from '@/layout/login/composables/useLogin';
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
      }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/layout/main/views/MainPage.vue'),
      children: [

      ],
      meta: {
        requiresAuth: true,
      }
    }
  ],
})

router.beforeEach((to, from, next) => {
  const requiresAuth: boolean = to.matched.some(record => record.meta.requiresAuth);
  const token = localStorage.getItem("access_token");
  const expiresAt = localStorage.getItem("expires_at");

  const now = new Date();
  const expiresAtDate = expiresAt ? new Date(expiresAt) : ''

  console.log('ahora: ', now);
  console.log('expira: ', expiresAtDate);

  if (!token && requiresAuth) {
    next({ name: 'login' });
  } else if (requiresAuth && expiresAtDate <= now) {
    const { onLogout } = useLogin();

    console.warn('Session expired, logging out...');
    onLogout();
    return;
  }
  next();
})

export default router
