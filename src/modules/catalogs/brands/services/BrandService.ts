import type { AxiosResponse } from "axios"
import { api } from "@/api/baseApi"
import type { Brand } from "../interfaces/Brand.interface";

export const BrandService = {
    async getBrands(): Promise<AxiosResponse<Array<Brand>>> {
        return await api.get<Brand[]>('/catalogs/brands');
    },

    async addBrand(Marca: string): Promise<AxiosResponse<Brand>> {
        return await api.post('/catalogs/brands', { Marca });
    },

    async deleteBrand({ IdMarca }: Brand): Promise<AxiosResponse<void>> {
        return await api.delete(`/catalogs/brands/${IdMarca}`);
    },

    async updateBrand({ IdMarca }: Brand, brand: string): Promise<AxiosResponse<Brand>> {
        return await api.put(`/catalogs/brands/${IdMarca}`, { brand });
    }
}