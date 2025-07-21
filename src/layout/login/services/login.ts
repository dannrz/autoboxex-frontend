import { laravel } from "@/api/baseApi";


export const loginService = {
    async login(username: string, password: string) {
        try {
            const response = await laravel.post("/login", {
                username,
                password,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};