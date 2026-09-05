import { ref } from "vue"
import type { AxiosError } from "axios";
import { PriceService } from "../services/PriceService"
import type { Price } from "../interfaces"

export const usePrice = () => {
    const prices = ref<Price[]>([]);
    const loadingTable = ref(false);

    const getAllPrices = () => {
        loadingTable.value = true;

        PriceService.getPrices()
            .then(({ data }) => {
                prices.value = data.map(price => ({
                    ...price,
                    PrecioBusqueda: price.Precio.replace(/,/g, ''),
                }));
            })
            .catch(({ response }: AxiosError) => {
                console.error('Error fetching prices:', response?.data || response);
            })
            .finally(() => {
                loadingTable.value = false;
            });
    }

    return {
        getAllPrices,
        prices,
        loadingTable,
    }
}