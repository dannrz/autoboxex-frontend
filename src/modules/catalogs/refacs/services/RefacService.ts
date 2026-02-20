import { api } from "@/api/baseApi"
import type { Refaccion } from "../interfaces";
import type { AxiosResponse } from "axios";

export const RefacService = {
    async getRefacciones(): Promise<AxiosResponse<Array<Refaccion>>> {
        return await api.get<Array<Refaccion>>('/catalogs/refacciones');
    },
    async getLastId(): Promise<AxiosResponse<{ last: number }>> {
        return await api.get<{ last: number }>('/catalogs/refacciones/last-id');
    },
    async createRefaccion(refaccion: Refaccion): Promise<AxiosResponse<Refaccion>> {
        return await api.post<Refaccion>('/catalogs/refacciones', refaccion);
    },
    async deleteRefaccion({ IdRefaccion: id }: Refaccion): Promise<AxiosResponse<void>> {
        return await api.delete(`/catalogs/refacciones/${id}`);
    },
    async updateRefaccion(refaccion: Refaccion): Promise<AxiosResponse<Refaccion>> {
        return await api.put<Refaccion>(`/catalogs/refacciones/${refaccion.IdRefaccion}`, refaccion);
    }
}