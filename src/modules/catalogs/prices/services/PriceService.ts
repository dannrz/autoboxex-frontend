import api from "@/api"
import type { AxiosResponse } from "axios"
import type { Price, PriceCreated } from "../interfaces";

export const PriceService = {
    async getPrices(): Promise<AxiosResponse<Omit<Price, 'PrecioBusqueda'>[]>> {
        return api.get<Omit<Price, 'PrecioBusqueda'>[]>('/catalogs/prices');
    },
    async getLastId(): Promise<AxiosResponse<{ lastId: number }>> {
        return api.get<{ lastId: number }>('/catalogs/prices/last-id');
    },
    async createPrice(data: Omit<Price, 'IdProducto' | 'PrecioBusqueda'>): Promise<AxiosResponse<PriceCreated>> {
        return api.post<PriceCreated>('/catalogs/prices', data);
    },
    async deletePrice(id: number): Promise<AxiosResponse> {
        return api.delete(`/catalogs/prices/${id}`);
    },
    async updatePrice(id: number, data: Omit<Price, 'IdProducto' | 'PrecioBusqueda'>): Promise<AxiosResponse<PriceCreated>> {
        return api.put<PriceCreated>(`/catalogs/prices/${id}`, data);
    }
}