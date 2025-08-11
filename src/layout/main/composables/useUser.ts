import type { User } from "@/layout/login/interfaces";

export const useUser = () => {
    const user: User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {};
    const initialAvatar = user?.name?.charAt(0).toUpperCase() || '';
    const lastNameInitial = user?.name?.split(' ').slice(-1)[0].charAt(0) || '';

    const avatarLabel = initialAvatar + lastNameInitial;

    return {
        user,
        avatarLabel
    };
}