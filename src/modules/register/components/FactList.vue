<template>
<<<<<<< HEAD
    <card style="width: fit-content;" class=" flex flex-wrap items-start gap-4 ">
=======
    <card style="width: fit-content;" class=" flex flex-wrap items-start">
>>>>>>> dann
        <template #title>Tabla de costos</template>
        <template #content>
            <div class="card">
                <DataTable v-if="loading":value="new Array(3)">
                    <Column v-for="value in ['Id', 'Producto', 'Cantidad', 'Precio', 'Total']" :header="value">
                        <template #body>
                            <Skeleton></Skeleton>
                        </template>
                    </Column>
                </DataTable>
<<<<<<< HEAD
                <DataTable v-else :value="costos" tableStyle="min-width: 50rem">
=======
                <DataTable v-else :value="costos" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
>>>>>>> dann
                    <Column field="id" header="Id Producto"></Column>
                    <Column field="producto" header="Producto"></Column>
                    <Column field="cantidad" header="Cantidad"></Column>
                    <Column field="precio" header="Precio"></Column>
                    <Column field="total" header="Total"></Column>
                    <template #empty>
                        <h1 class="text-center">
                            No hay costos que mostrar.
                        </h1>
                    </template>
                </DataTable>
            </div>
        </template>
        <template #footer>

        </template>
    </card>
</template>

<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
import type { Costos } from '../interfaces';

defineProps<{
    costos: Costos[],
    loading: boolean
}>();
</script>
