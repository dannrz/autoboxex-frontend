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
    async createPrice(data: { Producto: string; Precio: number }): Promise<AxiosResponse<PriceCreated>> {
        return api.post<PriceCreated>('/catalogs/prices', data);
    },
    async deletePrice(id: number): Promise<AxiosResponse> {
        return api.delete(`/catalogs/prices/${id}`);
    }
}