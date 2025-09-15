import { ref } from "vue";
import type { Costos, Insumos, Precios } from "../interfaces";
import { RegisterService } from "../services/registerService";

export const useTables = () => {
    const refax = ref<Array<Insumos>>([]);
    const precios = ref<Array<Precios>>([]);
    const costos = ref<Array<Costos>>([]);
    const refaxLoading = ref<boolean>(true);
    const preciosLoading = ref<boolean>(true);
    const costosLoading = ref<boolean>(true);

    const getInsumos = () => {
        RegisterService.getInsumos().then(({ data }) => {
            refax.value = data;
            refaxLoading.value = false;
        }).catch((error) => {
            console.log(error);
        });
    }

    const getPrecios = () => {
        RegisterService.getPrecios().then(({ data }) => {
            precios.value = data;
            preciosLoading.value = false;
        }).catch((error) => {
            console.log(error);
        });
    }

    const getCostos = () => {
        RegisterService.getCostos().then(({ data }) => {
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