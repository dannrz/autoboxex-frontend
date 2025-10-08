import { api } from "@/api/baseApi"
import type { ClientServicesResponse, Insumos, Precios, ServiceType } from "../interfaces"
import type { AxiosResponse } from "axios"
import type { Clientes } from "../interfaces/Clientes.interface"

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

    async getClients(): Promise<AxiosResponse<Clientes[]>> {
        return await api.get<Clientes[]>('/services/clients');
    },

    async getClient({ IdCliente }: Clientes): Promise<AxiosResponse<ClientServicesResponse>> {
        return await api.get<ClientServicesResponse>('/services/clients', { params: { id: IdCliente } });
    }
}