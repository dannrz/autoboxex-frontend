import { useLogin } from "@/layout/login/composables/useLogin";
import type { User } from "@/layout/login/interfaces";
import type { Router } from "vue-router";

export const useLoginGuard = (router: Router): void => {
    router.beforeEach((to, from, next) => {
        const { onExpiredSession } = useLogin();

        const requiresAuth: boolean = to.matched.some(record => record.meta.requiresAuth);
        const role: string | undefined = to.meta.role as string | undefined;
        const roles: string[] = to.meta.roles as string[];
        const ownOnly: boolean | undefined = to.meta.ownOnly as boolean | undefined;
        const token = localStorage.getItem("access_token");
        const expiresAt = localStorage.getItem("expires_at");
        const user: User | null = JSON.parse(localStorage.getItem("user") || "null");

        const now = new Date();
        const expiresAtDate = expiresAt ? new Date(expiresAt) : '';

        const title = to.meta.title as string | undefined;

        document.title = title ? title : "Autoboxex";

        if (!token && requiresAuth) {
            next({ name: 'login' });
            return
        }

        if (!requiresAuth && token) {
            next({ name: 'home' });
            return
        }

        if (requiresAuth && expiresAtDate <= now) {
            onExpiredSession();
        }

        if (requiresAuth && role && user?.role.role_name !== role) {
            next({ name: 'unauthorized' });
            return
        }
        if (requiresAuth && roles && !roles.includes(user?.role.role_name || '')) {
            next({ name: 'unauthorized' });
            return
        }

        if (requiresAuth && ownOnly && to.params.user !== user?.username) {
            next({ name: 'unauthorized' });
            return
        }

        next();
    })
}