import { api } from "@/api/baseApi";

export const MenuService = {
    async getOverlayBadge() {
        return await api.get<{ count: number }>('/menu/overlay-badge');
    },
};