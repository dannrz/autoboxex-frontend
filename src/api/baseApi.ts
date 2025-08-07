import axios, { type AxiosInstance } from "axios";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token") || ''}`,
    }
});