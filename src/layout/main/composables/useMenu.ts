import { ref } from "vue";

import { useToast } from "primevue";
import type { MenuItem } from "primevue/menuitem";
import type { AxiosError } from "axios";

import { MenuService } from "../services/MenuService";
import { UserService } from "@/modules/user/services/UserService";
import type { PasswordRequest } from "@/modules/user/interfaces";
import type { User } from "@/layout/login/interfaces";
import { MENU_BY_ROLE } from '../constants/menuItems';

export const useMenu = () => {
    const user: User | null = JSON.parse(localStorage.getItem("user") || "null");
    const { role_name } = user?.role ? user.role : { role_name: undefined };

    const items = ref<MenuItem[]>([
        {
            label: 'Inicio',
            icon: 'pi pi-home',
            route: '/'
        }
    ]);

    const asideItems = ref<MenuItem[]>([]);
    const badgeValue = ref<number>(0);
    const requests = ref<PasswordRequest[]>([]);

    const toast = useToast()

    const menuItems = role_name ? MENU_BY_ROLE[role_name] : [];
    items.value.push(...menuItems);

    const overlayBadge = async (): Promise<void> => {
        MenuService.getOverlayBadge()
            .then(({ data }) => badgeValue.value = data.count)
            .then(count => {
                if (count > 0) {
                    toast.add({ severity: 'info', summary: 'Notificación', detail: `Tienes ${count} ${count == 1 ? 'nueva solicitud' : 'nuevas solicitudes'} de cambio de contraseña`, life: import.meta.env.VITE_TOAST_LIFETIME });

                    return UserService.passwordRequests('notifications');
                }
            })
            .then(response => response && (requests.value = response.data))
            .catch((error: AxiosError) => {
                if (error.status === 401) {
                    toast.add({ severity: 'error', summary: 'Acceso no autorizado', detail: 'No cuenta con los permisos necesarios para acceder al recurso', life: import.meta.env.VITE_TOAST_LIFETIME });
                }
                badgeValue.value = 0;
            });
    }

    const op = ref();
    const op2 = ref();

    const toggle = (event: MouseEvent) => {
        op.value.toggle(event);
    }

    const toggleNotification = (event: MouseEvent) => {
        op2.value.toggle(event);
    }

    const hide = () => {
        op.value.hide();
    }

    return {
        items,
        asideItems,
        overlayBadge,
        badgeValue,
        op,
        op2,
        toggle,
        toggleNotification,
        hide,
        requests
    }
}