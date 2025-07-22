import { laravel } from "@/api/baseApi";
import type { LoginUser } from "../interfaces/loginUser.interface";


export const loginService = {
    async login(userData: LoginUser) {
        try {
            const response = await laravel.post("/auth/login", userData);
            return response;
        } catch (error) {
            throw error;
        }
    },
};