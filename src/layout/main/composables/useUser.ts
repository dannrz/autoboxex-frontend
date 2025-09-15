import type { User } from "@/layout/login/interfaces";
import { UserService } from "@/modules/user/services/UserService";
import { useUserStore } from "@/stores/useUserStore";
import { useToast } from "primevue";
import { ref, type Ref } from "vue";

export const useUser = () => {
    const user: User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {};
    const initialAvatar = user?.name?.charAt(0).toUpperCase() || '';
    const lastNameInitial = user?.name?.split(' ').slice(-1)[0].charAt(0) || '';

    const toast = useToast();
    const userStore = useUserStore();

    const avatarLabel = initialAvatar + lastNameInitial;

    const allUsers: Ref<User[]> = ref([])

    const getAllUsers = () => {
        if (userStore.$state.users.length > 0) {
            allUsers.value = userStore.$state.users;
            return;
        }

        UserService.users()
            .then(({ data }) => {
                data.map((user, i) => {
                    user.id = i + 1;
                })
                userStore.$state.users = data;
                allUsers.value = data
            })
    }

    const tooltipMessage = (data: User): string => {
        if (data.status == 1) {
            return `Desactivar cuenta de ${data.name}`;
        }

        if (data.status == 0 && data.password_restores?.user_id != null) {
            return `Restauración de contraseña de ${data.name} en proceso`;
        }

        return `Activar cuenta de ${data.name}`;
    }

    const disableRules = (data: User): boolean => {
        if (data.password_restores?.user_id != null) {
            return true;
        }

        return false;
    }

    const handleStatusChange = (user: User) => {
        UserService.changeStatusUser(user)
            .then(({ data }) => {
                user.status = data.status_user;
                toast.add({ severity: 'success', summary: 'Éxito', detail: data.message, life: import.meta.env.VITE_TOAST_LIFETIME });
            })
            .catch(({ response }) => {
                toast.add({ severity: 'error', summary: 'Error', detail: response.data.message, life: import.meta.env.VITE_TOAST_LIFETIME });
            });
    }

    return {
        user,
        avatarLabel,
        allUsers,
        getAllUsers,
        tooltipMessage,
        disableRules,
        handleStatusChange
    };
}