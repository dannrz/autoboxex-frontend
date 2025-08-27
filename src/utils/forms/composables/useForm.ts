import type { Ref } from "vue"

export const useForm = () => {
    const clearForm = (data: Ref) => {
        data.value = {}
    }
    return {
        clearForm
    }
}