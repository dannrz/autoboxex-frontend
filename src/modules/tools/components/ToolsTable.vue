<template>
    <div class="card">
        <DataTable v-model:filters="filters" :value="tools" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
            stripedRows tableStyle="min-width: 50rem" sort-mode="multiple" removableSort size="large" data-key="id"
            :globalFilterFields="['name', 'sku', 'quantity', 'description', 'last_modify']">
            <template #header>
                <div class="flex justify-end">
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters.global.value" placeholder="Buscar..." />
                    </IconField>
                </div>
            </template>
            <template #empty>Sin resultados</template>
            <template #loading>Por favor espera.</template>
            <Column field="name" header="Nombre" sortable />
            <Column field="sku" header="SKU" sortable />
            <Column field="quantity" header="Cantidad" sortable />
            <Column field="description" header="Descripción" sortable />
            <Column field="last_modify" header="Última Modificación" sortable />
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { useForm } from '@/utils/forms/composables/useForm';
import type { ToolResponse } from '../interfaces';

defineProps<{
    tools: ToolResponse[]
}>();

const { filters } = useForm();
</script>