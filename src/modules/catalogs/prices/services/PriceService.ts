import api from "@/api"
import type { AxiosResponse } from "axios"
import type { Price } from "../interfaces";

export const PriceService = {
    async getPrices(): Promise<AxiosResponse<Omit<Price, 'PrecioBusqueda'>[]>> {
        return api.get<Omit<Price, 'PrecioBusqueda'>[]>('/catalogs/prices');
    },
    async getLastId(): Promise<AxiosResponse<{ lastId: number }>> {
        return api.get<{ lastId: number }>('/catalogs/prices/last-id');
    },
}