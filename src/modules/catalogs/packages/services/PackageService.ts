import { api } from "@/api/baseApi";
import type { AxiosResponse } from "axios";

export const PackageService = {
    async getPackages(): Promise<AxiosResponse> {
        return await api.get("/packages");
    },
}