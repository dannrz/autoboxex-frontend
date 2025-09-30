import type { ServiceType } from "@/modules/register/interfaces";
import { defineStore } from "pinia";

export const useFormStore = defineStore('form', {
    state: () => ({
        tipoServicios: [] as ServiceType[],
        state: [] as ServiceType[],
    })
});