import { api } from "@/api/baseApi"
import type { ToolResponse } from "../interfaces/ToolResponse.interface"
import type { AxiosResponse } from "axios"

export const toolsService = async (): Promise<AxiosResponse<ToolResponse[]>> => {
    return await api.get<ToolResponse[]>('/services/tools')
}