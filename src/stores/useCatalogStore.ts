import type { Brand } from "@/modules/catalogs/brands/interfaces/Brand.interface";
import type { ModelResponse } from "@/modules/catalogs/models/interfaces";
import { defineStore } from "pinia";

export const useCatalogStore = defineStore("catalogStore", {
    state: () => ({
        brands: [] as Array<Brand>,
        models: [] as Array<ModelResponse>,
    }),
});