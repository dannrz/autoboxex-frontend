import { api } from "@/api/baseApi";
import type { AxiosResponse } from "axios";
import type { Client } from "../interfaces/Client.interface";

export const ClientService = {
    async getClients(): Promise<AxiosResponse<Array<Client>>> {
        return await api.get<Array<Client>>(`/catalogs/clients`);
    }
}