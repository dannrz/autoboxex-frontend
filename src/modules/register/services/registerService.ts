import { api } from "@/api/baseApi"
import type { ServiceType } from "../interfaces"

export const RegisterService = () => {
    const serviceType = async () => {
        return await api.get<ServiceType[]>('/services')
    }

    const states = async () => {
        return await api.get<ServiceType[]>('/services/states')
    }

    return {
        serviceType,
        states
    }
}
