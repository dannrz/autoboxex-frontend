import { api } from "@/api/baseApi";
import type { AxiosResponse } from "axios";
import type { LoginUser, LoginResponse } from "../interfaces";
import axios from "axios";

export const loginService = {
    async login(userData: LoginUser): Promise<AxiosResponse<LoginResponse>> {
        try {
            await axios.get(import.meta.env.VITE_SANCTUM_URL);

            return await api.post<LoginResponse>("/auth/login", userData);
        } catch (error) {
            throw error;
        }
    },

    async logout() {
        try {
            await api.get("/auth/logout");
        } catch (error) {
            throw error;
        }
    }
};