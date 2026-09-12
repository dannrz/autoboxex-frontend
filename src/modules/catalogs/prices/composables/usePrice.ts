import { ref } from "vue"
import type { AxiosError } from "axios";
import { PriceService } from "../services/PriceService"
import type { Price } from "../interfaces"
import { useCatalogStore } from "@/stores";

export const usePrice = () => {
    const prices = ref<Price[]>([]);
    const loadingTable = ref<boolean>(false);
    const store = useCatalogStore();
    const dialog = ref<boolean>(false);
    const lastId = ref<number | null>(null);

    const getAllPrices = (): void => {
        if (store.prices.length > 0) {
            prices.value = store.prices;
            return;
        }

        loadingTable.value = true;

        PriceService.getPrices()
            .then(({ data }) => {
                prices.value = data.map(price => ({
                    ...price,
                    PrecioBusqueda: price.Precio.replace(/,/g, ''),
                }));

                store.$state.prices = prices.value;
            })
            .catch(({ response }: AxiosError) => {
                console.error('Error fetching prices:', response?.data || response);
            })
            .finally(() => {
                loadingTable.value = false;
            });
    }

    const getLastId = (): void => {
        PriceService.getLastId()
            .then(({ data }) => {
                lastId.value = Number(data.lastId) + 1;
            })
            .catch(({ response }: AxiosError) => {
                console.error('Error fetching last ID:', response?.data || response);
            });
    }

    const handleDialog = (value: boolean) => {
        dialog.value = value;
    }

    return {
        getAllPrices,
        prices,
        loadingTable,
        handleDialog,
        dialog,
        getLastId,
        lastId,
    }
}