import { api } from "@/api/baseApi"
import type { ToolResponse } from "../interfaces/ToolResponse.interface"
import { ref, type Ref } from "vue"
import { useToast } from "primevue"

export const toolsService = () => {
    const data: Ref<ToolResponse[]> = ref<ToolResponse[]>([])
    const toast = useToast()

    api.get<ToolResponse[]>('/services/tools')
        .then(response => {
            data.value = response.data
        })
        .catch(error => {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load tools', life: import.meta.env.VITE_TOAST_LIFETIME })
        })

    return {
        data
    }
}