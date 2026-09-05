<template>
    <div class="card">
        <SkeletonTable v-if="isLoadingClients" :rows="5" :headers="columns.map(col => col.header)" />
        <DataTable v-else v-model:expandedRows="expandedRows" :value="clients" dataKey="IdCliente" paginator :rows="10"
            :rowsPerPageOptions="[5, 10, 20, 50]" v-model:filters="$props.filters"
            :globalFilterFields="columns.map(col => col.field)">
            <template #header>
                <TableSearchHeader :filters="filters" placeholder="Buscar cliente..." />
            </template>
            <Column expander style="width: 5rem" />
            <Column v-for="col in columns" :key="col.field" :field="col.field" :header="col.header" />
            <template #expansion="slotProps">
                <ClientCarsDatail :id-cliente="slotProps.data.IdCliente" :nombre="slotProps.data.Nombre" />
            </template>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Client } from '../interfaces';
import { SkeletonTable, TableSearchHeader } from '@table/components';
import { ClientCarsDatail } from '.';
import type { Columns } from '@table/interfaces/Colums.interface';

const expandedRows = ref<any[]>([]);

defineProps<{
    clients: Array<Client>,
    isLoadingClients: boolean,
    filters: any,
    columns: Array<Columns>,
}>();
</script>