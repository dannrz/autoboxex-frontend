import type { Costos, Insumos, Precios } from "@/modules/register/interfaces";
import { defineStore } from "pinia";

export const useTablesStore = defineStore('tables', {
    state: () => ({
        costos: [] as Costos[],
        insumos: [] as Insumos[],
        precios: [] as Precios[],
    })
});