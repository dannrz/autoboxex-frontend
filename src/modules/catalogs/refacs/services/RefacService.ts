import { api } from "@/api/baseApi"
import type { Refaccion } from "../interfaces";

export const RefacService = {
    async getRefacciones() {
        return await api.get<Array<Refaccion>>('/catalogs/refacciones');
    },
}