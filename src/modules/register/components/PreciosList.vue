<template>
    <Card style="width: fit-content;" class=" flex flex-wrap items-start gap-4">
        <template #title>Tabla de precios</template>
        <template #content>
            <div class="card">
                <SkeletonTable v-if="loading" :rows="5" :headers="['Id Producto', 'Producto', 'Precio']"
                    styles="min-width: 50rem" />
                <DataTable v-else v-model:filters="filters" v-model:selection="selectedPrecio" :value="precios"
                    paginator :rows="10" selectionMode="single" :rowsPerPageOptions="[5, 10, 20, 50]" stripedRows
                    tableStyle="min-width: 50rem" :globalFilterFields="['IdProducto', 'Producto', 'Precio']"
                    @row-select="onSelection($event.data)">
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
                    <Column field="IdProducto" header="Id Producto"></Column>
                    <Column field="Producto" header="Producto"></Column>
                    <Column field="Precio" header="Precio"></Column>
                    <template #empty>
                        <h1 class="text-center">
                            No hay precios disponibles
                        </h1>
                    </template>
                </DataTable>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { SkeletonTable } from '@/modules/user/components';
import type { Precios } from '../interfaces';
import { useTables } from '../composables/useTables';

defineProps<{
    precios: Precios[],
    loading: boolean
}>();

const emits = defineEmits<{
    selection: [value: Precios]
}>();

const onSelection = (value: Precios) => {
    emits('selection', value);
}

const { filters, selectedPrecio } = useTables();
</script>
