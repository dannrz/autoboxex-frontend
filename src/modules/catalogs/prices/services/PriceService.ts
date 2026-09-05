import api from "@/api"
import type { AxiosResponse } from "axios"
import type { Price } from "../interfaces";

export const PriceService = {
    async getPrices(): Promise<AxiosResponse<Price[]>> {
        return api.get<Price[]>('/catalogs/prices');
    },
}