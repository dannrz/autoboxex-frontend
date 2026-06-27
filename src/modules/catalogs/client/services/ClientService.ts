import { api } from "@/api/baseApi";
import type { AxiosResponse } from "axios";
import type { Client, ClientForm } from "../interfaces/Client.interface";

export const ClientService = {
    async getClients(): Promise<AxiosResponse<Array<Client>>> {
        return await api.get<Array<Client>>(`/catalogs/clients`);
    },
    async createClient(data: ClientForm): Promise<AxiosResponse<Client>> {
        return await api.post<Client>(`/catalogs/clients`, data);
    },
    async updateClient(id: number, data: ClientForm): Promise<AxiosResponse<Client>> {
        return await api.put<Client>(`/catalogs/clients/${id}`, data);
    },
}
