import { ref } from "vue"
import { PriceService } from "../services/PriceService"
import type { Price } from "../interfaces"
import type { AxiosError } from "axios";

export const usePrice = () => {
    const prices = ref<Price[]>([]);
    const loadingTable = ref(false);

    const getAllPrices = () => {
        loadingTable.value = true;

        PriceService.getPrices()
            .then(({ data }) => {
                prices.value = data;
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