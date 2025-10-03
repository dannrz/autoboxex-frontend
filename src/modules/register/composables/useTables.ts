import { ref } from "vue";
import { FilterMatchMode } from '@primevue/core/api';
import type { Costos, Insumos, Precios } from "../interfaces";
import { RegisterService } from "../services/registerService";
import { useTablesStore } from "@/stores/useTablesStore";

export const useTables = () => {
    const refax = ref<Array<Insumos>>([]);
    const precios = ref<Array<Precios>>([]);
    const costos = ref<Array<Costos>>([]);
    const selectedPrecio = ref<Precios | null>(null);

    const refaxLoading = ref<boolean>(true);
    const preciosLoading = ref<boolean>(true);
    const costosLoading = ref<boolean>(true);

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
            refaxLoading.value = false;
        }).catch((error) => {
            console.log(error);
        });
    }

    const getPrecios = () => {
        if (tableStore.$state.precios.length > 0) {
            precios.value = tableStore.$state.precios;
            preciosLoading.value = false;
            return;
        }
        RegisterService.getPrecios().then(({ data }) => {
            precios.value = data;
            tableStore.$state.precios = data;
            preciosLoading.value = false;
        }).catch((error) => {
            console.log(error);
        });
    }

    const getTables = () => {
        getInsumos();
        getPrecios();
    }

    const filters = ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    const onEmitedSelection = (ev: Precios) => {
        costos.value.push({
            id: ev.IdProducto,
            producto: ev.Producto,
            cantidad: 1,
            precio: ev.Precio,
            total: ev.Precio,
        });
    }

    return {
        refax,
        precios,
        costos,
        getTables,
        refaxLoading,
        preciosLoading,
        costosLoading,
        selectedPrecio,
        filters,
        onEmitedSelection,
    }
}