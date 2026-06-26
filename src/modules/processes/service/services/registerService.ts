import { api } from "@/api/baseApi"
import type { ClientServicesResponse, InOrderResponse, Insumo, Precios, Servicio } from "../interfaces"
import type { AxiosResponse } from "axios"
import type { Clientes } from "../interfaces/Clientes.interface"

export const RegisterService = {
    async getPrecios(): Promise<AxiosResponse<Precios[]>> {
        return await api.get<Precios[]>('/services/precios');
    },

    async getClients(): Promise<AxiosResponse<Clientes[]>> {
        return await api.get<Clientes[]>('/services/clients');
    },

    async getClient({ IdCliente }: Clientes): Promise<AxiosResponse<ClientServicesResponse>> {
        return await api.get<ClientServicesResponse>('/services/clients', { params: { id: IdCliente } });
    },

    async getInsumos({ IdMovimiento }: Servicio): Promise<AxiosResponse<Insumo[]>> {
        return await api.get<Insumo[]>('/services/insumos', { params: { id: IdMovimiento } });
    },

    async getInOrders(): Promise<AxiosResponse<Array<{ FolioOE: string }>>> {
        return await api.get<Array<{ FolioOE: string }>>('/services/oe');
    },

    async getClientAndVehicle(inOrder: number) {
        return await api.get<InOrderResponse>('/services/clients', { params: { inOrder } });
    },

    async getPlacas(idCliente: string): Promise<AxiosResponse<Array<{ Placas: string }>>> {
        return await api.get<Array<{ Placas: string }>>('/services/plates', { params: { idCliente } });
    },

    async getMarcas(): Promise<AxiosResponse<Array<{ IdMarca: number; Marca: string }>>> {
        return await api.get('/services/marcas');
    },

    async getModelos(idMarca?: number): Promise<AxiosResponse<Array<{ IdMarca: number; Modelo: string }>>> {
        return await api.get('/services/modelos', idMarca ? { params: { idMarca } } : undefined);
    },

    async storeService(payload: Record<string, any>) {
        return await api.post('/services', payload);
    }
}