import { ref } from "vue";
import { FilterMatchMode } from '@primevue/core/api';
import type { Costos, Insumo, Precios } from "../interfaces";
import { RegisterService } from "../services/registerService";
import { useTablesStore } from "@/stores/useTablesStore";

const tableStore = useTablesStore();

export const useTables = () => {
    const refax = ref<Array<Insumo>>([]);
    const precios = ref<Array<Precios>>([]);
    const costos = ref<Array<Costos>>([]);
    const selectedPrecio = ref<Precios | null>(null);

    const refaxLoading = ref<boolean>(true);
    const preciosLoading = ref<boolean>(true);
    const costosLoading = ref<boolean>(true);

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
        getPrecios();
        if (tableStore.$state.costos.length > 0) {
            costos.value = tableStore.$state.costos;
            return;
        }
    }

    const filters = ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    const onEmitedSelection = (ev: Precios) => {
        if (costos.value.includes(costos.value.find(c => c.id === ev.IdProducto)!)) {
            const costo = costos.value.find(c => c.id === ev.IdProducto);

            if (costo) {
                costo.cantidad += 1;
                costo.total = costo.cantidad * costo.precio;
            }
            return;
        }

        costos.value.push({
            id: ev.IdProducto,
            producto: ev.Producto,
            cantidad: 1,
            precio: ev.Precio,
            total: ev.Precio,
        });

        tableStore.$state.costos = costos.value;
    }

    const editableColumns = ref([
        { field: 'producto', header: 'Producto' },
        { field: 'cantidad', header: 'Cantidad' },
        { field: 'precio', header: 'Precio' },
    ]);

    const tableProps: any = {
        table: { style: 'min-width: 50rem' },
        column: {
            bodycell: ({ state }: any) => ({
                class: [{ '!py-0': state['d_editing'] }]
            })
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    }

    const onCellEditComplete = (event: any) => {
        let { data, newValue, field } = event;

        switch (field) {
            case 'cantidad':
            case 'precio':
                if (isPositiveInteger(newValue)) data[field] = Number(newValue);
                else event.preventDefault();
                break;

            default:
                if (newValue.trim().length > 0) data[field] = newValue;
                else event.preventDefault();
                break;
        }
    }

    const isPositiveInteger = (val: number) => {
        let str = String(val);

        str = str.trim();

        if (!str) {
            return false;
        }

        str = str.replace(/^0+/, '') || '0';
        let n = Math.floor(Number(str));

        return n !== Infinity && String(n) === str && n >= 0;
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
        editableColumns,
        tableProps,
        formatCurrency,
        onCellEditComplete,
    }
}