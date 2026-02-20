import type { Clientes } from "@/modules/processes/service/interfaces";
import { defineStore } from "pinia";

export const useClientStore = defineStore('client', {
    state: () => ({
        clients: [] as Array<Clientes>,
    }),
});