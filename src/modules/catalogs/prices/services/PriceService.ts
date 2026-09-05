import api from "@/api"
import type { AxiosResponse } from "axios"
import type { Price } from "../interfaces";

export const PriceService = {
    async getPrices(): Promise<AxiosResponse<Omit<Price, 'PrecioBusqueda'>[]>> {
        return api.get<Omit<Price, 'PrecioBusqueda'>[]>('/catalogs/prices');
    },
}