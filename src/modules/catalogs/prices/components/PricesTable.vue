<template>
    <SkeletonTable v-if="loading" :rows="5" :headers="['ID', 'Producto', 'Precio']" />

    <DataTable v-else :value="prices" paginator :rows="10" :loading="loading" :rowsPerPageOptions="[5, 10, 20, 50]">
        <template #header>
            <TableSearchHeader :filters="filters" placeholder="Buscar cliente..." />
        </template>
        <Column field="IdProducto" header="ID" />
        <Column field="Producto" header="Producto" />
        <Column field="Precio" header="Precio" />
    </DataTable>
</template>

<script setup lang="ts">
import { SkeletonTable, TableSearchHeader } from '@table/components';
import type { Price } from '../interfaces';

defineProps<{
    prices: Price[];
    loading: boolean;
    filters: any;
}>();
</script>