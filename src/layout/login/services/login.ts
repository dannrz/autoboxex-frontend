import api from "@/api";
import type { AxiosResponse } from "axios";
import type { LoginUser, LoginResponse, PasswordRestoreRequest } from "../interfaces";

export const loginService = {
    async login(userData: LoginUser): Promise<AxiosResponse<LoginResponse>> {
        return await api.get(import.meta.env.VITE_SANCTUM_URL)
            .then(() => {
                return api.post<LoginResponse>("/auth/login", userData);
            })
            .catch((error) => {
                throw error;
            });
    },

    async logout(): Promise<void> {
        await api.get("/auth/logout")
            .catch((error) => {
                throw error;
            });
    },

    async restorePassword(data: PasswordRestoreRequest): Promise<AxiosResponse> {
        return await api.post("/auth/request-password-change", data)
            .catch((error) => {
                throw error;
            });
    }
};