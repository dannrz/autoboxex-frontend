<template>
    <SkeletonTable v-if="$props.refacciones.length === 0" :headers="Object.values($props.columns)" :rows="4" />
    <DataTable v-else v-model:filters="$props.filters" :value="refacciones" paginator :rows="10"
        responsiveLayout="scroll" :rowsPerPageOptions="[10, 20, 50, 100]" :globalFilterFields="['Refacción', 'Codigo']">
        <template #header>
            <RefacsTableHeader :filters="$props.filters" @create="$emit('create')" />
        </template>
        <Column v-for="(value, key) in columns" :key="key" :field="key" :header="value" />
        <Column header="Acciones" style="width: 8rem">
            <template #body="slotProps">
                <Button icon="pi pi-pencil" severity="info" text rounded @click="$emit('edit', slotProps.data)" />
                <Button icon="pi pi-trash" severity="danger" text rounded @click="$emit('delete', slotProps.data)" />
            </template>
        </Column>
    </DataTable>
</template>

<script setup lang="ts">
import { SkeletonTable } from '@table/components';
import type { Refaccion, RefaccionColumns } from '../interfaces';
import { RefacsTableHeader } from '.';

defineProps<{
    refacciones: Array<Refaccion>,
    filters: any,
    columns: RefaccionColumns,
}>();

defineEmits<{
    edit: [refaccion: Refaccion],
    delete: [refaccion: Refaccion],
    create: [],
}>();
</script>