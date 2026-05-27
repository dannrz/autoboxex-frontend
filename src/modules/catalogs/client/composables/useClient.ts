import { ref, type Ref } from "vue";
import { ClientService } from "../services/ClientService"
import type { Client } from "../interfaces/Client.interface";

export const useClient = () => {
    const clients: Ref<Array<Client>> = ref<Client[]>([]);
    const isLoadingClients: Ref<boolean> = ref<boolean>(false);

    const initData = () => {
        getClients();
    }

    const getClients = async (): Promise<void> => {
        isLoadingClients.value = true;

        ClientService.getClients()
            .then((response) => {
                clients.value = response.data;
            })
            .catch((error) => {
                console.error("Error fetching clients:", error);
            })
            .finally(() => {
                isLoadingClients.value = false;
            });
    }

    return {
        initData,
        clients,
        isLoadingClients,
    }
}