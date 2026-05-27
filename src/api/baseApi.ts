import axios, { type AxiosInstance } from "axios";
import router from "@/router";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("expires_at");
            localStorage.removeItem("user");
            router.push({ name: "login" });
        }
        return Promise.reject(error);
    }
);

export { api };