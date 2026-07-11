import api from "@/api";
import type { AxiosResponse } from "axios";
import type { Package } from "../interfaces";

export const PackageService = {
    async getPackages(): Promise<AxiosResponse<Array<Package>>> {
        return await api.get<Array<Package>>("/catalogs/packages");
    },
}