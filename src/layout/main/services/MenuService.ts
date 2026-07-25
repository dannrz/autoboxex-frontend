import api from "@/api";

export const MenuService = {
    async getOverlayBadge() {
        return await api.get<{ count: number }>('/menu/overlay-badge');
    },
};