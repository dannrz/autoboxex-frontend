import api from "@/api";
import type { AxiosResponse } from "axios";
import type { Client, PaginatedVehiculos } from "../interfaces/Client.interface";

export const ClientService = {
    async getClients(): Promise<AxiosResponse<Array<Client>>> {
        return await api.get<Array<Client>>(`/catalogs/clients`);
    },

    async getClientVehicles(clientId: number, page: number, perPage: number): Promise<AxiosResponse<PaginatedVehiculos>> {
        return await api.get<PaginatedVehiculos>(`/catalogs/clients/${clientId}/vehicles`, {
            params: { page, perPage },
        });
    }
}