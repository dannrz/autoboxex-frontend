import { api } from "@/api/baseApi"
import type { AxiosResponse } from "axios";
import type { ModelRequest, ModelResponse } from "../interfaces";

export const ModelService = {
    async getModels(): Promise<AxiosResponse<Array<ModelResponse>>> {
        return await api.get<ModelResponse[]>('/catalogs/models');
    },

    async createModel({ Marca, Modelo }: ModelRequest): Promise<AxiosResponse> {
        let marca: number = Marca.IdMarca;
        return await api.post('/catalogs/models', { marca, Modelo });
    },

    async deleteModel({ Marca, Modelo }: ModelResponse): Promise<AxiosResponse> {
        return await api.delete(`/catalogs/models`, { data: { Marca, Modelo } });
    },

    async updateModel(oldData: ModelResponse, newData: ModelRequest): Promise<AxiosResponse> {
        let marca: string = newData.Marca.Marca;
        return await api.put(`/catalogs/models`, {
            oldMarca: oldData.Marca,
            oldModelo: oldData.Modelo,
            marca: marca,
            Modelo: newData.Modelo
        });
    }
}