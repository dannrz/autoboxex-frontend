import type { Brand } from "@/modules/catalogs/brands/interfaces/Brand.interface";
import type { Client } from "@/modules/catalogs/client/interfaces";
import type { ModelResponse } from "@/modules/catalogs/models/interfaces";
import type { Package } from "@/modules/catalogs/packages/interfaces";
import type { Refaccion } from "@/modules/catalogs/refacs/interfaces";
import { defineStore } from "pinia";

export const useCatalogStore = defineStore("catalogStore", {
    state: () => ({
        brands: [] as Array<Brand>,
        models: [] as Array<ModelResponse>,
        spareParts: [] as Array<Refaccion>,
        packages: [] as Array<Package>,
        clients: [] as Array<Client>,
    }),
});