import type { Clientes } from "@/modules/register/interfaces/Clientes.interface";
import { defineStore } from "pinia";

export const useClientStore = defineStore('client', {
    state: () => ({
        clients: [] as Array<Clientes>,
    }),
});