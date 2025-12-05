import { api } from "@/api/baseApi"
import type { ModelResponse } from "../interfaces/ModelResponse.interface";
import type { AxiosResponse } from "axios";

export const ModelService = {
    async getModels(): Promise<AxiosResponse<Array<ModelResponse>>> {
        return await api.get<ModelResponse[]>('/catalogs/models');
    }
}