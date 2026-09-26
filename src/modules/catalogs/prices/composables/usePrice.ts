import { computed, ref } from "vue"
import type { AxiosError } from "axios";
import { PriceService } from "../services/PriceService"
import type { Price } from "../interfaces"
import { useCatalogStore } from "@/stores";

export const usePrice = () => {
    const store = useCatalogStore();

    const prices = computed<Price[]>(() => store.prices);

    const loadingTable = ref<boolean>(false);
    const dialog = ref<boolean>(false);
    const lastId = ref<number | null>(null);
    const servicio = ref<string>('');
    const precio = ref<number | null>(null);
    const submitted = ref<boolean>(false);
    const saving = ref<boolean>(false);

    const errors = computed(() => ({
        servicio: submitted.value && !servicio.value.trim(),
        precio: submitted.value && precio.value === null,
    }));

    const getAllPrices = (): void => {
        if (store.prices.length > 0) return;

        loadingTable.value = true;

        PriceService.getPrices()
            .then(({ data }) => {
                store.prices = data.map(price => ({
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

    const getLastId = (): void => {
        PriceService.getLastId()
            .then(({ data }) => {
                lastId.value = Number(data.lastId) + 1;
            })
            .catch(({ response }: AxiosError) => {
                console.error('Error fetching last ID:', response?.data || response);
            });
    }

    const initForm = (): void => {
        servicio.value = '';
        precio.value = null;
        submitted.value = false;
        getLastId();
    }

    const savePrice = async (): Promise<boolean> => {
        submitted.value = true;

        if (errors.value.servicio || errors.value.precio) return false;

        saving.value = true;

        return PriceService.createPrice({ Producto: servicio.value.trim(), Precio: precio.value as number })
            .then(() => {
                const precioFormateado = '$' + new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }).format(precio.value as number);

                store.prices.unshift({
                    IdProducto: lastId.value as number,
                    Producto: servicio.value.trim(),
                    Precio: precioFormateado,
                    PrecioBusqueda: precioFormateado.replace(/,/g, ''),
                });
                return true;
            })
            .catch(({ response }: AxiosError) => {
                console.error('Error saving price:', response?.data || response);
                return false;
            })
            .finally(() => {
                saving.value = false;
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
        savePrice,
        initForm,
        servicio,
        precio,
        saving,
        errors,
    }
}