<template>
    <Card class=" flex flex-wrap items-start">
        <template #title>Tabla de costos</template>
        <template #content>
            <div class="card">
                <DataTable :value="costos" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                    tableStyle="min-width: 55rem">
                    <Column field="id" header="Id Producto"></Column>
                    <Column field="producto" header="Producto"></Column>
                    <Column field="cantidad" header="Cantidad"></Column>
                    <Column field="precio" header="Precio"></Column>
                    <Column field="total" header="Total"></Column>
                    <template #empty>
                        <h1 class="text-center">
                            No hay datos que mostrar.
                        </h1>
                    </template>
                </DataTable>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import type { Costos } from '../interfaces';

defineProps<{
    costos: Costos[],
    loading: boolean
}>();
</script>