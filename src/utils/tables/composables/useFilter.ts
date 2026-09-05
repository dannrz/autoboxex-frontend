import { ref } from "vue";
import { FilterMatchMode } from "@primevue/core";

export const useFilter = () => {
    const filters = ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    return {
        filters,
    }
}