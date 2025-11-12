import { defineStore } from "pinia";

export const useVehicleStore = defineStore('vehicle', {
    state: () => ({
        inOrders: [] as Array<{ FolioOE: string; }>,
    })
});