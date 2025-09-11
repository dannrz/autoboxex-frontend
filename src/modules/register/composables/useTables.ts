import { ref } from "vue";
import type { Costos, Insumos, Precios } from "../interfaces";
import { tableService } from "../services/tableService";

export const useTables = () => {
    const refax = ref<Array<Insumos>>([]);
    const precios = ref<Array<Precios>>([]);
    const costos = ref<Array<Costos>>([]);
    const refaxLoading = ref<boolean>(true);
    const preciosLoading = ref<boolean>(true);
    const costosLoading = ref<boolean>(true);

    const getInsumos = () => {
        tableService.getInsumos().then(({ data }) => {
            refax.value = data;
            refaxLoading.value = false;
        }).catch((error) => {
            console.log(error);
        });
    }

    const getPrecios = () => {
        tableService.getPrecios().then(({ data }) => {
            precios.value = data;
            preciosLoading.value = false;
        }).catch((error) => {
            console.log(error);
        });
    }

    const getCostos = () => {
        tableService.getCostos().then(({ data }) => {
            costos.value = data;
            costosLoading.value = false;
        }).catch((error) => {
            console.log(error);
        });
    }

    const getTables = () => {
        getInsumos();
        getPrecios();
        getCostos();
    }

    return {
        refax,
        precios,
        costos,
        getTables,
        refaxLoading,
        preciosLoading,
        costosLoading,
    }
}