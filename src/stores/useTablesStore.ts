import type { Costos, Insumo, Precios } from "@/modules/register/interfaces";
import { defineStore } from "pinia";

export const useTablesStore = defineStore('tables', {
    state: () => ({
        costos: [] as Costos[],
        insumos: [] as Insumo[],
        precios: [] as Precios[],
    })
});