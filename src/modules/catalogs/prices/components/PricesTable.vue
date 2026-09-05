<template>
    <SkeletonTable v-if="loading" :rows="5" :headers="['ID', 'Producto', 'Precio']" />

    <DataTable v-else :value="prices" paginator :rows="10" :loading="loading" responsiveLayout="scroll">
        <Column field="IdProducto" header="ID" />
        <Column field="Producto" header="Producto" />
        <Column field="Precio" header="Precio" />
    </DataTable>
</template>

<script setup lang="ts">
import { SkeletonTable } from '@/utils/tables/components';
import type { Price } from '../interfaces';

defineProps<{
    prices: Price[];
    loading: boolean;
}>();
</script>