import { api } from "@/api/baseApi"
import type { Costos, Insumos, Precios, ServiceType } from "../interfaces"
import type { AxiosResponse } from "axios"

export const RegisterService = {
    async serviceType() {
        return await api.get<ServiceType[]>('/services')
    },

    async states() {
        return await api.get<ServiceType[]>('/services/states')
    },
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
