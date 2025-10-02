<template>
<<<<<<< HEAD
    <card style="width: fit-content;" class=" flex flex-wrap items-start gap-4 ">
=======
    <card style="width: fit-content;" class=" flex flex-wrap items-start gap-4">
>>>>>>> dann
        <template #title>Tabla de insumos</template>
        <template #content>
            <div class="card">
                <DataTable v-if="loading" :value="new Array(3)" tableStyle="min-width: 50rem">
                    <Column v-for="value in ['Refacción', 'Tipo', 'Cantidad', 'Precio', 'Importe']" :header="value">
                        <template #body>
                            <Skeleton></Skeleton>
                        </template>
                    </Column>
                </DataTable>
<<<<<<< HEAD
<<<<<<< HEAD
                <DataTable v-else :value="refax" tableStyle="min-width: 50rem">
=======
                <DataTable v-else :value="refax" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
>>>>>>> dann
=======
                <DataTable v-else :value="refax" paginator :rows="15" :rowsPerPageOptions="[5, 15, 20, 50]" tableStyle="min-width: 50rem">
>>>>>>> dann
                    <Column field="refaccion" header="Refacción"></Column>
                    <Column field="tipo" header="Tipo"></Column>
                    <Column field="cantidad" header="Cantidad"></Column>
                    <Column field="precio" header="Precio"></Column>
                    <Column field="importe" header="Importe"></Column>
                    <template #empty>
                        <div class="flex justify-center">
                            <span>No hay datos disponibles</span>
                        </div>
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
import type { Insumos } from '../interfaces';

defineProps<{
    refax: Array<Insumos>
    loading: boolean
}>()
</script>
