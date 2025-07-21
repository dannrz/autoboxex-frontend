import axios, { type AxiosInstance } from "axios";

export const laravel: AxiosInstance = axios.create({
    baseURL: import.meta.env.API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
})