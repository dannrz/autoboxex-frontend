import { ref } from "vue";
import { useCatalogStore } from "@/stores";
import { ClientService } from "../services/ClientService"
import type { Client } from "../interfaces/Client.interface";
import { columns } from "../constants/columns";

export const useClient = () => {
    const clients = ref<Client[]>([]);
    const isLoadingClients = ref<boolean>(false);

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

    return {
        getClients,
        clients,
        isLoadingClients,
        columns,
    }
}