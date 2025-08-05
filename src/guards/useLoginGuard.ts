import { useLogin } from "@/layout/login/composables/useLogin";
import type { Router } from "vue-router";

export const useLoginGuard = (router: Router): void => {
    router.beforeEach((to, from, next) => {
        const { onExpiredSession } = useLogin();

        const requiresAuth: boolean = to.matched.some(record => record.meta.requiresAuth);
        const token = localStorage.getItem("access_token");
        const expiresAt = localStorage.getItem("expires_at");

        const now = new Date();
        const expiresAtDate = expiresAt ? new Date(expiresAt) : ''

        if (!token && requiresAuth) {
            next({ name: 'login' });
        }

        if (requiresAuth && expiresAtDate <= now) {
            onExpiredSession();
        }

        next();
    })
}