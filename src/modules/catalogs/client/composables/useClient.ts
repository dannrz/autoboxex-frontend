import { ref } from "vue";
import { useCatalogStore } from "@/stores";
import { ClientService } from "../services/ClientService"
import type { Client, Vehiculo } from "../interfaces/Client.interface";
import { columns } from "../constants/columns";

export const useClient = () => {
    const clients = ref<Client[]>([]);
    const isLoadingClients = ref<boolean>(false);

    const vehiculos = ref<Array<Vehiculo>>([]);
    const totalRecords = ref(0);
    const rows = ref(10);
    const isLoadingVehiculos = ref<boolean>(false);

    const store = useCatalogStore();

    const getClients = (): void => {
        if (store.clients.length > 0) {
            clients.value = store.clients;
            return;
        }

        isLoadingClients.value = true;

        ClientService.getClients()
            .then(({ data }) => {
                clients.value = data;
                store.$state.clients = data;
            })
            .catch((error) => {
                console.error("Error fetching clients:", error);
            })
            .finally(() => {
                isLoadingClients.value = false;
            });
    }

    const getClientVehicles = (idCliente: number, page: number): void => {
        isLoadingVehiculos.value = true;

        ClientService.getClientVehicles(idCliente, page, rows.value)
            .then(({ data }) => {
                vehiculos.value = data.data;
                totalRecords.value = data.total;
            })
            .catch((error) => {
                console.error("Error fetching client's vehicles:", error);
            })
            .finally(() => {
                isLoadingVehiculos.value = false;
            });
    }

    return {
        getClients,
        clients,
        isLoadingClients,
        columns,
        getClientVehicles,
        vehiculos,
        totalRecords,
        rows,
        isLoadingVehiculos,
    }
}