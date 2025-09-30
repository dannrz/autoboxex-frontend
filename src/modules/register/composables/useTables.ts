import { ref } from "vue";
import type { Costos, Insumos, Precios } from "../interfaces";
<<<<<<< HEAD
import { tableService } from "../services/tableService";
=======
import { RegisterService } from "../services/registerService";
import { useTablesStore } from "@/stores/useTablesStore";
>>>>>>> dann

export const useTables = () => {
    const refax = ref<Array<Insumos>>([]);
    const precios = ref<Array<Precios>>([]);
    const costos = ref<Array<Costos>>([]);
    const refaxLoading = ref<boolean>(true);
    const preciosLoading = ref<boolean>(true);
    const costosLoading = ref<boolean>(true);

<<<<<<< HEAD
    const getInsumos = () => {
        tableService.getInsumos().then(({ data }) => {
            refax.value = data;
=======
    const tableStore = useTablesStore();

    const getInsumos = () => {
        if (tableStore.$state.insumos.length > 0) {
            refax.value = tableStore.$state.insumos;
            refaxLoading.value = false;
            return;
        }
        RegisterService.getInsumos().then(({ data }) => {
            refax.value = data;
            tableStore.$state.insumos = data;
>>>>>>> dann
            refaxLoading.value = false;
        }).catch((error) => {
            console.log(error);
        });
    }

    const getPrecios = () => {
<<<<<<< HEAD
        tableService.getPrecios().then(({ data }) => {
            precios.value = data;
=======
        if (tableStore.$state.precios.length > 0) {
            precios.value = tableStore.$state.precios;
            preciosLoading.value = false;
            return;
        }
        RegisterService.getPrecios().then(({ data }) => {
            precios.value = data;
            tableStore.$state.precios = data;
>>>>>>> dann
            preciosLoading.value = false;
        }).catch((error) => {
            console.log(error);
        });
    }

    const getCostos = () => {
<<<<<<< HEAD
        tableService.getCostos().then(({ data }) => {
            costos.value = data;
=======
        if (tableStore.$state.costos.length > 0) {
            costos.value = tableStore.$state.costos;
            costosLoading.value = false;
            return;
        }
        RegisterService.getCostos().then(({ data }) => {
            costos.value = data;
            tableStore.$state.costos = data;
>>>>>>> dann
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