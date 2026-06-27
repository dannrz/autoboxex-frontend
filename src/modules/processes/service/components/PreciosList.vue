<template>
    <Card class="w-full">
        <template #title>
            <div class="flex items-center gap-2">
                <i class="pi pi-tag text-green-500" />
                <span>Precios</span>
            </div>
        </template>
        <template #content>
            <SkeletonTable v-if="loading" :rows="5" :headers="['Id', 'Producto', 'Precio']"
                styles="width: 100%" />
            <DataTable v-else v-model:filters="filters" v-model:selection="selectedPrecio"
                :value="precios" paginator :rows="10" selectionMode="single"
                :rowsPerPageOptions="[5, 10, 20, 50]" stripedRows size="small" class="w-full"
                :globalFilterFields="['IdProducto', 'Producto', 'Precio']"
                @row-select="onSelection($event.data)">
                <template #header>
                    <IconField class="w-full">
                        <InputIcon><i class="pi pi-search" /></InputIcon>
                        <InputText v-model="filters.global.value" placeholder="Buscar producto..."
                            size="small" class="w-full" />
                    </IconField>
                </template>
                <Column field="IdProducto" header="Id" style="width: 5rem" />
                <Column field="Producto" header="Producto" />
                <Column field="Precio" header="Precio" style="width: 7rem">
                    <template #body="{ data }">
                        ${{ Number(data.Precio).toFixed(2) }}
                    </template>
                </Column>
                <template #empty>
                    <div class="flex flex-col items-center gap-2 py-6 text-surface-400">
                        <i class="pi pi-search text-4xl" />
                        <span class="text-sm">Sin precios disponibles</span>
                    </div>
                </template>
            </DataTable>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { SkeletonTable } from '@/modules/user/components';
import type { Precios } from '../interfaces';
import { useService } from '../composables/useService';

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

const { filters, selectedPrecio } = useService();
</script>
