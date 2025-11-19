import { api } from "@/api/baseApi"
import type { AxiosResponse } from "axios"
import type { Brand } from "../interfaces/Brand.interface";

export const BrandService = {
    async getBrands(): Promise<AxiosResponse<Array<Brand>>> {
        return await api.get('/catalogs/brands');
    }
}