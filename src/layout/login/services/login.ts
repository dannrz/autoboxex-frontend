import { laravel } from "@/api/baseApi";
import type { LoginUser } from "../interfaces/loginUser.interface";
import axios, { type AxiosResponse } from "axios";


export const loginService = {
    async getCsrf() {
        return await axios.get('http://localhost/sanctum/csrf-cookie');
    },
    async login(userData: LoginUser): Promise<AxiosResponse> {
        try {
            return await laravel.post("/auth/login", userData);
        } catch (error) {
            throw error;
        }
    },
};