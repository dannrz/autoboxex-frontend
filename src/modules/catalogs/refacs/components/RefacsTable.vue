<template>
    <DataTable v-model:filters="$props.filters" :value="refacciones" paginator :rows="10"
        :loading="$props.refacciones.length === 0" responsiveLayout="scroll" :rowsPerPageOptions="[10, 20, 50, 100]"
        :globalFilterFields="['Refacción', 'Codigo']">
        <template #header>
            <div class="flex justify-between">
                <Button icon="pi pi-plus" severity="success" label="Agregar refacción" text rounded
                    @click="$emit('create')" />
                <IconField>
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                </IconField>
            </div>
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
import type { Refaccion, RefaccionColumns } from '../interfaces';

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