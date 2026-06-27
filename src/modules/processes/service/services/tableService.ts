import { api } from "@/api/baseApi"
import type { AxiosResponse } from "axios";
import type { Costos, Insumos, Precios } from "../interfaces";

export const tableService = {
    async getInsumos(): Promise<AxiosResponse<Insumos[]>> {
        return await api.get<Insumos[]>('/services/insumos');
    },

    async getPrecios(): Promise<AxiosResponse<Precios[]>> {
        return await api.get<Precios[]>('/services/precios');
    },

    async getCostos(): Promise<AxiosResponse<Costos[]>> {
        return await api.get<Costos[]>('/services/costos');
    }
}