<template>
    <SkeletonTable v-if="loading" :rows="5" :headers="['ID', 'Producto', 'Precio']" />

    <DataTable v-else :value="prices" v-model:filters="$props.filters" paginator :rows="10"
        :rowsPerPageOptions="[5, 10, 20, 50]" :globalFilterFields="searchables">
        <template #header>
            <TableSearchHeader :filters="filters" placeholder="Buscar cliente..." :addButton="true"
                buttonLabel="Agregar precio" @dialog="handleDialog" />
        </template>
        <Column field="IdProducto" header="ID" />
        <Column field="Producto" header="Producto" />
        <Column field="Precio" header="Precio" />
    </DataTable>

    <AddPriceDialog :dialog="dialog" @close="handleDialog" />
</template>

<script setup lang="ts">
import { SkeletonTable, TableSearchHeader } from '@table/components';
import type { Price } from '../interfaces';
import { usePrice } from '../composables/usePrice';
import AddPriceDialog from './AddPriceDialog.vue';

defineProps<{
    prices: Price[];
    loading: boolean;
    filters: any;
}>();
const { handleDialog, dialog } = usePrice();

const searchables = ['Producto', 'PrecioBusqueda'];

</script>