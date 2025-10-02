<template>
    <card style="width: fit-content;" class=" flex flex-wrap items-start gap-4">
        <template #title>Tabla de precios</template>
        <template #content>
            <div class="card">
                <DataTable v-if="loading" :value="new Array(3)">
                    <Column v-for="value in ['Id Producto', 'Producto', 'Precio']" :header="value">
                        <template #body>
                            <Skeleton></Skeleton>
                        </template>
                    </Column>
                </DataTable>
                <DataTable v-else v-model:filters="filters" :value="precios" paginator :rows="5"
                    :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
                    :globalFilterFields="['IdProducto', 'Producto', 'Precio']">
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
    </card>
</template>

<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
import type { Precios } from '../interfaces';
import { useForm } from '@/utils/forms/composables/useForm';

defineProps<{
    precios: Precios[],
    loading: boolean
}>();

const { filters } = useForm();
</script>
