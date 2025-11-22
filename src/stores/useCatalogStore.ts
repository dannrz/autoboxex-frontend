import type { Brand } from "@/modules/catalogs/brands/interfaces/Brand.interface";
import { defineStore } from "pinia";

export const useCatalogStore = defineStore("catalogStore", {
    state: () => ({
        brands: [] as Array<Brand>,
    }),
});